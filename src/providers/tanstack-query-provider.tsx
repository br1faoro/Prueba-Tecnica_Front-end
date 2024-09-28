import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface TanStackQueryProviderProps {
  children: ReactNode;
}

const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  },
};

export const TanStackQueryProvider: React.FC<TanStackQueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
