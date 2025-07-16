import { Eye, MessageCircle, Heart, Clock, Calendar } from "lucide-react";
import { Link } from '@tanstack/react-router';


function truncateText(text, maxLength = 244) {
    if (text === undefined) {
        return '';
    }
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function isWithinXDays(dateStr) {
    const now = new Date();
    const targetDate = new Date(dateStr);
    const diffInMs = now - targetDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays >= 0 && diffInDays <= 5;
}

export function Card({
    postName = 'Back to Fiction: What I am reading this year.',
    feature = false,
    postInfo = {},
    isNew = false,
    img = 'https://placehold.co/600x400?text=Blog',
    width = 'w-80 lg:w-100',
}) {

    console.log('summary:',postInfo)
    const getSummary = (content, maxLength = 160) => {
        if (typeof content !== 'string') return '';
        return content.length > maxLength
            ? content.slice(0, maxLength).trim() + '...'
            : content;
    };

    const formattedContent = getSummary(postInfo.content);
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
        <Link to="/blogs/$slug" params={{ slug: postInfo.slug }} prefetch="hover" className={`block ${width} p-4 sm:p-4 mx-auto`}>
            {/* Featured Badge */}
            {feature && (
                <div className="mb-2 sm:mb-4">
                    <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 text-xs font-bold tracking-wide text-white bg-black uppercase">
                        Featured Post
                    </span>
                </div>
            )}

            {/* Main Card */}
            <article className="group relative bg-white border hover:border-black transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video sm:aspect-video">
                    <img
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        src={postInfo.featuredImage || img}
                        alt={`${postInfo.title || postName} image`}
                    />
                    
                    {/* New Badge */}
                    {newStatus && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-bold tracking-wide text-white bg-black uppercase">
                                New
                            </span>
                        </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-6">
                    {/* Author Info */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <img 
                            src={postInfo.author?.avatar} 
                            alt="profile image" 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200" 
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs sm:text-sm text-black truncate">{postInfo.author?.name}</p>
                            <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-600">
                                <Calendar className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{formatDate(postInfo.createdAt)}</span>
                                <span className="hidden sm:inline">•</span>
                                <Clock className="w-3 h-3 flex-shrink-0 hidden sm:inline" />
                                <span className="hidden sm:inline">{estimateReadingTime(postInfo.content)} min read</span>
                            </div>
                        </div>
                    </div>

                    {/* Title and Summary */}
                    <div className="mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-2 line-clamp-2 group-hover:text-gray-800 transition-colors">
                            {postInfo.title || postName}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                            {truncateText(postInfo.summary || formattedContent, 140)}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 mb-3 sm:mb-4"></div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 sm:gap-6">
                            <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600 hover:text-black transition-colors">
                                <Eye className="w-4 h-4" />
                                <span className="text-xs sm:text-sm">0</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600 hover:text-black transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-xs sm:text-sm">{postInfo.comments?.length}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs sm:text-sm">{postInfo.likes?.length}</span>
                        </div>
                    </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-black transition-all duration-300 pointer-events-none"></div>
            </article>
        </Link>
    );
}