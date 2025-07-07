import { useQuery } from '@tanstack/react-query';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
      return res.json();
    },
  });
} 