"use client";
import React, { useState } from 'react';
import { useToast } from '../../components/FeedbackToast';

const SettingsPage = () => {
  const [theme, setTheme] = useState('light');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      showToast('Password cannot be empty.', 'error');
      return;
    }
    setPassword('');
    showToast('Password updated successfully!', 'success');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2">User Info</h2>
        <div className="mb-2">Name: <span className="font-medium">Admin</span></div>
        <div className="mb-2">Email: <span className="font-medium">admin@sample.com</span></div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <input type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-2 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Update Password</button>
        </form>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Theme</h2>
        <select value={theme} onChange={e => setTheme(e.target.value)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage; 