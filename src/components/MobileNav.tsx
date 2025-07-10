"use client";
import React from 'react';
import { HomeIcon, UsersIcon, CalendarIcon, CreditCardIcon, CogIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const navLinks = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Teachers', href: '/teachers', icon: UsersIcon },
  { name: 'Schedule', href: '/schedule', icon: CalendarIcon },
  { name: 'Payments', href: '/payments', icon: CreditCardIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center h-14 md:hidden">
      {navLinks.map(link => (
        <Link key={link.name} href={link.href} className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition">
          <link.icon className="w-6 h-6 mb-1" />
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default MobileNav; 