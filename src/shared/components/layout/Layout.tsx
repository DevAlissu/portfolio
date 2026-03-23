import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();

  return (
    <div className="h-dvh flex flex-col bg-[#020618] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] right-[15%] w-[600px] h-[600px] bg-[#9d4edd] rounded-full blur-[200px] opacity-30" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-[#7b2cbf] rounded-full blur-[180px] opacity-25" />
        <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-[#5a189a] rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col h-full min-h-0">
        <Header />
        <main key={location.pathname} className="flex-1 min-h-0 overflow-auto animate-tab-fade-in">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
