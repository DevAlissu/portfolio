import { useState } from 'react';
import type { ContactFormData, ContactFormErrors, ContactFormStatus } from '../types';
import { trackEvent } from '../../../shared/services/analytics';
import { sendContactMessage } from '../services/contactApi';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: keyof ContactFormData, value: string): string | undefined {
  if (name === 'name' && !value.trim()) return 'nome obrigatorio';
  if (name === 'email' && !EMAIL_REGEX.test(value)) return 'email invalido';
  if (name === 'message' && !value.trim()) return 'mensagem obrigatoria';
  return undefined;
}

function validateAll(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) errors.name = 'nome obrigatorio';
  if (!EMAIL_REGEX.test(data.email)) errors.email = 'email invalido';
  if (!data.message.trim()) errors.message = 'mensagem obrigatoria';
  return errors;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<ContactFormStatus>('idle');
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name as keyof ContactFormErrors]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactFormErrors];
        return newErrors;
      });
    }
  };

  // valida no blur (nao a cada tecla) para feedback no momento certo
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof ContactFormData, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'submitting' || formStatus === 'success') return;

    const errors = validateAll(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus('error');
      // foca o primeiro campo invalido
      const firstInvalid = (['name', 'email', 'message'] as const).find((f) => errors[f]);
      if (firstInvalid) {
        document.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
      return;
    }

    setFormErrors({});
    setSubmitError(null);
    setFormStatus('submitting');
    try {
      await sendContactMessage(formData);
      trackEvent('contact-submit');
      setFormStatus('success');
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message
          ? err.message
          : 'Nao foi possivel enviar agora. Tente novamente ou use os contatos ao lado.',
      );
      setFormStatus('error');
    }
  };

  const handleNewMessage = () => {
    setFormData({ name: '', email: '', message: '' });
    setFormStatus('idle');
    setFormErrors({});
    setSubmitError(null);
  };

  return {
    formData,
    formStatus,
    formErrors,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    handleNewMessage,
  };
}
