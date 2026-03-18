import { useState } from 'react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_SOCIALS } from '../constants';

const EMAIL_ICON = 'M13.3333 2.66667H2.66667C1.93333 2.66667 1.33333 3.26667 1.33333 4V12C1.33333 12.7333 1.93333 13.3333 2.66667 13.3333H13.3333C14.0667 13.3333 14.6667 12.7333 14.6667 12V4C14.6667 3.26667 14.0667 2.66667 13.3333 2.66667ZM13.3333 12H2.66667V5.33333L8 8.66667L13.3333 5.33333V12ZM8 7.33333L2.66667 4H13.3333L8 7.33333Z';
const PHONE_ICON = 'M12.4 14C10.88 14 9.36 13.54 7.96 12.62C6.56 11.7 5.3 10.44 4.38 9.04C3.46 7.64 3 6.12 3 4.6C3 4.24 3.12 3.94 3.36 3.7C3.6 3.46 3.9 3.34 4.26 3.34H6.42C6.7 3.34 6.94 3.42 7.14 3.58C7.34 3.74 7.48 3.94 7.56 4.18L8.16 6.16C8.22 6.4 8.22 6.62 8.16 6.82C8.1 7.02 7.98 7.2 7.8 7.36L6.36 8.82C6.8 9.6 7.36 10.3 8.04 10.92C8.72 11.54 9.46 12.08 10.26 12.54L11.66 11.14C11.84 10.96 12.06 10.84 12.32 10.78C12.58 10.72 12.82 10.74 13.04 10.84L14.92 11.52C15.16 11.62 15.36 11.78 15.52 12C15.68 12.22 15.76 12.46 15.76 12.72V14.74C15.76 15.1 15.64 15.4 15.4 15.64C15.16 15.88 14.86 16 14.5 16C14.14 16 13.78 15.98 13.42 15.94C13.06 15.9 12.72 15.84 12.4 15.76V14Z';
const SOCIAL_ICON = 'M11.3333 3.33333C11.3333 3.33333 11.2 2.4 10.8 2C10.2667 1.46667 9.66667 1.46667 9.4 1.43333C7.86667 1.33333 6 1.33333 6 1.33333C6 1.33333 4.13333 1.33333 2.6 1.43333C2.33333 1.46667 1.73333 1.46667 1.2 2C0.8 2.4 0.666667 3.33333 0.666667 3.33333C0.666667 3.33333 0.533333 4.4 0.533333 5.46667V6.53333C0.533333 7.6 0.666667 8.66667 0.666667 8.66667C0.666667 8.66667 0.8 9.6 1.2 10C1.73333 10.5333 2.4 10.5333 2.66667 10.6C3.73333 10.6667 6 10.6667 6 10.6667C6 10.6667 7.86667 10.6667 9.4 10.5667C9.66667 10.5333 10.2667 10.5333 10.8 10C11.2 9.6 11.3333 8.66667 11.3333 8.66667C11.3333 8.66667 11.4667 7.6 11.4667 6.53333V5.46667C11.4667 4.4 11.3333 3.33333 11.3333 3.33333ZM4.8 7.6V4.13333L7.73333 5.86667L4.8 7.6Z';

export function ContactSidebar() {
  const [expandedContacts, setExpandedContacts] = useState(true);
  const [expandedSocial, setExpandedSocial] = useState(true);

  return (
    <aside className="w-[clamp(200px,20vw,311px)] border-r border-[#314158] shrink-0">
      <div className="border-b border-[#314158]">
        <button
          onClick={() => setExpandedContacts(!expandedContacts)}
          className="w-full px-6 py-3 flex items-center gap-3 hover:bg-[#1d293d]/20 transition-colors"
        >
          <div className="w-4 h-4">
            <svg viewBox="0 0 8 4" className="w-full h-full">
              <path d="M4 4L0 0H8L4 4Z" fill="#F8FAFC" />
            </svg>
          </div>
          <span className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-[16px]">contatos</span>
        </button>

        {expandedContacts && (
          <div className="px-3 pb-3 space-y-2">
            <div className="flex items-center gap-2 px-3 py-2">
              <svg className="w-4 h-4" viewBox="0 0 16 16"><path d={EMAIL_ICON} fill="#62748E" /></svg>
              <span className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">{CONTACT_EMAIL}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <svg className="w-4 h-4" viewBox="0 0 16 16"><path d={PHONE_ICON} fill="#62748E" /></svg>
              <span className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">{CONTACT_PHONE}</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-b border-[#314158]">
        <button
          onClick={() => setExpandedSocial(!expandedSocial)}
          className="w-full px-6 py-3 flex items-center gap-3 hover:bg-[#1d293d]/20 transition-colors"
        >
          <div className="w-4 h-4">
            <svg viewBox="0 0 8 4" className="w-full h-full">
              <path d="M4 4L0 0H8L4 4Z" fill="#F8FAFC" />
            </svg>
          </div>
          <span className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-[16px]">me-encontre-tambem-em</span>
        </button>

        {expandedSocial && (
          <div className="px-3 pb-3 space-y-2">
            {CONTACT_SOCIALS.map((social) =>
              social.active ? (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 hover:text-[#f8fafc] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none"><path d={SOCIAL_ICON} fill="#F8FAFC" /></svg>
                  <span className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-[16px]">{social.name}</span>
                </a>
              ) : (
                <div key={social.name} className="flex items-center gap-2 px-3 py-2">
                  <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none"><path d={SOCIAL_ICON} fill="#62748E" /></svg>
                  <span className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">{social.name}</span>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
