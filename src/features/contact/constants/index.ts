export const CONTACT_EMAIL = 'alissu.dev@gmail.com';
export const CONTACT_PHONE = '+55 14 9 9970-46645';

export interface SocialLink {
  name: string;
  url: string;
  active: boolean;
}

export const CONTACT_SOCIALS: SocialLink[] = [
  { name: 'Instagram', url: 'https://instagram.com/alissu_sz_', active: true },
  { name: 'WhatsApp', url: 'https://wa.me/5514999704645', active: true },
];
