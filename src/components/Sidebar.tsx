"use client";
import React from 'react';
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  CreditCardIcon,
  CogIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  ChartBarIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Teachers', href: '/teachers', icon: UsersIcon },
  { name: 'Students', href: '/students', icon: AcademicCapIcon },
  { name: 'Classes', href: '/classes', icon: ClipboardDocumentListIcon },
  { name: 'Schedule', href: '/schedule', icon: CalendarIcon },
  { name: 'Payments', href: '/payments', icon: CreditCardIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname();
  return (
    <aside
      className={`bg-white dark:bg-gray-900 h-screen fixed top-0 left-0 z-30 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col shadow-lg`}
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center justify-between h-16 px-4">
        <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">{!collapsed && 'TeacherMS'}</span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRightIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
      <nav className="flex-1 py-4 space-y-2" aria-label="Main navigation">
        {navLinks.map(link => {
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              aria-label={link.name}
              className={`flex items-center px-4 py-2 rounded transition font-medium outline-none gap-3
                ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <link.icon className={`w-6 h-6 ${isActive ? 'text-blue-600 dark:text-blue-300' : 'text-gray-400 dark:text-gray-500'}`} />
              {!collapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 flex items-center gap-2">
        <UserCircleIcon className="w-7 h-7 text-gray-500 dark:text-gray-400" />
        {!collapsed && <span className="text-gray-700 dark:text-gray-200">Admin</span>}
        <button
          className="ml-auto p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Logout"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 