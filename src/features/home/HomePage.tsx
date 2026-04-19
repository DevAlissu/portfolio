import { lazy, Suspense } from 'react';

const SnakeGame = lazy(() =>
  import('../snake-game').then((m) => ({ default: m.SnakeGame })),
);

export function HomePage() {
  return (
    <div className="min-h-full relative">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-10 items-center">
          <div className="space-y-8 lg:space-y-12">
            <div className="space-y-4">
              <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-lg">
                Ola a todos!! eu sou o
              </p>
              <h1 className="space-y-2">
                <div className="text-5xl sm:text-6xl text-[#f8fafc] font-normal">Alissu</div>
                <div className="text-2xl sm:text-3xl text-[#b14eff] font-normal">
                  <span className="font-['Fira_Code',sans-serif]">{`> Front-end developer `}</span>
                  <span className="font-['Buenard',serif]">{`&&`}</span>
                  <span className="font-['Fira_Code',sans-serif]">{` Full-Stack developer`}</span>
                </div>
              </h1>
            </div>

            <div className="space-y-2 font-['Fira_Code',sans-serif] text-base">
              <p className="text-[#90a1b9]">{`// complete o jogo para continuar`}</p>
              <p className="text-[#90a1b9]">{`// Meu perfil no Github:`}</p>
              <p className="text-[#f8fafc]">
                <span className="text-[#9d4edd]">const</span>
                {` `}
                <span className="text-[#00d5be]">githubLink</span>
                {` = `}
                <a
                  href="https://github.com/devalissu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffa1ad] underline hover:text-[#ff8a98] transition-colors"
                >
                  "https://github.com/devalissu"
                </a>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex justify-end min-w-0">
            <Suspense fallback={<div className="w-full" />}>
              <SnakeGame className="w-full" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
