import { useQuery } from '@tanstack/react-query';

export function usePosts() {
  return useQuery(['posts'], () =>
    fetch('https://dummyapi.io/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
  );
} 