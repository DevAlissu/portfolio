import { useState } from 'react';
import type { ContactFormData, ContactFormErrors, ContactFormStatus } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<ContactFormStatus>('idle');
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'success') return;

    const errors: ContactFormErrors = {};
    if (!formData.name.trim()) errors.name = 'nome obrigatorio';
    if (!EMAIL_REGEX.test(formData.email)) errors.email = 'email invalido';
    if (!formData.message.trim()) errors.message = 'mensagem obrigatoria';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus('error');
      return;
    }

    setFormStatus('success');
    setFormErrors({});
  };

  const handleNewMessage = () => {
    setFormData({ name: '', email: '', message: '' });
    setFormStatus('idle');
    setFormErrors({});
  };

  return { formData, formStatus, formErrors, handleChange, handleSubmit, handleNewMessage };
}
