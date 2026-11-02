export const contactServices = [
  'Property Transformation',
  'Cabinetry & Custom Interiors',
  'Board Supply & Cutting',
  'Supporting Hardware',
  'Accommodation',
  'Projects',
  'Other',
] as const;

export type ContactEnquiry = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  subject: string;
  message: string;
  website: string;
};

export type ContactErrors = Partial<Record<keyof ContactEnquiry, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';

export function parseContactEnquiry(value: unknown): ContactEnquiry {
  const data = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    fullName: text(data.fullName),
    email: text(data.email).toLowerCase(),
    phone: text(data.phone),
    service: text(data.service),
    subject: text(data.subject),
    message: text(data.message),
    website: text(data.website),
  };
}

export function validateContactEnquiry(enquiry: ContactEnquiry): ContactErrors {
  const errors: ContactErrors = {};
  if (enquiry.fullName.length < 2 || enquiry.fullName.length > 100) errors.fullName = 'Enter your full name (2–100 characters).';
  if (!emailPattern.test(enquiry.email) || enquiry.email.length > 254) errors.email = 'Enter a valid email address.';
  if (enquiry.phone.length > 30) errors.phone = 'Phone number is too long.';
  if (!contactServices.includes(enquiry.service as typeof contactServices[number])) errors.service = 'Select a service.';
  if (enquiry.subject.length < 3 || enquiry.subject.length > 140) errors.subject = 'Enter a subject (3–140 characters).';
  if (enquiry.message.length < 10 || enquiry.message.length > 5000) errors.message = 'Enter a message (10–5,000 characters).';
  return errors;
}

export function enquiryFingerprint(enquiry: ContactEnquiry) {
  return [enquiry.email, enquiry.service, enquiry.subject, enquiry.message].join('|').toLowerCase();
}
