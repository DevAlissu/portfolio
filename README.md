<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.3-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-5.0-000?style=flat-square&logo=npm&logoColor=white" />
</p>

<h1 align="center">
  <br />
  <code>DevAlissu</code>
  <br />
  <sub>portfolio interativo inspirado em IDE</sub>
</h1>

<p align="center">
  Portfolio pessoal com interface inspirada em editores de codigo, um Snake Game com animacao a 60fps renderizado em SVG, galeria de 26 projetos reais com lightbox, e formulario de contato com code preview ao vivo.
</p>

<p align="center">
  <a href="https://alissu.dev"><strong>alissu.dev</strong></a>
</p>

<br />

## Visao geral

O projeto simula a experiencia de navegar em uma IDE: abas no topo, file explorer lateral com pastas expansiveis, syntax highlighting nos textos e um terminal estetico. Cada pagina segue essa linguagem visual.

| Pagina | O que faz |
|--------|-----------|
| `_hello` | Hero com apresentacao e Snake Game integrado |
| `_sobre-mim` | File explorer com bio, experiencia profissional, formacao, publicacoes e hobbies |
| `_projetos` | Galeria com filtro hierarquico por tecnologia, modal expansivel e lightbox |
| `_entre-em-contato` | Formulario com validacao, sidebar de contatos e code preview em tempo real |

<br />

## Snake Game

O jogo da cobrinha nao e um detalhe decorativo. E um jogo completo com mecanicas reais.

**Renderizacao**: SVG com `requestAnimationFrame` a 60fps. A cabeca da cobra interpola suavemente entre posicoes do grid enquanto o corpo permanece alinhado. A cauda retrai com um ponto de extensao que simula movimento fluido. Sem CSS transitions, sem React re-renders no loop de jogo.

**Modos de jogo**:
- Casual: coma 15 alimentos para vencer
- Competitivo: sem limite, pontuacao infinita com leaderboard

**Dificuldades**:
- Facil (200ms por tick), Normal (150ms), Dificil (100ms)

**Controles**: setas do teclado, WASD, espaco para pausar, botoes direcionais na tela

**State**: Zustand store com selectors individuais para evitar re-renders. Direction queue previne inputs perdidos. High score e leaderboard (top 10) persistidos em localStorage.

<br />

## Projetos

26 projetos reais mapeados do GitHub com screenshots, descricoes detalhadas e links.

**Filtro hierarquico**: sidebar no estilo file explorer com categorias (frontend, backend, databases, languages) e subcategorias (frameworks, ui-libs, styling, state, data-fetching, forms, routing, charts, mapas, bundler). Cada tecnologia tem seu icone oficial via `devicons-react`.

**Modal**: expansivel para 90% da viewport, galeria de imagens com thumbnails, lightbox fullscreen, navegacao por teclado (setas e ESC), detalhes completos do projeto, badges de tecnologia e links para repositorio/deploy.

**Destaques do portfolio**:
- **Nansen IoT**: monitoramento energetico industrial (React, Ant Design, Recharts, Django)
- **IA-FogoBio**: deteccao de queimadas com dados NASA (MapLibre GL, FastAPI, Python ML)
- **CodeBot SaaS**: review de codigo com IA (Turborepo, Fastify, PostgreSQL, Discord)
- **Sistema Melo**: ERP completo (Next.js, Prisma, PostgreSQL, Oracle)
- **Drawnomes**: plataforma de amigo secreto com chat ao vivo (React, Zustand, React Query)

<br />

## Sobre mim

A pagina recria um file explorer com pastas expansiveis e arquivos selecionaveis. O conteudo muda dinamicamente ao clicar em cada "arquivo".

**Secoes**:
- `informacoes-pessoais/` : bio, interesses, formacao (ensino medio, universidade, capacitacoes)
- `info-profissional/` : 8 experiencias profissionais incluindo UEA, INOVA-IFAM, Ludus Lab, INPA, FAPEAM
- `publicacoes/` : artigo IEEE Xplore (Green Energy) e SBIE 2024 (Gamificacao)
- `hobbies/`

No desktop a sidebar e fixa. No mobile vira accordion inline colapsavel.

<br />

## Contato

Formulario com 3 campos (nome, email, mensagem), validacao de email com feedback visual (borda vermelha, icone de erro, tooltip), estados de sucesso e erro.

