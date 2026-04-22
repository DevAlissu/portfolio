import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_SOCIALS } from '../constants';

export function ContactSidebar() {
  const [expandedContacts, setExpandedContacts] = useState(false);
  const [expandedSocial, setExpandedSocial] = useState(false);

  return (
    <aside className="w-full lg:w-[clamp(200px,20vw,311px)] lg:border-r border-[#314158] shrink-0">
      <div className="border-b border-[#314158]">
        <button
          onClick={() => setExpandedContacts(!expandedContacts)}
          className="w-full px-6 py-3 flex items-center gap-3 hover:bg-[#1d293d]/20 transition-colors"
        >
          <div className="w-4 h-4">
            <svg viewBox="0 0 8 4" className={`w-full h-full transition-transform ${expandedContacts ? '' : '-rotate-90'}`}>
              <path d="M4 4L0 0H8L4 4Z" fill="#F8FAFC" />
            </svg>
          </div>
          <span className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-[16px]">contatos</span>
        </button>

        {expandedContacts && (
          <div className="px-3 pb-3 space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 text-[#62748E]">
              <Mail size={16} strokeWidth={1.8} />
              <span className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">{CONTACT_EMAIL}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-[#62748E]">
              <Phone size={16} strokeWidth={1.8} />
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
            <svg viewBox="0 0 8 4" className={`w-full h-full transition-transform ${expandedSocial ? '' : '-rotate-90'}`}>
              <path d="M4 4L0 0H8L4 4Z" fill="#F8FAFC" />
            </svg>
          </div>
          <span className="font-['Fira_Code',sans-serif] text-[#f8fafc] text-[16px]">me-encontre-tambem-em</span>
        </button>

        {expandedSocial && (
          <div className="px-3 pb-3 space-y-2">
            {CONTACT_SOCIALS.map((social) => {
              const Icon = social.icon;
              return social.active ? (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-[#f8fafc] hover:text-[#43D9AD] transition-colors"
                >
                  <Icon width={16} height={16} />
                  <span className="font-['Fira_Code',sans-serif] text-[16px]">{social.name}</span>
                </a>
              ) : (
                <div key={social.name} className="flex items-center gap-2 px-3 py-2 text-[#62748E]">
                  <Icon width={16} height={16} />
                  <span className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[16px]">{social.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
