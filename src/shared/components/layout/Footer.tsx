import { Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#314158] bg-[#020618] mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-4">
        <div className="flex items-center gap-2">
          <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-sm">me encontre em:</p>
        </div>

        <div className="flex items-center divide-x divide-[#314158]">
          <a
            href="https://www.linkedin.com/in/alisonsilvaa/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-[#90a1b9] hover:text-[#f8fafc] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/devalissu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-[#90a1b9] hover:text-[#f8fafc] transition-colors flex items-center gap-2"
            aria-label="GitHub"
          >
            <span className="font-['Fira_Code',sans-serif] text-sm hidden sm:inline">
              @devalissu
            </span>
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
