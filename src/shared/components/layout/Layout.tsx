import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { ShaderBackground } from '../decorative/ShaderBackground';
import { CodeRain } from '../decorative/CodeRain';
import { useSettingsStore } from '../../store/useSettingsStore';

export function Layout() {
  const location = useLocation();
  const background = useSettingsStore((s) => s.background);
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  // move o foco para o conteudo principal ao trocar de rota (leitores de tela)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="h-dvh flex flex-col bg-[#06000a] relative overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {background === 'waves' && <ShaderBackground variant="waves" />}
        {background === 'dust' && <ShaderBackground variant="dust" />}
        {background === 'matrix' && <CodeRain />}
      </div>

      <div className="relative z-10 flex flex-col h-full min-h-0">
        <Header />
        <main
          ref={mainRef}
          key={location.pathname}
          tabIndex={-1}
          className="flex-1 min-h-0 overflow-auto animate-tab-fade-in outline-none"
        >
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function PageFallback() {
  return (
    <div className="h-full flex items-center justify-center" role="status" aria-live="polite">
      <p className="font-['Fira_Code',sans-serif] text-[#aeb9d0] text-base animate-pulse">
        // carregando...
      </p>
    </div>
  );
}
