
import React, { useState } from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="bg-white mb-4 md:rounded-2xl border-b md:border border-gray-100 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:px-4">
        <div className="flex items-center gap-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-10 h-10 rounded-full border border-gray-100 object-cover"
          />
          <div>
            <h4 className="text-sm font-bold text-gray-900">{post.author.name}</h4>
            <p className="text-[11px] text-gray-400">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-xs font-semibold px-4 py-1.5 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-colors">
          关注
        </button>
      </div>

      {/* Image Gallery (Simplified for this view) */}
      <div className="relative group">
        <img 
          src={post.images[0]} 
          alt={post.title} 
          className="w-full h-auto max-h-[600px] object-cover"
        />
        {post.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full text-[10px] text-white font-medium">
            1/{post.images.length}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 px-4 py-3">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`flex items-center gap-1.5 transition-all transform active:scale-125 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-xs font-medium">{post.stats.likes + (isLiked ? 1 : 0)}</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs font-medium">{post.stats.comments}</span>
        </button>

        <button className="flex items-center gap-1.5 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="text-xs font-medium">{post.stats.shares}</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <h3 className="text-[15px] font-bold text-gray-900 mb-1">{post.title}</h3>
        <div className="relative">
          <p className={`text-[14px] text-gray-700 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {post.content}
          </p>
          {!isExpanded && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-blue-600 text-xs font-medium mt-1"
            >
              展开
            </button>
          )}
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map(tag => (
            <span key={tag} className="text-[13px] text-blue-600 hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
