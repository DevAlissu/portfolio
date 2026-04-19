import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { Layout } from '../shared/components/layout';

const HomePage = lazy(() => import('../features/home').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('../features/about').then((m) => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('../features/projects').then((m) => ({ default: m.ProjectsPage })));
const ContactPage = lazy(() => import('../features/contact').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('../features/not-found').then((m) => ({ default: m.NotFoundPage })));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'sobre-mim', Component: AboutPage },
      { path: 'projetos', Component: ProjectsPage },
      { path: 'contato', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
