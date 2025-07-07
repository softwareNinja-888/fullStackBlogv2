import { useParams } from '@tanstack/react-router';

export default function BlogDetail() {
  const { id } = useParams({ strict: false });
  return <div>Viewing blog post with ID: {id}</div>;
}
