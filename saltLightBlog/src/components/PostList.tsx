import { usePosts } from '../hooks/usePosts';
export default function PostList() {
  const { data: posts, isLoading, error } = usePosts();
  if (isLoading) return <p>Loading posts…</p>;
  if (error) return <p>Error loading posts</p>;
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
} 