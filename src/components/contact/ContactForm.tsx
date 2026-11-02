'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { contactServices, type ContactErrors } from '@/lib/contact-enquiry';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactErrors>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'submitting') return;
    setState('submitting'); setMessage(''); setErrors({});
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json() as { message?: string; errors?: ContactErrors };
      if (!response.ok) {
        setErrors(result.errors ?? {}); setMessage(result.message ?? 'We could not send your enquiry. Please try again.'); setState('error'); return;
      }
      form.reset(); setMessage(result.message ?? 'Your enquiry was sent successfully.'); setState('success');
    } catch {
      setMessage('The enquiry service is unavailable. Please use phone, email or WhatsApp.'); setState('error');
    }
  }

  const fieldClass = 'mt-2 min-h-12 w-full border border-black/20 bg-white px-4 py-3';
  return <form onSubmit={submit} className="border border-black/10 bg-[#faf7f0] p-6 sm:p-9" noValidate>
    <p className="eyebrow text-[#8a6835]">Send an enquiry</p><h2 className="mt-3 font-serif text-4xl">How can we help?</h2>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-semibold">Full name *<input name="fullName" autoComplete="name" required maxLength={100} className={fieldClass} aria-invalid={Boolean(errors.fullName)} />{errors.fullName && <span className="mt-1 block text-xs text-red-700">{errors.fullName}</span>}</label>
      <label className="text-sm font-semibold">Email address *<input name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} aria-invalid={Boolean(errors.email)} />{errors.email && <span className="mt-1 block text-xs text-red-700">{errors.email}</span>}</label>
      <label className="text-sm font-semibold">Phone number <span className="font-normal text-[#69655c]">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} className={fieldClass} aria-invalid={Boolean(errors.phone)} />{errors.phone && <span className="mt-1 block text-xs text-red-700">{errors.phone}</span>}</label>
      <label className="text-sm font-semibold">Service of interest *<select name="service" required defaultValue="" className={fieldClass} aria-invalid={Boolean(errors.service)}><option value="" disabled>Select a service</option>{contactServices.map((service) => <option key={service}>{service}</option>)}</select>{errors.service && <span className="mt-1 block text-xs text-red-700">{errors.service}</span>}</label>
    </div>
    <label className="mt-5 block text-sm font-semibold">Subject *<input name="subject" required minLength={3} maxLength={140} className={fieldClass} aria-invalid={Boolean(errors.subject)} />{errors.subject && <span className="mt-1 block text-xs text-red-700">{errors.subject}</span>}</label>
    <label className="mt-5 block text-sm font-semibold">Message *<textarea name="message" required minLength={10} maxLength={5000} rows={7} className={fieldClass} aria-invalid={Boolean(errors.message)} />{errors.message && <span className="mt-1 block text-xs text-red-700">{errors.message}</span>}</label>
    <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button type="submit" disabled={state === 'submitting'} className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-60">{state === 'submitting' ? <LoaderCircle className="animate-spin" size={16} /> : state === 'success' ? <CheckCircle2 size={16} /> : <Send size={16} />}{state === 'submitting' ? 'Sending…' : 'Send enquiry'}</button>
    {message && <p role="status" aria-live="polite" className={`mt-4 text-sm ${state === 'success' ? 'text-green-800' : 'text-red-800'}`}>{message}</p>}
    <p className="mt-5 text-xs leading-5 text-[#69655c]">Your details are used only to respond to this enquiry. Submission does not create a quote, order, booking or contract.</p>
  </form>;
}
