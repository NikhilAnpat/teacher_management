"use client";
import React, { useState } from 'react';
import TeacherCard from '../../components/TeacherCard';
import AddTeacherModal from '../../components/AddTeacherModal';
import { Teacher } from '../../types';
import { useToast } from '../../components/FeedbackToast';

const initialTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Alyina Allan',
    email: 'alyina.allan@sample.com',
    phone: '555-000-0007',
    address: '123 Main St, New York',
    qualifications: [
      { name: 'Music', date: '2018' },
      { name: 'Vocal Competency', date: '2019' },
    ],
    groupQualifications: [{ name: 'Kater Choir' }],
    schedule: [
      { day: 'Monday', startTime: '9:00', endTime: '11:00', type: 'Class' },
      { day: 'Wednesday', startTime: '14:00', endTime: '16:00', type: 'Class' },
    ],
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@sample.com',
    phone: '555-000-0008',
    address: '456 Park Ave, New York',
    qualifications: [
      { name: 'Math', date: '2017' },
      { name: 'Physics', date: '2016' },
    ],
    groupQualifications: [{ name: 'Math Club' }],
    schedule: [
      { day: 'Tuesday', startTime: '10:00', endTime: '12:00', type: 'Class' },
      { day: 'Thursday', startTime: '13:00', endTime: '15:00', type: 'Class' },
    ],
  },
  {
    id: '3',
    name: 'Priya Patel',
    email: 'priya.patel@sample.com',
    phone: '555-000-0009',
    address: '789 Broadway, New York',
    qualifications: [
      { name: 'English', date: '2015' },
      { name: 'Literature', date: '2014' },
    ],
    groupQualifications: [{ name: 'Book Club' }],
    schedule: [
      { day: 'Friday', startTime: '9:00', endTime: '11:00', type: 'Class' },
      { day: 'Saturday', startTime: '10:00', endTime: '12:00', type: 'Class' },
    ],
  },
  {
    id: '4',
    name: 'Chen Wang',
    email: 'chen.wang@sample.com',
    phone: '555-000-0010',
    address: '321 5th Ave, New York',
    qualifications: [
      { name: 'Science', date: '2013' },
      { name: 'Biology', date: '2012' },
    ],
    groupQualifications: [{ name: 'Science Club' }],
    schedule: [
      { day: 'Monday', startTime: '13:00', endTime: '15:00', type: 'Class' },
      { day: 'Thursday', startTime: '9:00', endTime: '11:00', type: 'Class' },
    ],
  },
];

const TeachersPage = () => {
  const [search, setSearch] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();

  const filtered = teachers.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddTeacher = (teacher: any) => {
    if (!teacher.name || !teacher.email || !teacher.phone || !teacher.address) {
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
        qualifications: teacher.qualifications.map((q: string) => ({ name: q, date: new Date().getFullYear().toString() })),
        groupQualifications: teacher.groupQualifications.map((gq: string) => ({ name: gq })),
        schedule: [],
      },
    ]);
    showToast('Teacher added successfully!', 'success');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teachers</h1>
        <input
          type="text"
          placeholder="Search teachers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add Teacher</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(teacher => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
      <AddTeacherModal open={showModal} onClose={() => setShowModal(false)} onAdd={handleAddTeacher} />
    </div>
  );
};

export default TeachersPage; 