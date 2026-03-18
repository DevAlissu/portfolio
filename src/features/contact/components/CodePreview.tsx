import type { ContactFormData } from '../types';

interface CodePreviewProps {
  formData: ContactFormData;
  currentDate: string;
}

export function CodePreview({ formData, currentDate }: CodePreviewProps) {
  return (
    <div className="flex-1 flex gap-10 px-10 py-3">
      <div className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-[18px] leading-[27px] text-right pt-1">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="mb-0">{i + 1}</p>
        ))}
      </div>

      <div className="flex-1 font-['Fira_Code',sans-serif] text-[18px] leading-[27px] pt-1">
        <p className="mb-0">
          <span className="text-[#c27aff]">const</span>{' '}
          <span className="text-[#9d4edd]">button</span>{' '}
          <span className="text-[#c27aff]">=</span>{' '}
          <span className="text-[#9d4edd]">document</span>
          <span className="text-[#90a1b9]">.</span>
          <span className="text-[#9d4edd]">querySelector</span>
          <span className="text-[#90a1b9]">(</span>
          <span className="text-[#ffb86a]">'#sendBtn'</span>
          <span className="text-[#90a1b9]">);</span>
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">
          <span className="text-[#c27aff]">const</span>{' '}
          <span className="text-[#9d4edd]">message</span>{' '}
          <span className="text-[#c27aff]">=</span>{' '}
          <span className="text-[#90a1b9]">{'{'}</span>
        </p>
        <p className="mb-0">
          &nbsp;&nbsp;<span className="text-[#9d4edd]">name:</span>{' '}
          <span className="text-[#ffb86a]">"{formData.name || ''}"</span>
          <span className="text-[#90a1b9]">,</span>
        </p>
        <p className="mb-0">
          &nbsp;&nbsp;<span className="text-[#9d4edd]">email:</span>{' '}
          <span className="text-[#ffb86a]">"{formData.email || ''}"</span>
          <span className="text-[#90a1b9]">,</span>
        </p>
        <p className="mb-0">
          &nbsp;&nbsp;<span className="text-[#9d4edd]">message:</span>{' '}
          <span className="text-[#ffb86a]">"{formData.message || ''}"</span>
          <span className="text-[#90a1b9]">,</span>
        </p>
        <p className="mb-0">
          &nbsp;&nbsp;<span className="text-[#9d4edd]">date:</span>{' '}
          <span className="text-[#ffb86a]">"{currentDate}"</span>
        </p>
        <p className="mb-0"><span className="text-[#90a1b9]">{'}'}</span></p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">
          <span className="text-[#9d4edd]">button</span>
          <span className="text-[#90a1b9]">.</span>
          <span className="text-[#9d4edd]">addEventListener</span>
          <span className="text-[#90a1b9]">(</span>
          <span className="text-[#ffb86a]">'click'</span>
          <span className="text-[#90a1b9]">, () </span>
          <span className="text-[#c27aff]">=&gt;</span>
          <span className="text-[#90a1b9]"> {'{'}</span>
        </p>
        <p className="mb-0">
          &nbsp;&nbsp;<span className="text-[#9d4edd]">form</span>
          <span className="text-[#90a1b9]">.</span>
          <span className="text-[#9d4edd]">send</span>
          <span className="text-[#90a1b9]">(</span>
          <span className="text-[#9d4edd]">message</span>
          <span className="text-[#90a1b9]">);</span>
        </p>
        <p className="mb-0"><span className="text-[#90a1b9]">{'})'}</span></p>
      </div>
    </div>
  );
}
