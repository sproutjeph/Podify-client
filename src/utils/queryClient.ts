import {QueryClient} from '@tanstack/react-query';

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // onError: queryErrorHandler,
        staleTime: 3000000, // 50 mins to refetch
        cacheTime: 3600000, // 60 mins for cache data
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });
}

export const queryClient = generateQueryClient();
