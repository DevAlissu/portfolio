import type { ComponentType, SVGProps } from 'react';
import { Instagram } from 'lucide-react';

export const CONTACT_EMAIL = 'alissu.dev@gmail.com';
export const CONTACT_PHONE = '+55 14 9 9970-46645';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

function WhatsApp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M8.5 9.5c0.2 1.5 1 3 2 4s2.5 1.8 4 2c0.5 0.1 1-0.1 1.3-0.5l0.5-0.7c0.2-0.3 0.1-0.6-0.2-0.8l-1.4-0.8c-0.3-0.2-0.6-0.1-0.8 0.1l-0.4 0.4c-0.8-0.3-1.5-0.8-2.1-1.4-0.6-0.6-1.1-1.3-1.4-2.1l0.4-0.4c0.2-0.2 0.3-0.5 0.1-0.8l-0.8-1.4c-0.2-0.3-0.5-0.4-0.8-0.2l-0.7 0.5c-0.4 0.3-0.6 0.8-0.5 1.3z" />
    </svg>
  );
}

export interface SocialLink {
  name: string;
  url: string;
  active: boolean;
  icon: IconComponent;
}

export const CONTACT_SOCIALS: SocialLink[] = [
  { name: 'Instagram', url: 'https://instagram.com/alissu_sz_', active: true, icon: Instagram },
  { name: 'WhatsApp', url: 'https://wa.me/5514999704645', active: true, icon: WhatsApp },
];
