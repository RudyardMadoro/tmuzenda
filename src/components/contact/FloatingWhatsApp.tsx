import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/config/contact';

export default function FloatingWhatsApp() {
  return <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Enquire with TK Muzenda Properties on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f8f55] text-white shadow-2xl transition-transform hover:-translate-y-1 sm:bottom-7 sm:right-7"><MessageCircle aria-hidden="true" /></a>;
}
