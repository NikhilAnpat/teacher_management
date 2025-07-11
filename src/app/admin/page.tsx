"use client";
import React, { useEffect, useState } from 'react';
import {
  UserGroupIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  UsersIcon,
  MegaphoneIcon,
  ArrowRightIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CogIcon,
  BellIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement,
} from 'chart.js';
import AdminLoading from './loading';
import Link from "next/link";
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, PointElement, LineElement);

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Student Growth',
      data: [30, 45, 60, 80, 100, 120, 140],
      borderColor: 'rgba(37, 99, 235, 1)',
      backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(37,99,235,0.25)');
        gradient.addColorStop(1, 'rgba(37,99,235,0.02)');
        return gradient;
      },
      pointBackgroundColor: 'rgba(37, 99, 235, 1)',
      pointBorderColor: '#fff',
      pointRadius: 7,
      pointHoverRadius: 10,
      pointStyle: 'circle',
      borderWidth: 3,
      tension: 0.4,
      fill: true,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: { color: '#2563eb', font: { size: 15, weight: 'bold' as const } },
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: '#2563eb',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      caretSize: 8,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#64748b', font: { size: 14, weight: 'bold' as const } },
      title: { display: true, text: 'Month', color: '#2563eb', font: { size: 15, weight: 'bold' as const } },
    },
    y: {
      grid: { color: '#e5e7eb', borderDash: [4, 4] },
      ticks: { color: '#64748b', font: { size: 14, weight: 'bold' as const } },
      title: { display: true, text: 'Students', color: '#2563eb', font: { size: 15, weight: 'bold' as const } },
    },
  },
};

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Payments',
      data: [1200, 1500, 1100, 1800, 1600, 2000, 1750],
      backgroundColor: 'rgba(16, 185, 129, 0.7)',
      borderRadius: 8,
      maxBarThickness: 32,
    },
  ],
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: '#10b981',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      caretSize: 8,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#64748b', font: { size: 14, weight: 'bold' as const } },
      title: { display: true, text: 'Month', color: '#10b981', font: { size: 15, weight: 'bold' as const } },
    },
    y: {
      grid: { color: '#e5e7eb', borderDash: [4, 4] },
      ticks: { color: '#64748b', font: { size: 14, weight: 'bold' as const } },
      title: { display: true, text: 'Payments ($)', color: '#10b981', font: { size: 15, weight: 'bold' as const } },
    },
  },
};

const adminStats = [
  { label: 'Total Teachers', value: 24, color: 'bg-blue-100 text-blue-700', icon: <UserGroupIcon className="w-6 h-6" />, href: '/teachers' },
  { label: 'Total Students', value: 120, color: 'bg-green-100 text-green-700', icon: <UsersIcon className="w-6 h-6" />, href: '/students' },
  { label: 'Total Classes', value: 32, color: 'bg-purple-100 text-purple-700', icon: <AcademicCapIcon className="w-6 h-6" />, href: '/classes' },
  { label: 'Attendance Rate', value: '96%', color: 'bg-pink-100 text-pink-700', icon: <CheckCircleIcon className="w-6 h-6" /> },
  { label: 'Avg. Teacher Rating', value: '4.8', color: 'bg-yellow-100 text-yellow-700', icon: <StarIcon className="w-6 h-6" /> },
  { label: 'New Registrations', value: 14, color: 'bg-indigo-100 text-indigo-700', icon: <PlusIcon className="w-6 h-6" /> },
];

const recentActivity = [
  {
    type: 'Teacher Added',
    who: 'Priya Patel',
    when: '2 hours ago',
    icon: PlusIcon,
    color: 'bg-green-500',
    description: 'New teacher joined the system',
    status: 'completed'
  },
  {
    type: 'Payment Completed',
    who: 'John Smith',
    when: 'Today',
    icon: CheckCircleIcon,
    color: 'bg-blue-500',
    description: 'Monthly payment processed',
    status: 'completed'
  },
  {
    type: 'Class Scheduled',
    who: 'Alyina Allan',
    when: 'Yesterday',
    icon: CalendarDaysIcon,
    color: 'bg-purple-500',
    description: 'Music class scheduled for Monday',
    status: 'scheduled'
  },
  {
    type: 'Payment Pending',
    who: 'Chen Wang',
    when: '2 days ago',
    icon: ExclamationTriangleIcon,
    color: 'bg-yellow-500',
    description: 'Payment overdue - requires attention',
    status: 'pending'
  },
  {
    type: 'Qualification Updated',
    who: 'Maria Garcia',
    when: '3 days ago',
    icon: AcademicCapIcon,
    color: 'bg-indigo-500',
    description: 'Added new teaching certification',
    status: 'completed'
  },
  {
    type: 'Schedule Conflict',
    who: 'David Kim',
    when: '4 days ago',
    icon: ClockIcon,
    color: 'bg-red-500',
    description: 'Resolved scheduling conflict',
    status: 'resolved'
  },
  {
    type: 'Document Uploaded',
    who: 'Sarah Johnson',
    when: '1 week ago',
    icon: DocumentTextIcon,
    color: 'bg-gray-500',
    description: 'Updated teaching materials',
    status: 'completed'
  },
  {
    type: 'System Maintenance',
    who: 'Admin',
    when: '1 week ago',
    icon: CogIcon,
    color: 'bg-gray-600',
    description: 'Database backup completed',
    status: 'completed'
  }
];

