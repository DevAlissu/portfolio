import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, CONTACT_NAV } from '../../constants/navigation';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-[#314158] bg-[#020618]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="px-6 py-4 border-r border-[#314158]">
            <Link to="/">
              <p className="font-['Fira_Code',sans-serif] font-[450] text-[#90a1b9] text-base whitespace-nowrap">
                DevAlissu
              </p>
            </Link>
          </div>

          <nav className="hidden md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 lg:px-8 py-4 border-r border-[#314158] font-['Fira_Code',sans-serif] font-[450] text-sm lg:text-base transition-colors whitespace-nowrap ${
                  isActive(item.path)
                    ? 'text-[#f8fafc]'
                    : 'text-[#90a1b9] hover:text-[#f8fafc]'
                }`}
              >
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ffb86a]" />
                )}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center shrink-0">
          <Link
            to={CONTACT_NAV.path}
            className={`px-4 lg:px-8 py-4 border-l border-[#314158] font-['Fira_Code',sans-serif] font-[450] text-sm lg:text-base transition-colors whitespace-nowrap ${
              isActive(CONTACT_NAV.path)
                ? 'text-[#f8fafc]'
                : 'text-[#90a1b9] hover:text-[#f8fafc]'
            }`}
          >
            {isActive(CONTACT_NAV.path) && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ffb86a]" />
            )}
            {CONTACT_NAV.label}
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden px-6 py-4 border-l border-[#314158] text-[#90a1b9]"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#314158] bg-[#0a1628]">
          <div className="p-6 space-y-1">
            <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-sm mb-4">
              # navegar:
            </p>
            {[...NAV_ITEMS, { path: '/contato' as const, label: '_contato' as const }].map(
              (item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 font-['Fira_Code',sans-serif] font-[450] text-base transition-colors ${
                    isActive(item.path)
                      ? 'text-[#f8fafc]'
                      : 'text-[#90a1b9] hover:text-[#f8fafc]'
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
