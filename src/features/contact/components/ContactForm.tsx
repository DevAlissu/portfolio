import type { ContactFormData, ContactFormErrors } from '../types';

interface ContactFormProps {
  formData: ContactFormData;
  formErrors: ContactFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactForm({ formData, formErrors, onChange, onSubmit }: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-[372px] space-y-6">
      <div className="space-y-2">
        <label className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">_nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          className="w-full bg-[#020618] border border-[#CAD5E2] rounded-lg px-3 py-3 font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px] focus:border-[#43D9AD] focus:outline-none transition-colors"
          placeholder="Joao Silva |"
        />
      </div>

      <div className="space-y-2">
        <label className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">_email:</label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            className={`w-full bg-[#020618] border ${
              formErrors.email
                ? 'border-[#ff0000]'
                : formData.email
                  ? 'border-[#CAD5E2]'
                  : 'border-[#314158]'
            } rounded-lg px-3 py-3 font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px] focus:border-[#43D9AD] focus:outline-none transition-colors`}
            placeholder="joao-silva@mail.com"
          />
          {formErrors.email && (
            <>
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="9" fill="none" stroke="#ff0000" strokeWidth="2" />
                  <path d="M10 6v5M10 14h.01" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="absolute -bottom-6 left-0 font-['Fira_Code',sans-serif] text-[#ff0000] text-[12px]">
                {formErrors.email}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2 mt-8">
        <label className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">_mensagem:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={onChange}
          required
          rows={5}
          className="w-full bg-[#020618] border border-[#314158] rounded-lg px-3 py-3 font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px] focus:border-[#43D9AD] focus:outline-none transition-colors resize-none"
          placeholder="Ola! Vi seu portfolio e achei incrivel! Gostaria de conversar sobre..."
        />
      </div>

      <button
        type="submit"
        className="bg-[#ffd6a7] hover:bg-[#ffd6a7]/90 transition-colors px-4 py-2.5 rounded-lg font-['Fira_Code',sans-serif] text-[#020618] text-[14px]"
      >
        enviar-mensagem
      </button>
    </form>
  );
}
