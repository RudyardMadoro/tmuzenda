export const contact = {
  businessName: 'TK Muzenda Properties',
  email: 'rudyardmadoro@gmail.com',
  phoneDisplay: '+27 64 172 7623',
  phoneE164: '+27641727623',
  phoneHref: 'tel:+27641727623',
  whatsappNumber: '27641727623',
  address: '18 Jacaranda Street, Noordwyk',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=18%20Jacaranda%20Street%2C%20Noordwyk',
} as const;

export function whatsappUrl(context = 'your services') {
  const message = `Hello ${contact.businessName}, I would like to enquire about ${context}.`;
  return whatsappMessageUrl(message);
}

export function whatsappMessageUrl(message: string) { return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`; }

export function emailUrl(subject = 'TK Muzenda Properties enquiry', body?: string) {
  const query = new URLSearchParams({ subject });
  if (body) query.set('body', body);
  return `mailto:${contact.email}?${query.toString()}`;
}
