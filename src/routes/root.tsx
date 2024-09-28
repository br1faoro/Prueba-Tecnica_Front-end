import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '@components/app';
import UsersPage from '@/features/users/pages/users-page';
import UserDetailsPage from '@/features/users/pages/user-details-page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
      {
        path: '/user-details/:username',
        element: <UserDetailsPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
