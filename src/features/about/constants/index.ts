import type { AboutTab } from "../types";

interface AboutContentItem {
  title: string;
  lines: string[];
  format: "comment" | "list" | "text";
}

export const ABOUT_CONTENT: Record<AboutTab, AboutContentItem> = {
  bio: {
    title: "/**",
    lines: [
      "* Sobre mim",
      "* Engenheiro de software fullstack com forte atuacao em P&D",
      "* e projetos de inovacao tecnologica. Combino desenvolvimento",
      "* de alto nivel (aplicacoes web e mobile) com baixo nivel",
      "* (sistemas embarcados e IoT).",
      "*",
      "* Experiencia consolidada em frontend moderno (React, Angular,",
      "* Flutter), arquitetura de APIs (FastAPI, Django, Fastify) e",
      "* inteligencia artificial (visao computacional, ML).",
      "*",
      "* Lideranca tecnica em multiplos projetos, desde plataformas",
      "* enterprise ate jogos educacionais e sistemas IoT industriais.",
    ],
    format: "comment",
  },
  interests: {
    title: "// Meus interesses incluem:",
    lines: [
      "Desenvolvimento de aplicacoes web e mobile",
      "Arquitetura de software e design patterns",
      "Inteligencia artificial e visao computacional",
      "IoT e sistemas embarcados",
      "DevOps e CI/CD",
      "Metodologias ageis e processo de software",
      "UI/UX Design",
    ],
    format: "list",
  },
  "high-school": {
    title: "// Ensino Medio",
    lines: ["Fundacao Matias Machline", "2018 - 2020"],
    format: "text",
  },
  university: {
    title: "// Universidade",
    lines: [
      "Bacharelado em Engenharia de Software",
      "Instituto Federal do Amazonas (IFAM)",
      "Grupo de pesquisa: Tech Thinkers",
      "Artigo aprovado no SBIE 2024 (Rio de Janeiro)",
    ],
    format: "text",
  },
  capacitacoes: {
    title: "// Capacitacoes",
    lines: [
      "DevTitans (UFAM/Icomp) - Desenvolvimento embarcado Android/AOSP e microcontroladores",
      "Web Academy (UFAM/Icomp) - Desenvolvimento web fullstack (ouvinte/visitante)",
      "Capacitar 4.0 (IFAM-CMDI) - Industria 4.0: Python Avancado, Big Data, Redes Neurais, Machine Learning, Deep Learning e Visao Computacional",
    ],
    format: "list",
  },
  "xp-uea": {
    title: "// UEA - Lab Nexus/Connexus",
    lines: [
      "Tech Lead Frontend | out/2025 - atual",
      "Promovido a lider tecnico frontend no projeto iRMA.",
      "",
      "Desenvolvedor Fullstack | out/2025 - atual",
      "Projeto iRMA (Intelligent Return Material Authorization) - Zilia Tecnologia.",
      "Frontend: 200+ componentes React 18/TS/Vite, Smart Stores (Zustand), PrimeReact, React Hook Form + Zod, ACL granular.",
      "Backend: APIs FastAPI + SQLAlchemy, PostgreSQL e MySQL, integracao SAP via PyRFC, Docker, VPN FortiGate.",
      "",
      "Desenvolvedor Frontend | nov/2024 - out/2025",
      "Tabelas virtualizadas, scroll infinito, CSS Modules, Axios com interceptors JWT, GitFlow, CI/CD.",
    ],
    format: "text",
  },
  "xp-inova": {
    title: "// INOVA - Polo de Inovacao IFAM",
    lines: [
      "Lider Frontend - IA-FogoBio | atual",
      "Lideranca do time de frontend no projeto IA-FogoBio (deteccao de incendios com IA).",
      "",
      "Lider Frontend - INOC | atual",
      "Lideranca do time de frontend no projeto INOC.",
      "",
      "Desenvolvedor Frontend - MySquare & Business HUB | out/2025 - atual",
      "Liderando time de frontends no projeto MySquare & Inova - Business HUB.",
      "",
      "Dev Frontend Pleno - Nansen NGE | jan/2025 - set/2025",
      "Plataforma de eficiencia energetica industrial. Lideranca tecnica, Angular 13/React, Ant Design, MUI, PrimeReact, Tailwind, Django 5, PostgreSQL, Docker, Celery.",
      "",
      "Dev Mobile - Nansen NGE | jun/2024 - fev/2025",
      "App mobile com Flutter/Dart, arquitetura MVVM, missoes gamificadas, quizzes, sistema de XP e NansenCoins.",
      "",
      "Dev Visao Computacional | ago/2023 - ago/2024",
      "Sistema RULA de analise ergonomica: MediaPipe, OpenCV, NumPy, 30 FPS, precisao 92%, alertas em tempo real, dashboard Streamlit.",
    ],
    format: "text",
  },
  "xp-ludus": {
    title: "// Ludus Lab - UEA/Gertec",
    lines: [
      "Desenvolvedor Frontend | ago/2024 - fev/2025",
      "Projeto RKL - gerenciamento remoto de chaves criptograficas para terminais POS (maquininhas de pagamento).",
      "Angular + TypeScript, dashboards de controle, RxJS, autenticacao, auditoria, UI/UX Design no Figma.",
      "Parceria UEA + Gertec em P&D de seguranca financeira.",
    ],
    format: "text",
  },
  "xp-inpa": {
    title: "// INPA - Projeto IETE",
    lines: [
      "Desenvolvedor Frontend",
      "Interface web com React integrando microcontroladores ESP-32 para monitoramento em tempo real de bacias hidrograficas urbanas.",
      "Zustand, Recharts e Leaflet para visualizacao geoespacial de dados ambientais.",
    ],
    format: "text",
  },
  "xp-fapeam": {
    title: "// FAPEAM - Iniciacao Cientifica",
    lines: [
      "Pesquisador PIBIC | set/2024 - jan/2025",
      "Pesquisa sobre gamificacao e pensamento computacional no ensino de logica.",
      "Desenvolveu JungleLogic: jogo educacional mobile com React Native, ambientado na Amazonia.",
      "Personalizacao baseada no Modelo VARK. Artigo aprovado no SBIE 2024 (Rio de Janeiro).",
    ],
    format: "text",
  },
  "xp-aranoua": {
    title: "// Projeto Aranoua",
    lines: [
      "Monitor de Metodologia Cientifica | set/2024 - jan/2025",
      "Bolsista Aluno | ago/2023 - set/2024",
    ],
    format: "text",
  },
  "xp-semed": {
    title: "// SEMED - Manaus",
    lines: [
      "Professor de Robotica",
      "Aulas para turmas do 4o ano utilizando LEGO Mindstorms, Modelix e Scratch.",
      "Desenvolvimento de pensamento computacional em criancas.",
    ],
    format: "text",
  },
  "xp-melo": {
    title: "// Melo Distribuidora",
    lines: [
      "Desenvolvedor Fullstack",
      "Projeto Sistema Melo - ERP corporativo completo.",
      "Frontend: Next.js 14, shadcn/ui, Recharts, React Hook Form.",
      "Backend: Node.js, Prisma, Sequelize, PostgreSQL, Oracle.",
      "Modulos: cadastros, financeiro, compras, estoque, vendas, relatorios PDF/Excel, controle de acesso multi-filial.",
    ],
    format: "text",
  },
  "pub-ieee": {
    title: "// IEEE Xplore, Scopus, Ei Compendex",
    lines: [
      "Green Energy: An IoT-Driven, LLM-Enhanced Gamification Platform for Industrial Energy Efficiency, Conservation and Savings",
      "Agosto 2025",
      "",
      "Plataforma gamificada com IoT e LLM para promover eficiencia energetica, conservacao e economia de energia em ambientes industriais.",
    ],
    format: "text",
  },
  "pub-sbie": {
    title: "// SBIE 2024 - CBIE",
    lines: [
      "Impacto da Gamificacao no Aprendizado de Logica: Promovendo o Pensamento Computacional e Adaptando aos Estilos de Aprendizagem",
      "Novembro 2024 - Rio de Janeiro",
      "",
      "JungleLogic: jogo educacional ambientado na Amazonia com personalizacao baseada no Modelo VARK e pilares do Pensamento Computacional.",
    ],
    format: "text",
  },
  hobbies: {
    title: "// Hobbies e interesses pessoais",
    lines: [
      "Filosofia e pensamentos antigos",
      "Literatura",
      "Historia",
      "Caminhada",
      "Musica",
      "Comecando a academia",
    ],
    format: "list",
  },
};

