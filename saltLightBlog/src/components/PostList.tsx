import { usePosts } from '../hooks/usePosts';
import { Card } from "./Card";
import { LogoSvg } from './helper/LogoSvg';


function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export function PostList() {
  const { data: posts, isLoading, error } = usePosts();
  
  if (isLoading) return <Spinner/>
  if (error) return (
    <div className="py-12 sm:py-16 text-center px-4">
      <div className="text-gray-800 text-xl sm:text-2xl mb-3 sm:mb-4">✝</div>
      <p className="text-sm sm:text-base text-gray-600 mb-2">Unable to load posts at this time</p>
      <p className="text-xs sm:text-sm text-gray-500">Please try again later</p>
    </div>
  );
  
  const blogs = posts.allPosts;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col text-center mb-8 sm:mb-10 md:mb-12">
          <div className="mx-auto my-3">
              <LogoSvg/>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2 ">
            Latest Posts
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-black mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed px-4">
            Join us on this spiritual journey as we explore faith, hope, and love through the lens of Scripture
          </p>
        </div>

        {/* Blog Posts Grid */}
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {blogs.map((el: any) => (
              <div key={el.id} className="group">
                <Card postInfo={el} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="text-gray-800 text-2xl sm:text-3xl mb-3 sm:mb-4">✝</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
              No posts available
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              New content will be posted soon. Check back later!
            </p>
          </div>
        )}

        {/* Decorative Bottom Border */}
        <div className="mt-12 sm:mt-14 md:mt-16 flex justify-center">
          <div className="w-24 sm:w-28 md:w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}