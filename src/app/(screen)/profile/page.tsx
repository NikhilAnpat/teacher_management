"use client";
import React, { useEffect, useState } from "react";
import { ShieldCheckIcon, KeyIcon, DevicePhoneMobileIcon, EnvelopeIcon, CheckCircleIcon, ExclamationTriangleIcon, ClockIcon, UserIcon, BriefcaseIcon, MapPinIcon, CalendarIcon, IdentificationIcon, PhoneIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import ProfileLoading from './loading'
interface Profile {
  name: string;
  email: string;
  role: string;
  phone: string;
  avatarUrl?: string;
  department: string;
  location: string;
  dateOfJoining: string;
  gender: string;
}

const initialProfile: Profile = {
  name: "Admin User",
  email: "admin@example.com",
  role: "Administrator",
  phone: "555-123-4567",
  avatarUrl: "",
  department: "IT",
  location: "New York, USA",
  dateOfJoining: "2021-04-15",
  gender: "Male",
};

const tabs = ["Profile", "Security", "Activity"];

const activityFeed = [
  { icon: CheckCircleIcon, title: "Profile Updated", desc: "You updated your profile information.", time: "2 hours ago" },
  { icon: KeyIcon, title: "Password Changed", desc: "You changed your account password.", time: "1 day ago" },
  { icon: ShieldCheckIcon, title: "2FA Enabled", desc: "Two-factor authentication was enabled.", time: "3 days ago" },
  { icon: DevicePhoneMobileIcon, title: "New Device Login", desc: "Logged in from Chrome on Windows 11.", time: "1 week ago" },
  { icon: EnvelopeIcon, title: "Recovery Email Set", desc: "Added a recovery email for your account.", time: "2 weeks ago" },
  { icon: ExclamationTriangleIcon, title: "Failed Login Attempt", desc: "There was a failed login attempt.", time: "3 weeks ago" },
  { icon: ClockIcon, title: "Viewed Reports", desc: "You viewed analytics reports.", time: "1 month ago" },
];

const profileFields = [
  { label: "Name", valueKey: "name", icon: UserIcon },
  { label: "Email", valueKey: "email", icon: AtSymbolIcon },
  { label: "Role", valueKey: "role", icon: IdentificationIcon },
  { label: "Phone", valueKey: "phone", icon: PhoneIcon },
  { label: "Department", valueKey: "department", icon: BriefcaseIcon },
  { label: "Location", valueKey: "location", icon: MapPinIcon },
  { label: "Date of Joining", valueKey: "dateOfJoining", icon: CalendarIcon },
  { label: "Gender", valueKey: "gender", icon: UserIcon },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initialProfile);
  const [activeTab, setActiveTab] = useState("Profile");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(form);
    setEditing(false);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <ProfileLoading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950 py-10 px-2">
      {/* Top Profile Section */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-8 mb-10">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-blue-500 shadow-lg">
              {profile.name[0]}
            </div>
          )}
        </div>
        {/* Name, Role, Edit */}
        <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between w-full">
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{profile.name}</div>
            <div className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">{profile.role}</div>
          </div>
          <button
            className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition self-start md:self-end"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex gap-2">
          {tabs.map(tab => (
            <span
              key={tab}
              className={`px-5 py-2 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer 
                ${activeTab === tab ? "border-b-2 border-b-blue-600 text-blue-700 dark:text-blue-400" : "border-b-2 border-b-transparent text-gray-500 dark:text-gray-300 hover:text-blue-600"}`}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? "page" : undefined}
            >
              {tab}
            </span>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8">
        {activeTab === "Profile" && (
          <div>
            {!editing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {profileFields.map(field => {
                  const Icon = field.icon;
                  return (
                    <div key={field.label} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-5 shadow hover:shadow-lg transition group">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{field.label}</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{profile[field.valueKey as keyof Profile]}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <form onSubmit={handleSave} className="w-full flex flex-col gap-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
                      required
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Role</label>
                    <input
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Department</label>
                    <input
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location</label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date of Joining</label>
                    <input
                      name="dateOfJoining"
                      value={form.dateOfJoining}
                      onChange={handleChange}
                      type="date"
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Gender</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save</button>
                  <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}
        {activeTab === "Security" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Password */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-3 mb-2">
                <KeyIcon className="w-6 h-6 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Password</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Updated</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Last changed: 2 months ago</div>
              <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-max">Change</button>
            </div>
            {/* 2FA */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Enabled</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Protect your account with 2FA.</div>
              <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-max">Manage</button>
            </div>
            {/* Recovery Email */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-3 mb-2">
                <EnvelopeIcon className="w-6 h-6 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Recovery Email</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Set</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">admin.recovery@example.com</div>
              <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-max">Edit</button>
            </div>
            {/* Login Devices */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-3 mb-2">
                <DevicePhoneMobileIcon className="w-6 h-6 text-blue-500" />
                <span className="font-semibold text-gray-900 dark:text-white">Login Devices</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">2 Devices</span>
              </div>
              <ul className="text-gray-600 dark:text-gray-300 text-sm list-disc pl-5">
                <li>Windows 11 - Chrome (Active)</li>
                <li>iPhone 14 - Safari (Last week)</li>
              </ul>
              <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-max">View All</button>
            </div>
          </div>
        )}
        {activeTab === "Activity" && (
          <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {activityFeed.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                  <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 