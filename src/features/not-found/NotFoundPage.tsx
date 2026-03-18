import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="font-['Fira_Code',sans-serif] text-[#43D9AD] text-6xl sm:text-8xl font-bold">
          404
        </h1>
        <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-xl sm:text-2xl">
          // Pagina nao encontrada
        </p>
        <p className="font-['Fira_Code',sans-serif] text-[#90a1b9] text-base">
          A pagina que voce procura nao existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#ffb86a] hover:bg-[#ffb86a]/90 transition-colors px-6 py-3 rounded-lg font-['Fira_Code',sans-serif] font-[450] text-[#020618] text-base"
        >
          Voltar para home
        </Link>
      </div>
    </div>
  );
}
