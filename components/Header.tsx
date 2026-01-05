
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 h-16 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold italic text-lg">
          R
        </div>
        <span className="hidden md:block text-xl font-bold tracking-tight text-red-500">RedStyle</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索你感兴趣的内容" 
            className="w-full bg-gray-100 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          发布
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white cursor-pointer overflow-hidden shadow-sm">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;
