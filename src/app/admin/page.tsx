import React from 'react';
import DashboardChart from '../../components/DashboardChart';
import { UserGroupIcon, CalendarDaysIcon, CurrencyDollarIcon, UsersIcon, MegaphoneIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const stats = [
  { label: 'Total Teachers', value: 24, icon: UserGroupIcon, color: 'bg-blue-100 text-blue-700' },
  { label: 'Upcoming Classes', value: 8, icon: CalendarDaysIcon, color: 'bg-green-100 text-green-700' },
  { label: 'Pending Payments', value: 5, icon: CurrencyDollarIcon, color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Active Groups', value: 6, icon: UsersIcon, color: 'bg-purple-100 text-purple-700' },
];

const recentActivity = [
  { type: 'Added', who: 'Priya Patel', when: '2 hours ago', icon: UserGroupIcon, color: 'bg-blue-500' },
  { type: 'Payment', who: 'John Smith', when: 'Today', icon: CurrencyDollarIcon, color: 'bg-yellow-500' },
  { type: 'Class', who: 'Alyina Allan', when: 'Yesterday', icon: CalendarDaysIcon, color: 'bg-green-500' },
];

const quickLinks = [
  { label: 'Manage Teachers', href: '/teachers', icon: UserGroupIcon },
  { label: 'View Schedule', href: '/schedule', icon: CalendarDaysIcon },
  { label: 'Payments', href: '/payments', icon: CurrencyDollarIcon },
  { label: 'Settings', href: '/settings', icon: UsersIcon },
];

const AdminPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(stat => (
          <div key={stat.label} className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className={`p-3 rounded-full ${stat.color} text-xl`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <DashboardChart />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MegaphoneIcon className="w-5 h-5 text-blue-500" /> Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${item.color}`}><item.icon className="w-5 h-5 text-white" /></span>
                <span className="font-medium text-gray-900 dark:text-white">{item.type}</span>
                <span className="text-gray-600 dark:text-gray-300">{item.who}</span>
                <span className="ml-auto text-xs text-gray-400">{item.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-3">
            {quickLinks.map(link => (
              <li key={link.label}>
                <a href={link.href} className="flex items-center gap-3 text-blue-700 dark:text-blue-400 hover:underline font-medium">
                  <link.icon className="w-5 h-5" />
                  {link.label}
                  <ArrowRightIcon className="w-4 h-4 ml-auto" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><MegaphoneIcon className="w-5 h-5 text-blue-500" /> Announcements</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Welcome to the new Teacher Management Dashboard! Here you can manage teachers, schedules, and payments with ease.</p>
            <p className="text-gray-700 dark:text-gray-300">Check back here for important updates and news.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 