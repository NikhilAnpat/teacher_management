"use client";
import React, { useState } from 'react';
import TeacherCard from '../../components/TeacherCard';
import TeacherModal from '../../components/AddTeacherModal';
import TeacherViewModal from '../../components/TeacherViewModal';
import { Teacher } from '../../types';
import { useToast } from '../../components/FeedbackToast';

const initialTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Alyina Allan',
    email: 'alyina.allan@sample.com',
    phone: '555-000-0007',
    address: '123 Main St, New York',
    hourRate: 45,
    qualifications: [
      { name: 'Music', date: '2018' },
      { name: 'Vocal Competency', date: '2019' },
    ],
    groupQualifications: [{ name: 'Kater Choir' }],
    schedule: [
      { day: 'Monday', startTime: '9:00', endTime: '11:00', type: 'Class' },
      { day: 'Wednesday', startTime: '14:00', endTime: '16:00', type: 'Class' },
    ],
    status: 'Active',
    joinDate: '2023-01-10',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@sample.com',
    phone: '555-000-0008',
    address: '456 Park Ave, New York',
    hourRate: 50,
    qualifications: [
      { name: 'Math', date: '2017' },
      { name: 'Physics', date: '2016' },
    ],
    groupQualifications: [{ name: 'Math Club' }],
    schedule: [
      { day: 'Tuesday', startTime: '10:00', endTime: '12:00', type: 'Class' },
      { day: 'Thursday', startTime: '13:00', endTime: '15:00', type: 'Class' },
    ],
    status: 'Active',
    joinDate: '2022-09-15',
  },
  {
    id: '3',
    name: 'Priya Patel',
    email: 'priya.patel@sample.com',
    phone: '555-000-0009',
    address: '789 Broadway, New York',
    hourRate: 40,
    qualifications: [
      { name: 'English', date: '2015' },
      { name: 'Literature', date: '2014' },
    ],
    groupQualifications: [{ name: 'Book Club' }],
    schedule: [
      { day: 'Friday', startTime: '9:00', endTime: '11:00', type: 'Class' },
      { day: 'Saturday', startTime: '10:00', endTime: '12:00', type: 'Class' },
    ],
    status: 'Inactive',
    joinDate: '2021-06-20',
  },
  {
    id: '4',
    name: 'Chen Wang',
    email: 'chen.wang@sample.com',
    phone: '555-000-0010',
    address: '321 5th Ave, New York',
    hourRate: 55,
    qualifications: [
      { name: 'Science', date: '2013' },
      { name: 'Biology', date: '2012' },
    ],
    groupQualifications: [{ name: 'Science Club' }],
    schedule: [
      { day: 'Monday', startTime: '13:00', endTime: '15:00', type: 'Class' },
      { day: 'Thursday', startTime: '9:00', endTime: '11:00', type: 'Class' },
    ],
    status: 'Active',
    joinDate: '2024-06-01',
  },
  {
    id: '5',
    name: 'Maria Garcia',
    email: 'maria.garcia@sample.com',
    phone: '555-000-0011',
    address: '654 Elm St, New York',
    hourRate: 48,
    qualifications: [
      { name: 'Art', date: '2019' },
      { name: 'Design', date: '2020' },
    ],
    groupQualifications: [{ name: 'Art Club' }],
    schedule: [
      { day: 'Wednesday', startTime: '11:00', endTime: '13:00', type: 'Class' },
    ],
    status: 'Active',
    joinDate: '2023-11-12',
  },
  {
    id: '6',
    name: 'Sarah Lee',
    email: 'sarah.lee@sample.com',
    phone: '555-000-0012',
    address: '987 Oak St, New York',
    hourRate: 52,
    qualifications: [
      { name: 'Biology', date: '2018' },
      { name: 'Chemistry', date: '2017' },
    ],
    groupQualifications: [{ name: 'Science Club' }],
    schedule: [
      { day: 'Friday', startTime: '10:00', endTime: '12:00', type: 'Class' },
    ],
    status: 'Active',
    joinDate: '2022-03-05',
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david.kim@sample.com',
    phone: '555-000-0013',
    address: '222 Pine St, New York',
    hourRate: 47,
    qualifications: [
      { name: 'History', date: '2016' },
      { name: 'Geography', date: '2015' },
    ],
    groupQualifications: [{ name: 'History Club' }],
    schedule: [
      { day: 'Monday', startTime: '8:00', endTime: '10:00', type: 'Class' },
    ],
    status: 'Inactive',
    joinDate: '2020-09-10',
  },
  {
    id: '8',
    name: 'Emily Clark',
    email: 'emily.clark@sample.com',
    phone: '555-000-0014',
    address: '333 Maple St, New York',
    hourRate: 53,
    qualifications: [
      { name: 'Geography', date: '2017' },
      { name: 'Environmental Science', date: '2018' },
    ],
    groupQualifications: [{ name: 'Eco Club' }],
    schedule: [
      { day: 'Thursday', startTime: '12:00', endTime: '14:00', type: 'Class' },
    ],
    status: 'Active',
    joinDate: '2023-04-18',
  },
];

