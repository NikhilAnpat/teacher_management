"use client";
import React, { useEffect, useState } from "react";
import { UserIcon, CogIcon, BellIcon, ShieldCheckIcon, MoonIcon, SunIcon, GlobeAltIcon, DevicePhoneMobileIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import SettingsLoading from './loading'
export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [timeZone, setTimeZone] = useState("UTC");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <SettingsLoading />;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full px-0">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2 pl-4 pt-8">
          <CogIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" /> Settings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4 pb-8">
          {/* Account Section */}
          <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 col-span-1 xl:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <UserIcon className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                <input className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" value="Admin User" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
                <input className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" value="admin@example.com" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Change Password</label>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full md:w-auto">Change Password</button>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 col-span-1 xl:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <CogIcon className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preferences</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded transition border border-gray-300 dark:border-gray-700 ${theme === "light" ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <SunIcon className="w-5 h-5 text-yellow-500" /> : <MoonIcon className="w-5 h-5 text-blue-500" />}
                  {theme === "light" ? "Light" : "Dark"}
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Language</label>
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5 text-blue-500" />
                  <select
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
              {/* Time Zone */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Time Zone</label>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 h-5"><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /></svg></span>
                  <select
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                    value={timeZone}
                    onChange={e => setTimeZone(e.target.value)}
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="Asia/Tokyo">Asia/Tokyo</option>
                  </select>
                </div>
              </div>
              {/* Date Format */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date Format</label>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-5 h-5"><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18" /></svg></span>
                  <select
                    className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                    value={dateFormat}
                    onChange={e => setDateFormat(e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 col-span-1 xl:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <BellIcon className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              {/* Email Notification Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:shadow transition">
                <div>
                  <div className="flex items-center gap-2">
                    <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-900 dark:text-white font-medium">Email Notifications</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Receive important updates and alerts via email.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer group">
                  <input type="checkbox" className="sr-only peer" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                  <div className="w-12 h-7 bg-gray-200 dark:bg-gray-700 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors duration-300 peer-checked:bg-blue-600 group-hover:ring-2 group-hover:ring-blue-300"></div>
                  <div className="absolute left-1 top-1 w-5 h-5 flex items-center justify-center bg-white border border-gray-300 dark:border-gray-700 rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-5">
                    {emailNotif ? (
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>
                </label>
              </div>
              {/* SMS Notification Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:shadow transition">
                <div>
                  <div className="flex items-center gap-2">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-900 dark:text-white font-medium">SMS Notifications</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Get SMS alerts for urgent account activity.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer group">
                  <input type="checkbox" className="sr-only peer" checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} />
                  <div className="w-12 h-7 bg-gray-200 dark:bg-gray-700 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors duration-300 peer-checked:bg-blue-600 group-hover:ring-2 group-hover:ring-blue-300"></div>
                  <div className="absolute left-1 top-1 w-5 h-5 flex items-center justify-center bg-white border border-gray-300 dark:border-gray-700 rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-5">
                    {smsNotif ? (
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>
                </label>
              </div>
              {/* Push Notification Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:shadow transition">
                <div>
                  <div className="flex items-center gap-2">
                    <BellIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-900 dark:text-white font-medium">Push Notifications</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enable real-time notifications in your browser or app.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer group">
                  <input type="checkbox" className="sr-only peer" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
                  <div className="w-12 h-7 bg-gray-200 dark:bg-gray-700 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors duration-300 peer-checked:bg-blue-600 group-hover:ring-2 group-hover:ring-blue-300"></div>
                  <div className="absolute left-1 top-1 w-5 h-5 flex items-center justify-center bg-white border border-gray-300 dark:border-gray-700 rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-5">
                    {pushNotif ? (
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 col-span-1 xl:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Recovery Email</span>
                <span className="text-gray-600 dark:text-gray-300">admin.recovery@example.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Login Devices</span>
                <span className="text-gray-600 dark:text-gray-300">2 Devices</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 