"use client";
import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const user = {
  name: 'Admin',
  avatar: '', // Empty string means no avatar
};

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: 'New Teacher Added',
    message: 'Alyina Allan has been added to the system',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'Payment Completed',
    message: 'Payment for John Smith has been processed',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'Schedule Updated',
    message: 'Priya Patel\'s schedule has been modified',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    title: 'System Maintenance',
    message: 'Scheduled maintenance completed successfully',
    time: '1 day ago',
    read: true,
  },
];

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const router = useRouter();

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-900 dark:text-white">Teacher Management</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onMouseEnter={() => setShowNotifications(true)}
            onMouseLeave={() => setShowNotifications(false)}
          >
            <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          {/* Notification Popup */}
          {showNotifications && (
            <div 
              className="absolute right-0 top-11 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
              onMouseEnter={() => setShowNotifications(true)}
              onMouseLeave={() => setShowNotifications(false)}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">{unreadCount} unread</span>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => router.push('/notifications')}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
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