// Stats
const total = initialTeachers.length;
const active = initialTeachers.filter(t => t.status === 'Active').length;
const inactive = initialTeachers.filter(t => t.status === 'Inactive').length;
const avgRate = (initialTeachers.reduce((sum, t) => sum + t.hourRate, 0) / total).toFixed(2);
const newThisMonth = initialTeachers.filter(t => t.joinDate >= '2024-06-01').length;
const allQuals = initialTeachers.flatMap(t => t.qualifications.map(q => q.name));
const mostCommonQual = allQuals.sort((a, b) => allQuals.filter(v => v === a).length - allQuals.filter(v => v === b).length).pop();

const TeachersPage = () => {
  const [search, setSearch] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const { showToast } = useToast();

  const filtered = teachers.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddTeacher = (teacher: any) => {
    if (!teacher.name || !teacher.email || !teacher.phone || !teacher.address || !teacher.hourRate) {
      showToast('All fields are required.', 'error');
      return;
    }
    setTeachers([
      ...teachers,
      {
        id: (teachers.length + 1).toString(),
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        address: teacher.address,
        hourRate: teacher.hourRate,
        qualifications: teacher.qualifications.map((q: string) => ({ name: q, date: new Date().getFullYear().toString() })),
        groupQualifications: teacher.groupQualifications.map((gq: string) => ({ name: gq })),
        schedule: [],
        status: 'Active', // Default status for new teachers
        joinDate: new Date().toISOString().slice(0, 10), // Default join date
      },
    ]);
    showToast('Teacher added successfully!', 'success');
  };

  const handleEditTeacher = (teacherData: any) => {
    if (!teacherData.name || !teacherData.email || !teacherData.phone || !teacherData.address || !teacherData.hourRate) {
      showToast('All fields are required.', 'error');
      return;
    }
    
    setTeachers(teachers.map(t => 
      t.id === teacherData.id 
        ? {
            ...t,
            name: teacherData.name,
            email: teacherData.email,
            phone: teacherData.phone,
            address: teacherData.address,
            hourRate: teacherData.hourRate,
            qualifications: teacherData.qualifications.map((q: string) => ({ name: q, date: new Date().getFullYear().toString() })),
            groupQualifications: teacherData.groupQualifications.map((gq: string) => ({ name: gq })),
          }
        : t
    ));
    showToast('Teacher updated successfully!', 'success');
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowViewModal(true);
  };

  const handleEditTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddTeacherClick = () => {
    setSelectedTeacher(null);
    setModalMode('add');
    setShowModal(true);
  };

  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Teachers</h1>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{total}</div>
            <div className="text-xs text-gray-500">Total Teachers</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{active}</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{inactive}</div>
            <div className="text-xs text-gray-500">Inactive</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">${avgRate}</div>
            <div className="text-xs text-gray-500">Avg. Rate</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{newThisMonth}</div>
            <div className="text-xs text-gray-500">New This Month</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center col-span-2 lg:col-span-1">
            <div className="text-lg font-bold text-pink-600 dark:text-pink-400">{mostCommonQual}</div>
            <div className="text-xs text-gray-500">Top Qualification</div>
          </div>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search teachers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <button onClick={handleAddTeacherClick} className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-sm">+ Add Teacher</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(teacher => (
            <div key={teacher.id} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-100 dark:border-gray-800 relative">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold absolute right-4 top-4 ${
                  teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {teacher.status}
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{teacher.name}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{teacher.email} | {teacher.phone}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{teacher.address}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Hourly Rate: <span className="font-semibold text-blue-600 dark:text-blue-400">${teacher.hourRate}/hr</span></div>
              <div className="flex flex-wrap gap-2 mb-1">
                {teacher.qualifications.map(q => (
                  <span key={q.name} className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-medium">{q.name}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-1">
                {teacher.groupQualifications.map(gq => (
                  <span key={gq.name} className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-0.5 rounded text-xs font-medium">{gq.name}</span>
                ))}
              </div>
              <div className="text-xs text-gray-400 mb-2">Joined: {teacher.joinDate}</div>
              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => handleViewTeacher(teacher)}
                  className="text-blue-600 hover:underline text-xs hover:text-blue-700 transition-colors"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEditTeacherClick(teacher)}
                  className="text-gray-600 hover:underline text-xs hover:text-gray-700 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modals */}
        <TeacherModal 
          open={showModal} 
          onClose={() => setShowModal(false)} 
          onAdd={handleAddTeacher}
          onEdit={handleEditTeacher}
          teacher={selectedTeacher}
          mode={modalMode}
        />
        
        <TeacherViewModal
          open={showViewModal}
          onClose={() => setShowViewModal(false)}
          teacher={selectedTeacher}
        />
      </div>
    </div>
  );
};

export default TeachersPage; 