"use client";
import React, { useEffect } from "react";
import { BellIcon, UserPlusIcon, CreditCardIcon, CalendarDaysIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import NotificationsLoading from   './loading'

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'teacher' | 'payment' | 'schedule' | 'system';
}

const initialNotifications: Notification[] = [
  { id: "1", title: "New Teacher Added", message: "Alyina Allan has been added to the system.", time: "2 minutes ago", read: false, type: 'teacher' },
  { id: "2", title: "Payment Completed", message: "Payment for John Smith has been processed.", time: "1 hour ago", read: false, type: 'payment' },
  { id: "3", title: "Schedule Updated", message: "Priya Patel's schedule has been modified.", time: "3 hours ago", read: true, type: 'schedule' },
  { id: "4", title: "System Maintenance", message: "Scheduled maintenance completed successfully.", time: "1 day ago", read: true, type: 'system' },
  { id: "5", title: "Teacher Profile Updated", message: "Profile for Michael Brown was updated.", time: "2 days ago", read: false, type: 'teacher' },
  { id: "6", title: "Payment Failed", message: "Payment for Sarah Lee failed. Please retry.", time: "2 days ago", read: false, type: 'payment' },
  { id: "7", title: "Class Rescheduled", message: "Class for Emily Clark has been rescheduled.", time: "3 days ago", read: true, type: 'schedule' },
  { id: "8", title: "Security Alert", message: "Unusual login detected from a new device.", time: "4 days ago", read: false, type: 'system' },
  { id: "9", title: "New Teacher Added", message: "David Kim has been added to the system.", time: "5 days ago", read: true, type: 'teacher' },
  { id: "10", title: "Payment Completed", message: "Payment for Priya Patel has been processed.", time: "6 days ago", read: true, type: 'payment' },
  { id: "11", title: "Schedule Updated", message: "John Smith's schedule has been modified.", time: "1 week ago", read: true, type: 'schedule' },
  { id: "12", title: "System Maintenance", message: "Scheduled maintenance upcoming this weekend.", time: "1 week ago", read: false, type: 'system' },
];

const typeIcon = {
  teacher: <UserPlusIcon className="w-6 h-6 text-blue-500" />,
  payment: <CreditCardIcon className="w-6 h-6 text-green-500" />,
  schedule: <CalendarDaysIcon className="w-6 h-6 text-purple-500" />,
  system: <WrenchScrewdriverIcon className="w-6 h-6 text-gray-500" />,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <NotificationsLoading />;

  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <BellIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold animate-pulse">{unreadCount}</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex-1">Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition disabled:bg-gray-300 disabled:text-gray-500"
            disabled={unreadCount === 0}
          >
            Mark all as read
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-400 py-12 col-span-full">No notifications</div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-5 rounded-2xl border shadow-sm transition-all duration-200 relative bg-white dark:bg-gray-900 border-l-4 ${n.read ? 'border-gray-200 dark:border-gray-700' : 'border-blue-500 bg-blue-50/60 dark:bg-blue-900/30 animate-[pulse_0.8s_2]'} hover:shadow-lg`}
              >
                <div className="flex-shrink-0 mt-1">{typeIcon[n.type]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${n.read ? 'text-gray-900 dark:text-white' : 'text-blue-700 dark:text-blue-300'}`}>{n.title}</span>
                    {!n.read && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-500 text-white font-semibold">New</span>}
                    <span className="ml-auto text-xs text-gray-400">{n.time}</span>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{n.message}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 