export interface SidebarFile {
  key: string;
  label: string;
  iconColor: string;
}

export interface SidebarFolder {
  key: string;
  label: string;
  iconColor: string;
  files?: SidebarFile[];
  subFolders?: SidebarFolder[];
}

export const SIDEBAR_SECTIONS: SidebarFolder[] = [
  {
    key: "personal-info",
    label: "informacoes-pessoais",
    iconColor: "#ad46ff",
    files: [
      { key: "bio", label: "bio", iconColor: "#ffa1ad" },
      { key: "interests", label: "interesses", iconColor: "#43D9AD" },
    ],
    subFolders: [
      {
        key: "education",
        label: "formacao",
        iconColor: "#ad46ff",
        files: [
          { key: "high-school", label: "ensino-medio", iconColor: "#90a1b9" },
          { key: "university", label: "universidade", iconColor: "#90a1b9" },
          { key: "capacitacoes", label: "capacitacoes", iconColor: "#90a1b9" },
        ],
      },
    ],
  },
];

export const COLLAPSED_SECTIONS: SidebarFolder[] = [
  {
    key: "professional-info",
    label: "info-profissional",
    iconColor: "#43D9AD",
    files: [
      { key: "xp-uea", label: "uea-nexus", iconColor: "#43D9AD" },
      { key: "xp-inova", label: "inova-ifam", iconColor: "#43D9AD" },
      { key: "xp-ludus", label: "ludus-lab", iconColor: "#43D9AD" },
      { key: "xp-inpa", label: "inpa", iconColor: "#43D9AD" },
      { key: "xp-melo", label: "melo-distribuidora", iconColor: "#43D9AD" },
      { key: "xp-fapeam", label: "fapeam-pibic", iconColor: "#43D9AD" },
      { key: "xp-aranoua", label: "aranoua", iconColor: "#43D9AD" },
      { key: "xp-semed", label: "semed", iconColor: "#43D9AD" },
    ],
  },
  {
    key: "publications",
    label: "publicacoes",
    iconColor: "#ffb86a",
    files: [
      { key: "pub-ieee", label: "green-energy-ieee", iconColor: "#ffb86a" },
      { key: "pub-sbie", label: "gamificacao-sbie", iconColor: "#ffb86a" },
    ],
  },
  {
    key: "hobbies",
    label: "hobbies",
    iconColor: "#9d4edd",
    files: [
      { key: "hobbies", label: "interesses-pessoais", iconColor: "#9d4edd" },
    ],
  },
];
