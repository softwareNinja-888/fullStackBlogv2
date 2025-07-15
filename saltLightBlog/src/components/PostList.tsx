import { usePosts } from '../hooks/usePosts';
import { Card } from "./Card";


export function PostList() {
  const { data: posts, isLoading, error } = usePosts();
  if (isLoading) return <p>Loading posts…</p>;
  if (error) return <p>Error loading posts</p>;

  const blogs = posts.allPosts

  return (

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {blogs.map((el: any)=>{
                      console.log('Element:',el)
                        return <Card key={el.id} postInfo={el}/>
                    })}
                </div>
  );
} 