"use client";
import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

const user = {
  name: 'Admin',
  avatar: '', // Empty string means no avatar
};

const Topbar = () => {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-900 dark:text-white">Teacher Management</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-200 font-medium">{user.name}</span>
          {user.avatar ? (
            <img src={user.avatar} alt="User avatar" className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border border-gray-300 dark:border-gray-700">
              {user.name[0]}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar; 