No desktop, ao lado do formulario aparece um **code preview** que mostra os dados digitados como um objeto JavaScript com syntax highlighting em tempo real. A sidebar lateral lista email, telefone e links sociais.

No mobile, a sidebar aparece como accordion colapsavel no topo e o code preview fica oculto.

<br />

## Arquitetura

```
src/
├── app/                          # App.tsx, routes.tsx
├── features/
│   ├── home/                     # HomePage
│   ├── about/                    # AboutPage + FileExplorer + hooks + constants
│   ├── projects/                 # ProjectsPage + TechFilter + Modal + Lightbox
│   ├── contact/                  # ContactPage + Form + CodePreview + Sidebar
│   ├── snake-game/               # SnakeGame + GameCanvas + Store + hooks + utils
│   └── not-found/                # 404
├── shared/
│   ├── components/layout/        # Header, Footer, Layout
│   ├── constants/                # navegacao
│   ├── services/                 # api base
│   └── utils/                    # cn (clsx + tailwind-merge)
└── styles/                       # index, fonts, tailwind, theme
```

Cada feature e um ecossistema isolado com seus proprios `components/`, `hooks/`, `store/`, `types/`, `constants/` e `services/`. Imports entre features passam pelo barrel export (`index.ts`).

<br />

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 + TypeScript 5.7 |
| Estilizacao | Tailwind CSS v4 |
| Estado global | Zustand 5 (selectors granulares) |
| Roteamento | React Router 7 |
| Build | Vite 6 |
| Icones | Lucide React + Devicons React |
| Fontes | Fira Code (monospace) + Buenard (serif) |
| Deploy | Oracle Cloud VM + Caddy (HTTPS automatico) |
| CI/CD | GitHub Actions (build + SCP + Caddy reload) |

<br />

## Performance

- `React.memo()` nos sub-componentes do Snake Game
- `useMemo()` para lista de projetos filtrados
- Selectors individuais no Zustand (um por valor) para prevenir re-renders
- `requestAnimationFrame` para rendering do jogo, bypass completo do React no loop
- Atualizacao direta do DOM via ref no SVG path do jogo
- Tailwind v4 JIT, zero CSS nao utilizado no bundle

<br />

## Como rodar

```bash
# instalar dependencias
pnpm install

# desenvolvimento
pnpm dev

# build de producao
pnpm build

# preview do build
pnpm preview
```

Requisitos: Node.js 20+, pnpm

<br />

## Deploy

O projeto roda em uma VM Oracle Cloud com Caddy como servidor web (HTTPS automatico via Let's Encrypt).

O CI/CD esta configurado no GitHub Actions: a cada push na `main`, o workflow faz build com pnpm, envia os arquivos via SCP para o servidor e recarrega o Caddy.

<br />

## Paleta de cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Background | `#020618` | Fundo principal |
| Surface | `#1d293d` | Cards, hovers |
| Border | `#314158` | Bordas, separadores |
| Text Primary | `#f8fafc` | Texto principal |
| Text Secondary | `#90a1b9` | Texto secundario, comentarios |
| Green | `#43D9AD` | Snake, acentos positivos |
| Orange | `#ffb86a` | Aba ativa, botao submit |
| Purple | `#9d4edd` | Gradientes de fundo, modo competitivo |
| Cyan | `#00d5be` | Links, variaveis |
| Pink | `#ffa1ad` | Strings no code preview |

<br />

## Responsividade

| Breakpoint | Comportamento |
|-----------|--------------|
| < 768px | Menu hamburger, sidebars viram accordions inline, grid 1 coluna, Snake Game oculto |
| 768px+ | Navegacao desktop, grid 2 colunas |
| 1024px+ | Sidebars fixas laterais, grid 3 colunas, Snake Game visivel, code preview no contato |

Transicao entre paginas com efeito reveal via `clip-path` (200ms).

<br />

## Autor

**Alison Silva** (DevAlissu)

[![GitHub](https://img.shields.io/badge/@devalissu-181717?style=flat-square&logo=github)](https://github.com/devalissu)
[![LinkedIn](https://img.shields.io/badge/alisonsilvaa-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alisonsilvaa/)
[![Portfolio](https://img.shields.io/badge/alissu.dev-020618?style=flat-square&logo=googlechrome&logoColor=white)](https://alissu.dev)
