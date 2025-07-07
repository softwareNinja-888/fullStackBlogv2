import { usePosts } from '../hooks/usePosts';

export function PostList() {
  const { data: posts, isLoading, error } = usePosts();
  if (isLoading) return <p>Loading posts…</p>;
  if (error) return <p>Error loading posts</p>;

  const postDraft = posts.allPosts

  return (
    <ul>
      {postDraft.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
} 