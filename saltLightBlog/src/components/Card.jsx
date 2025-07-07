import { Line } from "./helper/Line";
import { Eye, MessageCircle, Heart } from "lucide-react";
import { Link } from '@tanstack/react-router';

function truncateText(text,maxLength=244){
    if (text === undefined){
        return
    }
    return text.length > maxLength ? text.slice(0,maxLength) + '....': text;
} 

function isWithinXDays(dateStr){
    const now = new Date()
    const targetDate = new Date(dateStr)

    const diffInMs = now - targetDate
    const diffInDays = diffInMs / (1000 * 60 * 60 *24)

    return diffInDays >= 0 && diffInDays <= 5;
}

export function Card({
  postName = 'Back to Fiction: What I am reading this year.',
  feature = false,
  postInfo = {},
  isNew = false,
  img = 'https://fakeimg.pl/600x400?text=profile',
  width = 'w-100',
}) {

    // TEMP FIND BETTER WAY IN FUTURE:\
    const getSummary = (content, maxLength = 180) => {
      const parsed = typeof content === 'string' ? JSON.parse(content) : content;
      const combined = Object.values(parsed).join(' ');
      return combined.length > maxLength
        ? combined.slice(0, maxLength).trim() + '...'
        : combined;
    };
  
  const formattedContent = getSummary(postInfo.content)

  console.log('summary:',formattedContent)
  const newStatus = isWithinXDays(postInfo.createdAt);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function estimateReadingTime(content) {
    const words = content?.split(/\s+/).length || 0;
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute);
  }

  return (
    <div className={`flex flex-col gap-5 px-10 py-10 ${width} min-h-fit text-black`}>
      {feature && (
        <div className="font-mono text-lg border border-black w-1/3 px-2 py-1 text-center">
          Featured Post
        </div>
      )}

      <Link to={`/blogs/${postInfo.slug}`} className={`relative group border-1 border-black cursor-pointer ${feature ? 'w-1/3' : 'w-full'}`}>
        {/* Image */}
        <div className="overflow-hidden aspect-w-1 aspect-h-1">
          <img
            className="object-cover w-full h-74 transition-all duration-300 group-hover:scale-125"
            src={postInfo.featuredImage || img}
            alt={`${postInfo.title || postName} image`}
          />
        </div>

        {/* New status */}
        {newStatus && (
          <div className="absolute left-3 top-3">
            <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-700 uppercase bg-white">New</p>
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col">
          <div className="p-3">
            <div className="flex gap-2 font-poppins text-sm mb-3">
              <img src={postInfo.author?.avatar} alt="profile image" className="w-8 h-8" />
              <div className="self-center">{postInfo.author?.name}</div>
            </div>
            <div className="flex font-geist text-sm gap-2">
              <div>{formatDate(postInfo.createdAt)}</div>
              <div> &#183;</div>
              <div>{estimateReadingTime(postInfo.content)} min read</div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-3 text-md h-40">
            <div className="font-poppins">{postInfo.title}</div>
            <div className="font-roboto text-sm">{truncateText(postInfo.summary || formattedContent)}</div>
          </div>

          <div className="flex justify-center my-0">
            <Line width="w-64" />
          </div>

          <div className="flex justify-between py-2 px-1">
            <div className="flex items-center justify-center gap-4">
              <div className="flex gap-2 justify-center items-center">
                <Eye className="w-4 h-4 self-center"/>
                <div>0</div>
              </div>
              <div className="flex gap-2">
                <MessageCircle className="w-4 h-4 self-center" />
                <div>{postInfo.comments?.length || 0}</div>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-2">
              <Heart className="w-4 h-4 self-center" />
              <div>{postInfo.likes?.length || 0}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
