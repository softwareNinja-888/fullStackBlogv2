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

export function usePostBySlug(slug: string) {
  return useQuery({
    queryKey: ['postInfo', slug],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
      if (!res.ok) throw new Error('Post not found');
      return res.json();
    },
  });
}
