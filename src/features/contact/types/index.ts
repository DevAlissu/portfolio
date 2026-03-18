export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  email?: string;
}

export type ContactFormStatus = 'idle' | 'error' | 'success';
