import { api } from '../../../shared/services/api';
import type { ContactFormData } from '../types';

export async function sendContactMessage(data: ContactFormData) {
  return api.post('/contact', data);
}
