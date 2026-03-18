import ReactOriginal from 'devicons-react/lib/icons/ReactOriginal';
import ReactnativeOriginal from 'devicons-react/lib/icons/ReactnativeOriginal';
import VuejsOriginal from 'devicons-react/lib/icons/VuejsOriginal';
import AngularOriginal from 'devicons-react/lib/icons/AngularOriginal';
import FlutterOriginal from 'devicons-react/lib/icons/FlutterOriginal';
import TailwindcssOriginal from 'devicons-react/lib/icons/TailwindcssOriginal';
import PrimengOriginal from 'devicons-react/lib/icons/PrimengOriginal';
import AntdesignOriginal from 'devicons-react/lib/icons/AntdesignOriginal';
import NodejsOriginal from 'devicons-react/lib/icons/NodejsOriginal';
import FastifyOriginal from 'devicons-react/lib/icons/FastifyOriginal';
import FastapiOriginal from 'devicons-react/lib/icons/FastapiOriginal';
import DjangoPlain from 'devicons-react/lib/icons/DjangoPlain';
import PostgresqlOriginal from 'devicons-react/lib/icons/PostgresqlOriginal';
import MicrosoftsqlserverOriginal from 'devicons-react/lib/icons/MicrosoftsqlserverOriginal';
import PrismaOriginal from 'devicons-react/lib/icons/PrismaOriginal';
import SequelizeOriginal from 'devicons-react/lib/icons/SequelizeOriginal';
import TypescriptOriginal from 'devicons-react/lib/icons/TypescriptOriginal';
import JavascriptOriginal from 'devicons-react/lib/icons/JavascriptOriginal';
import PythonOriginal from 'devicons-react/lib/icons/PythonOriginal';
import JavaOriginal from 'devicons-react/lib/icons/JavaOriginal';
import CplusplusOriginal from 'devicons-react/lib/icons/CplusplusOriginal';
import NextjsOriginal from 'devicons-react/lib/icons/NextjsOriginal';
import ZustandOriginal from 'devicons-react/lib/icons/ZustandOriginal';
import AxiosPlain from 'devicons-react/lib/icons/AxiosPlain';
import ReactrouterOriginal from 'devicons-react/lib/icons/ReactrouterOriginal';
import FramermotionOriginal from 'devicons-react/lib/icons/FramermotionOriginal';
import StyledcomponentsOriginal from 'devicons-react/lib/icons/StyledcomponentsOriginal';
import VitejsOriginal from 'devicons-react/lib/icons/VitejsOriginal';
import ChartjsOriginal from 'devicons-react/lib/icons/ChartjsOriginal';
import SupabaseOriginal from 'devicons-react/lib/icons/SupabaseOriginal';
const S = 16;

export const TECH_ICONS: Record<string, React.ReactNode> = {
  React: <ReactOriginal size={S} />,
  'React Native': <ReactnativeOriginal size={S} />,
  Vue: <VuejsOriginal size={S} />,
  Angular: <AngularOriginal size={S} />,
  Flutter: <FlutterOriginal size={S} />,
  Tailwind: <TailwindcssOriginal size={S} />,
  PrimeReact: <PrimengOriginal size={S} />,
  'Ant Design': <AntdesignOriginal size={S} />,
  'Node.js': <NodejsOriginal size={S} />,
  Fastify: <FastifyOriginal size={S} />,
  FastAPI: <FastapiOriginal size={S} />,
  Django: <DjangoPlain size={S} />,
  PostgreSQL: <PostgresqlOriginal size={S} />,
  'SQL Server': <MicrosoftsqlserverOriginal size={S} />,
  Prisma: <PrismaOriginal size={S} />,
  Sequelize: <SequelizeOriginal size={S} />,
  TypeScript: <TypescriptOriginal size={S} />,
  JavaScript: <JavascriptOriginal size={S} />,
  Python: <PythonOriginal size={S} />,
  Java: <JavaOriginal size={S} />,
  'C++': <CplusplusOriginal size={S} />,
  'Next.js': <NextjsOriginal size={S} />,
  Zustand: <ZustandOriginal size={S} />,
  Axios: <AxiosPlain size={S} />,
  'React Router': <ReactrouterOriginal size={S} />,
  'Framer Motion': <FramermotionOriginal size={S} />,
  'Styled Components': <StyledcomponentsOriginal size={S} />,
  Vite: <VitejsOriginal size={S} />,
  'Chart.js': <ChartjsOriginal size={S} />,
  Recharts: (
    <svg viewBox="0 0 16 16" className="w-4 h-4">
      <rect width="16" height="16" rx="3" fill="#22B5BF" />
      <rect x="3" y="8" width="2.5" height="5" rx="0.5" fill="white" />
      <rect x="6.8" y="5" width="2.5" height="8" rx="0.5" fill="white" />
      <rect x="10.5" y="3" width="2.5" height="10" rx="0.5" fill="white" />
    </svg>
  ),
  Supabase: <SupabaseOriginal size={S} />,
  'MapLibre GL': (
    <svg viewBox="0 0 16 16" className="w-4 h-4">
      <rect width="16" height="16" rx="3" fill="#4264FB" />
      <path d="M8 3L4 7L8 13L12 7L8 3Z" fill="white" opacity="0.9" />
      <circle cx="8" cy="7" r="1.5" fill="#4264FB" />
    </svg>
  ),
  'React Query': (
    <svg viewBox="0 0 16 16" className="w-4 h-4">
      <rect width="16" height="16" rx="3" fill="#002C4B" />
      <path d="M8 3C5.2 3 3 5.2 3 8C3 10.8 5.2 13 8 13C10.8 13 13 10.8 13 8" stroke="#FF4154" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="5" r="2" fill="#FFD94C" />
    </svg>
  ),
  // Sem icone na lib - SVG manual
  'shadcn/ui': (
    <svg viewBox="0 0 16 16" className="w-4 h-4">
      <rect width="16" height="16" rx="3" fill="#111" />
      <path d="M5 11L11 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  Drizzle: (
    <svg viewBox="0 0 16 16" className="w-4 h-4">
      <rect width="16" height="16" rx="3" fill="#111" />
      <path d="M4 5L7 3V7L4 9V5Z" fill="#C5F74F" />
      <path d="M9 7L12 5V9L9 11V7Z" fill="#C5F74F" />
    </svg>
  ),
  'React Hook Form': (
    <svg viewBox="0 0 16 16" className="w-4 h-4">
      <rect width="16" height="16" rx="3" fill="#EC5990" />
      <path d="M4 5H12M4 8H10M4 11H8" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'React Toastify': (
    <svg viewBox="0 0 16 16" className="w-4 h-4">
      <rect width="16" height="16" rx="3" fill="#FFBD2E" />
      <rect x="3" y="5" width="10" height="6" rx="1.5" fill="white" />
      <path d="M5 8H11" stroke="#FFBD2E" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
};
