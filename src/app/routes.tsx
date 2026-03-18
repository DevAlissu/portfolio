import { createBrowserRouter } from 'react-router';
import { Layout } from '../shared/components/layout';
import { HomePage } from '../features/home';
import { AboutPage } from '../features/about';
import { ProjectsPage } from '../features/projects';
import { ContactPage } from '../features/contact';
import { NotFoundPage } from '../features/not-found';

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
