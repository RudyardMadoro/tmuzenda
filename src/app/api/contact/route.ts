import { contact } from '../../../config/contact.ts';
import { enquiryFingerprint, parseContactEnquiry, validateContactEnquiry } from '../../../lib/contact-enquiry.ts';

const WINDOW_MS = 10 * 60 * 1000;
const DUPLICATE_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();
const recentEnquiries = new Map<string, number>();

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!);

function clientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function rateLimited(ip: string, now: number) {
  const recent = (requestsByIp.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now); requestsByIp.set(ip, recent); return false;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 16_000) return Response.json({ message: 'The enquiry is too large.' }, { status: 413 });
  if (request.headers.get('sec-fetch-site') === 'cross-site') return Response.json({ message: 'Cross-site submissions are not accepted.' }, { status: 403 });

  let payload: unknown;
  try { payload = await request.json(); } catch { return Response.json({ message: 'Invalid enquiry data.' }, { status: 400 }); }
  const enquiry = parseContactEnquiry(payload);
  if (enquiry.website) return Response.json({ message: 'Your enquiry could not be accepted.' }, { status: 400 });
  const errors = validateContactEnquiry(enquiry);
  if (Object.keys(errors).length) return Response.json({ message: 'Please correct the highlighted fields.', errors }, { status: 400 });

  const now = Date.now();
  if (rateLimited(clientIp(request), now)) return Response.json({ message: 'Too many enquiries were submitted. Please wait a few minutes or contact us directly.' }, { status: 429 });
  const fingerprint = enquiryFingerprint(enquiry);
  if (now - (recentEnquiries.get(fingerprint) ?? 0) < DUPLICATE_MS) return Response.json({ message: 'This enquiry was already received. Please wait before sending it again.' }, { status: 409 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || contact.email;
  if (!apiKey || !from) return Response.json({ message: 'Online enquiry delivery is not configured yet. Please contact us by phone, email or WhatsApp.' }, { status: 503 });

  const html = `<h1>New TK Muzenda Properties enquiry</h1><p><strong>Name:</strong> ${escapeHtml(enquiry.fullName)}</p><p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p><p><strong>Phone:</strong> ${escapeHtml(enquiry.phone || 'Not supplied')}</p><p><strong>Service:</strong> ${escapeHtml(enquiry.service)}</p><p><strong>Subject:</strong> ${escapeHtml(enquiry.subject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(enquiry.message).replace(/\n/g, '<br>')}</p>`;
  try {
    const delivery = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [to], reply_to: enquiry.email, subject: `[Website] ${enquiry.subject}`, html }) });
    const result = await delivery.json().catch(() => ({})) as { id?: string; message?: string };
    if (!delivery.ok || !result.id) return Response.json({ message: 'The email provider did not accept your enquiry. Please use phone, email or WhatsApp instead.' }, { status: 502 });
    recentEnquiries.set(fingerprint, now);
    return Response.json({ message: 'Thank you. Your enquiry was sent successfully.', deliveryId: result.id });
  } catch {
    return Response.json({ message: 'The email service is temporarily unavailable. Please use phone, email or WhatsApp instead.' }, { status: 502 });
  }
}
