
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import PostCard from './components/PostCard';
import { Post, Category } from './types';
import { fetchTrendingPosts } from './services/geminiService';

const CATEGORIES: Category[] = [
  { id: '推荐', label: '推荐' },
  { id: '关注', label: '关注' },
  { id: '视频', label: '视频' },
  { id: '穿搭', label: '穿搭' },
  { id: '美妆', label: '美妆' },
  { id: '美食', label: '美食' },
  { id: '运动', label: '运动' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('推荐');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = useCallback(async (category: string) => {
    setLoading(true);
    const data = await fetchTrendingPosts(category);
    setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="mt-16">
        <Tabs 
          categories={CATEGORIES} 
          activeId={activeTab} 
          onChange={setActiveTab} 
        />
        
        <div className="max-w-[640px] mx-auto px-0 md:px-4 py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-3 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
              <p className="text-gray-400 text-sm font-medium">正在为你寻找好物...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              
              {/* Load More Trigger Placeholder */}
              <div className="py-8 text-center">
                <p className="text-gray-400 text-xs">没有更多内容了</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 h-16 flex items-center justify-around md:hidden px-4">
        <button className="text-red-500 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z" />
          </svg>
          <span className="text-[10px] mt-1 font-bold">首页</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px] mt-1">发现</span>
        </button>
        <div className="bg-red-500 w-12 h-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <button className="text-gray-400 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-[10px] mt-1">消息</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full border border-gray-200 overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
          </div>
          <span className="text-[10px] mt-1">我</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
