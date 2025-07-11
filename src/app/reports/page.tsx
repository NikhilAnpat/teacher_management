"use client";
import React from "react";
import { Line, Pie, Bar } from 'react-chartjs-2';
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
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, PointElement, LineElement);


const pieData = {
  labels: ['Math', 'Science', 'Music', 'English', 'Art'],
  datasets: [
    {
      label: 'Classes',
      data: [8, 6, 4, 5, 3],
      backgroundColor: [
        'rgba(37, 99, 235, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(168, 85, 247, 0.7)',
        'rgba(251, 191, 36, 0.7)',
        'rgba(239, 68, 68, 0.7)',
      ],
      borderColor: [
        'rgba(37, 99, 235, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(251, 191, 36, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Payments',
      data: [1200, 1500, 1100, 1800, 1600, 2000, 1750],
      backgroundColor: 'rgba(37, 99, 235, 0.7)',
      borderRadius: 8,
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 13 } } },
    y: { grid: { color: '#e5e7eb' }, ticks: { color: '#64748b', font: { size: 13 } } },
  },
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' as const, labels: { color: '#1e293b', font: { size: 14 } } },
    title: { display: false },
    tooltip: { enabled: true },
  },
};

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Student Growth',
      data: [30, 45, 60, 80, 100, 120, 140],
      borderColor: 'rgba(37, 99, 235, 1)',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      pointBackgroundColor: 'rgba(37, 99, 235, 1)',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 8,
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
      labels: { color: '#1e293b', font: { size: 14 } },
    },
    title: {
      display: true,
      text: 'Student Growth Over Time',
      color: '#1e293b',
      font: { size: 20, weight: 'bold' as const },
      padding: { top: 10, bottom: 30 },
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: '#1e293b',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#64748b', font: { size: 13 } },
    },
    y: {
      grid: { color: '#e5e7eb' },
      ticks: { color: '#64748b', font: { size: 13 } },
    },
  },
};

const statCards = [
  { label: 'Total Students', value: 120, color: 'bg-blue-100 text-blue-700', icon: '👨‍🎓' },
  { label: 'Active Classes', value: 12, color: 'bg-green-100 text-green-700', icon: '📚' },
  { label: 'Payments This Month', value: '$8,950', color: 'bg-yellow-100 text-yellow-700', icon: '💸' },
  { label: 'Teachers', value: 24, color: 'bg-purple-100 text-purple-700', icon: '🧑‍🏫' },
  { label: 'Avg. Attendance', value: '92%', color: 'bg-pink-100 text-pink-700', icon: '📈' },
  { label: 'Upcoming Events', value: 3, color: 'bg-indigo-100 text-indigo-700', icon: '📅' },
];

export default function ReportsPage() {
  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Reports & Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
            <div className="w-full h-64">
              <div className="w-full h-full" style={{ minHeight: 220 }}>
                <Line data={lineData} options={lineOptions} className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Class Distribution</h2>
            <div className="w-full h-64 flex items-center justify-center">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Payments Overview</h2>
            <div className="w-full h-64 flex items-center justify-center">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statCards.map(card => (
            <div key={card.label} className={`rounded-xl shadow bg-white dark:bg-gray-900 p-6 flex flex-col items-center ${card.color}`}>
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm text-center">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 