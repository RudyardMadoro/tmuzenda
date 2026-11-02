import test from 'node:test';
import assert from 'node:assert/strict';
import { contact, whatsappUrl } from '../src/config/contact.ts';
import { parseContactEnquiry, validateContactEnquiry } from '../src/lib/contact-enquiry.ts';

const valid = { fullName: 'Rudyard Madoro', email: 'client@example.com', phone: '', service: 'Cabinetry & Custom Interiors', subject: 'Kitchen cabinetry', message: 'Please contact me about a custom kitchen.', website: '' };

test('central contact links use the verified phone and WhatsApp number', () => {
  assert.equal(contact.phoneHref, 'tel:+27641727623');
  const url = new URL(whatsappUrl('custom cabinets'));
  assert.equal(url.host, 'wa.me');
  assert.equal(url.pathname, '/27641727623');
  assert.match(url.searchParams.get('text') ?? '', /custom cabinets/);
});

test('contact enquiry validation accepts a complete enquiry', () => {
  assert.deepEqual(validateContactEnquiry(parseContactEnquiry(valid)), {});
});

test('contact enquiry validation rejects missing and malformed fields', () => {
  const errors = validateContactEnquiry(parseContactEnquiry({ ...valid, fullName: '', email: 'invalid', service: '', subject: '', message: 'short' }));
  assert.ok(errors.fullName); assert.ok(errors.email); assert.ok(errors.service); assert.ok(errors.subject); assert.ok(errors.message);
});

test('contact route reports success only after provider acceptance and blocks a duplicate', async () => {
  const previousFetch = globalThis.fetch;
  const previousKey = process.env.RESEND_API_KEY;
  const previousFrom = process.env.CONTACT_FROM_EMAIL;
  process.env.RESEND_API_KEY = 'test-key'; process.env.CONTACT_FROM_EMAIL = 'Website <website@example.com>';
  globalThis.fetch = (async () => new Response(JSON.stringify({ id: 'email_123' }), { status: 200, headers: { 'Content-Type': 'application/json' } })) as typeof fetch;
  try {
    const { POST } = await import('../src/app/api/contact/route.ts');
    const request = () => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.0.2.50' }, body: JSON.stringify(valid) });
    const accepted = await POST(request());
    assert.equal(accepted.status, 200);
    const duplicate = await POST(request());
    assert.equal(duplicate.status, 409);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
    if (previousFrom === undefined) delete process.env.CONTACT_FROM_EMAIL; else process.env.CONTACT_FROM_EMAIL = previousFrom;
  }
});
