"use client";
import React, { useEffect, useState } from "react";
interface ClassItem {
  id: string;
  name: string;
  teacher: string;
  schedule: string;
  students: number;
  status: 'Active' | 'Completed' | 'Upcoming';
  room: string;
}
import ClassesLoading from "./loading";
import ClassModal from '../../components/ClassModal';

const initialClasses: ClassItem[] = [
  { id: "1", name: "Mathematics", teacher: "John Smith", schedule: "Mon 9:00-11:00", students: 25, status: 'Active', room: 'A101' },
  { id: "2", name: "English Literature", teacher: "Priya Patel", schedule: "Tue 10:00-12:00", students: 20, status: 'Upcoming', room: 'B202' },
  { id: "3", name: "Physics", teacher: "Chen Wang", schedule: "Wed 13:00-15:00", students: 18, status: 'Completed', room: 'C303' },
  { id: "4", name: "Music", teacher: "Alyina Allan", schedule: "Thu 14:00-16:00", students: 15, status: 'Active', room: 'D404' },
  { id: "5", name: "Art", teacher: "Maria Garcia", schedule: "Fri 11:00-13:00", students: 22, status: 'Upcoming', room: 'E505' },
  { id: "6", name: "Biology", teacher: "Sarah Lee", schedule: "Mon 15:00-17:00", students: 19, status: 'Active', room: 'F606' },
  { id: "7", name: "History", teacher: "David Kim", schedule: "Tue 8:00-10:00", students: 17, status: 'Completed', room: 'G707' },
  { id: "8", name: "Chemistry", teacher: "Michael Brown", schedule: "Wed 10:00-12:00", students: 21, status: 'Active', room: 'H808' },
  { id: "9", name: "Geography", teacher: "Emily Clark", schedule: "Thu 12:00-14:00", students: 16, status: 'Upcoming', room: 'I909' },
  { id: "10", name: "Computer Science", teacher: "Chen Wang", schedule: "Fri 14:00-16:00", students: 24, status: 'Active', room: 'J010' },
];

export default function ClassesPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classList, setClassList] = useState<ClassItem[]>(initialClasses);

  // Unique teacher list for dropdown
  const teacherOptions = Array.from(new Set(initialClasses.map(c => c.teacher))).map((name, i) => ({ id: String(i+1), name }));

  const classes = classList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  // Stats
  const total = classList.length;
  const active = classList.filter(c => c.status === 'Active').length;
  const upcoming = classList.filter(c => c.status === 'Upcoming').length;
  const completed = classList.filter(c => c.status === 'Completed').length;
  const avgStudents = Math.round(classList.reduce((sum, c) => sum + c.students, 0) / total);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleAddClass = (data: { name: string; description: string; teacherId: string }) => {
    const teacher = teacherOptions.find(t => t.id === data.teacherId)?.name || '';
    setClassList(prev => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        name: data.name,
        teacher,
        schedule: '',
        students: 0,
        status: 'Active',
        room: '',
      },
    ]);
  };

  if (loading) return <ClassesLoading />;

  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Classes</h1>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{total}</div>
            <div className="text-xs text-gray-500">Total Classes</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{active}</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{upcoming}</div>
            <div className="text-xs text-gray-500">Upcoming</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{completed}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center col-span-2 lg:col-span-1">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{avgStudents}</div>
            <div className="text-xs text-gray-500">Avg. Students</div>
          </div>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search classes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Class
          </button>
        </div>
        <ClassModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddClass}
          teachers={teacherOptions}
        />
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Class Name</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Teacher</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Schedule</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Room</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Students</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(classItem => (
                <tr key={classItem.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{classItem.name}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{classItem.teacher}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{classItem.schedule}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{classItem.room}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{classItem.students}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      classItem.status === 'Active' ? 'bg-green-100 text-green-700' :
                      classItem.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {classItem.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline mr-2">View</button>
                    <button className="text-gray-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 