"use client";
import React from 'react';
import { HomeIcon, UsersIcon, CalendarIcon, CreditCardIcon, CogIcon, UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const navLinks = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Teachers', href: '/teachers', icon: UsersIcon },
  { name: 'Schedule', href: '/schedule', icon: CalendarIcon },
  { name: 'Payments', href: '/payments', icon: CreditCardIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  return (
    <aside className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen fixed top-0 left-0 z-30 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">{!collapsed && 'TeacherMS'}</span>
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5" /></svg>
        </button>
      </div>
      <nav className="flex-1 py-4 space-y-2">
        {navLinks.map(link => (
          <Link key={link.name} href={link.href} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition">
            <link.icon className="w-6 h-6 mr-3" />
            {!collapsed && <span>{link.name}</span>}
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <UserCircleIcon className="w-7 h-7 text-gray-500 dark:text-gray-400" />
        {!collapsed && <span className="text-gray-700 dark:text-gray-200">Admin</span>}
        <button className="ml-auto p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeftOnRectangleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 