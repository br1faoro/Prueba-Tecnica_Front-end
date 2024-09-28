import { createRoot } from 'react-dom/client';
import { TanStackQueryProvider } from '@/providers/tanstack-query-provider';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/root';
import '@assets/styles/app.scss';

createRoot(document.getElementById('root')!).render(
  <TanStackQueryProvider>
    <RouterProvider router={router} />
  </TanStackQueryProvider>
);
