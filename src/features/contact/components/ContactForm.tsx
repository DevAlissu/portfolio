import type { ContactFormData, ContactFormErrors, ContactFormStatus } from '../types';

interface ContactFormProps {
  formData: ContactFormData;
  formErrors: ContactFormErrors;
  formStatus: ContactFormStatus;
  submitError: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const baseField =
  "w-full bg-[#020618] rounded-lg px-3 py-3 font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px] focus:outline-none transition-colors";

function borderClass(hasError: boolean, hasValue: boolean) {
  if (hasError) return 'border border-[#ff6b6b]';
  if (hasValue) return 'border border-[#CAD5E2] focus:border-[#43D9AD]';
  return 'border border-[#314158] focus:border-[#43D9AD]';
}

export function ContactForm({
  formData,
  formErrors,
  formStatus,
  submitError,
  onChange,
  onBlur,
  onSubmit,
}: ContactFormProps) {
  const submitting = formStatus === 'submitting';

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-[372px] space-y-7">
      <div className="space-y-2">
        <label
          htmlFor="contact-name"
          className="block font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]"
        >
          _nome:
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={onChange}
          onBlur={onBlur}
          required
          aria-invalid={!!formErrors.name}
          aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
          className={`${baseField} ${borderClass(!!formErrors.name, !!formData.name)}`}
          placeholder="Joao Silva |"
        />
        {formErrors.name && (
          <p
            id="contact-name-error"
            role="alert"
            className="font-['Fira_Code',sans-serif] text-[#ff6b6b] text-[12px]"
          >
            {formErrors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-email"
          className="block font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]"
        >
          _email:
        </label>
        <div className="relative">
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={onChange}
            onBlur={onBlur}
            required
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
            className={`${baseField} ${borderClass(!!formErrors.email, !!formData.email)} ${formErrors.email ? 'pr-10' : ''}`}
            placeholder="joao-silva@mail.com"
          />
          {formErrors.email && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true">
              <svg className="w-5 h-5" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9" fill="none" stroke="#ff6b6b" strokeWidth="2" />
                <path d="M10 6v5M10 14h.01" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
        {formErrors.email && (
          <p
            id="contact-email-error"
            role="alert"
            className="font-['Fira_Code',sans-serif] text-[#ff6b6b] text-[12px]"
          >
            {formErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="block font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]"
        >
          _mensagem:
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={onChange}
          onBlur={onBlur}
          required
          rows={5}
          aria-invalid={!!formErrors.message}
          aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
          className={`${baseField} ${borderClass(!!formErrors.message, !!formData.message)} resize-none`}
          placeholder="Ola! Vi seu portfolio e achei incrivel! Gostaria de conversar sobre..."
        />
        {formErrors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="font-['Fira_Code',sans-serif] text-[#ff6b6b] text-[12px]"
          >
            {formErrors.message}
          </p>
        )}
      </div>

      {submitError && (
        <p
          role="alert"
          aria-live="assertive"
          className="font-['Fira_Code',sans-serif] text-[#ff6b6b] text-[13px]"
        >
          // {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="bg-[#ffd6a7] hover:bg-[#ffd6a7]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-4 py-2.5 rounded-lg font-['Fira_Code',sans-serif] text-[#020618] text-[14px] focus-visible:outline-2 focus-visible:outline-[#ffb86a] focus-visible:outline-offset-2"
      >
        {submitting ? 'enviando...' : 'enviar-mensagem'}
      </button>
    </form>
  );
}
