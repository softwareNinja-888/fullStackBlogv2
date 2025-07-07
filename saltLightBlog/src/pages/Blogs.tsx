import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { Line } from "../components/helper/Line";
import { Card } from "../components/Card";

import { usePosts } from '../hooks/usePosts';


function BlogOfWeek({blog}){
    
    return (
        <>
            <div className="flex bg-center bg-cover bg-no-repeat h-72 px-5 py-5 relative w-10/12 border border-black " style={{backgroundImage: `url('${blog.featuredImage}')`}}>
                <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
                <div className="flex flex-col gap-4 relative z-10 justify-center">
                    <div className="text-white font-poppins text-lg">Blog of the Week</div>
                    <div className="text-white font-mono text-md">{blog.title}</div>
                    <Link to={`/blogs/${blog.slug}`} className="font-nunito text-black border border-white w-7/12 flex justify-center px-6 py-2 bg-white text-sm">Read More</Link>
                </div>
            </div>
        </>
    )
}

export function Blogs({num=6,all=false,px='px-0'}){


    const { data: posts, isLoading, error } = usePosts();
    const blogs = posts.allPosts

    const navigate = useNavigate()
    function handleNav(path){
      navigate(path)
    }

    // SEARCH FOR BLOG OF WEEK
    console.log('gh',blogs)
    if (error) return <p>Error loading posts</p>;

    return(
        <>
           {isLoading ? <Spinner/> : (
             <div className="mt-30">
                {/*<div className="flex flex-col justify-center gap-5 items-center mt-20 overflow-hidden">*/}
                    {/*<BlogOfWeek/>*/}
                {/*</div>*/}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${px}`}>
                    {blogs.map((el)=>{
                      console.log('Element:',el)
                        return <Card key={el.id} postInfo={el}/>
                    })}
                </div>
                <div className="my-20">
                    <Line/>
                </div>
              </div>
            )}
        </>
    )
}