const quickLinks = [
  { label: 'Manage Teachers', href: '/teachers', icon: UserGroupIcon, description: 'Add, edit, and manage teacher profiles' },
  { label: 'Add Teacher', href: '/teachers?add=true', icon: PlusIcon, description: 'Quickly add a new teacher' },
  { label: 'Manage Students', href: '/students', icon: UsersIcon, description: 'View and manage student records' },
  { label: 'Add Student', href: '/students?add=true', icon: PlusIcon, description: 'Quickly add a new student' },
  { label: 'Create Class', href: '/classes?add=true', icon: AcademicCapIcon, description: 'Schedule and create a new class' },
  { label: 'View Classes', href: '/classes', icon: CalendarDaysIcon, description: 'Browse and manage all classes' },
  { label: 'View Reports', href: '/reports', icon: DocumentTextIcon, description: 'Analytics and performance reports' },
  { label: 'Manage Payments', href: '/payments', icon: CurrencyDollarIcon, description: 'Process and track payments' },
  { label: 'Send Notification', href: '/notifications?send=true', icon: BellIcon, description: 'Send a message or alert to users' },
  { label: 'Settings', href: '/settings', icon: CogIcon, description: 'Configure system settings' },
];

const announcements = [
  {
    id: 1,
    title: 'New Dashboard Features',
    content: 'We\'ve added new analytics and reporting features to help you better manage your teaching staff.',
    date: '2 days ago',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Payment System Update',
    content: 'The payment processing system has been updated with improved security features.',
    date: '1 week ago',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Holiday Schedule',
    content: 'Please note that the office will be closed during the upcoming holiday season.',
    date: '2 weeks ago',
    priority: 'low'
  }
];

export default function ClassesPage() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <AdminLoading />;

  return (
      <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {adminStats.map((stat) =>
              stat.href ? (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="block"
                  tabIndex={0}
                  aria-label={
                    `Navigate to ${stat.label} page`
                  }
                >
                  <div className={`rounded-xl bg-white dark:bg-gray-900 shadow p-2 flex flex-col items-center ${stat.color}`}>
                    <div className="mb-2">{stat.icon}</div>
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-500 text-center">{stat.label}</div>
                  </div>
                </Link>
              ) : (
                <div key={stat.label} className={`rounded-xl bg-white dark:bg-gray-900 shadow p-2 flex flex-col items-center ${stat.color}`}>
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-500 text-center">{stat.label}</div>
                </div>
              )
            )}
          </div>
          {/* Main Widgets/Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
            {/* Chart 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-0 flex flex-col items-center min-h-[340px]">
              <div className="w-full border-b border-gray-100 dark:border-gray-800 px-6 pt-6 pb-2 flex flex-col gap-1">
                <div className="text-lg font-bold text-gray-900 dark:text-white">Student Growth</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Monthly new student registrations</div>
              </div>
              <div className="w-full h-64 flex items-center justify-center px-2 pb-4 pt-2">
                <Line data={lineData} options={lineOptions} className="w-full h-full" />
              </div>
            </div>
            {/* Chart 2: Bar chart for Monthly Payments */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-0 flex flex-col items-center min-h-[340px]">
              <div className="w-full border-b border-gray-100 dark:border-gray-800 px-6 pt-6 pb-2 flex flex-col gap-1">
                <div className="text-lg font-bold text-gray-900 dark:text-white">Monthly Payments</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Payments received each month</div>
              </div>
              <div className="w-full h-64 flex items-center justify-center px-2 pb-4 pt-2">
                <Bar data={barData} options={barOptions} className="w-full h-full" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col min-h-[300px]">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <BellIcon className="w-5 h-5 text-blue-500" /> Recent Activity
              </h2>
              <div className="space-y-4 overflow-y-auto max-h-64">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${item.color} flex-shrink-0`}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">{item.type}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-700' :
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              item.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                item.status === 'resolved' ? 'bg-gray-100 text-gray-700' :
                                  'bg-gray-100 text-gray-700'
                          }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.who}</span>
                        <span className="text-xs text-gray-400">{item.when}</span>
                      </div>
            </div>
          </div>
        ))}
      </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium">
                  View All Activities
                </button>
        </div>
        </div>
      </div>
          {/* Bottom Section: Quick Links & Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Links */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
              <div className="space-y-4 max-h-[470px] overflow-y-auto pr-2">
            {quickLinks.map(link => (
                  <a key={link.label} href={link.href} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                      <link.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {link.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{link.description}</div>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            {/* Announcements */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <MegaphoneIcon className="w-5 h-5 text-blue-500" /> Announcements
              </h2>
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{announcement.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${announcement.priority === 'high' ? 'bg-red-100 text-red-700' :
                          announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                        }`}>
                        {announcement.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{announcement.content}</p>
                    <span className="text-xs text-gray-400">{announcement.date}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium">
                  View All Announcements
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};