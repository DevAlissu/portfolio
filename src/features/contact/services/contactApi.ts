import type { ContactFormData } from '../types';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Envia a mensagem de contato via Web3Forms.
 * Requer a env var VITE_WEB3FORMS_KEY (access key gratuita do web3forms.com).
 */
export async function sendContactMessage(data: ContactFormData) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!accessKey) {
    throw new Error('VITE_WEB3FORMS_KEY nao configurada');
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: data.name,
      email: data.email,
      replyto: data.email,
      subject: `Contato do portfolio — ${data.name}`,
      message: data.message,
      botcheck: '',
    }),
  });

  const json = (await res.json()) as { success?: boolean; message?: string };
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Falha ao enviar a mensagem');
  }
  return json;
}
