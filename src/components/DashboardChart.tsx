"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Teachers Added',
      data: [2, 3, 4, 2, 5, 3, 6],
      borderColor: 'rgba(37, 99, 235, 1)',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      pointBackgroundColor: 'rgba(37, 99, 235, 1)',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Payments Received',
      data: [100, 200, 150, 300, 250, 400, 350],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      pointBackgroundColor: 'rgba(16, 185, 129, 1)',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: { color: '#1e293b', font: { size: 14 } },
    },
    title: {
      display: true,
      text: 'Monthly Overview',
      color: '#1e293b',
      font: { size: 20, weight: 'bold' },
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

const DashboardChart = () => (
  <div className="w-full h-full">
    <Line data={data} options={options} className="w-full h-full" />
  </div>
);

export default DashboardChart; 