"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import TeacherDetails from '../../../components/TeacherDetails';
import ScheduleTable from '../../../components/ScheduleTable';
import { Teacher } from '../../../types';
import { useToast } from '../../../components/FeedbackToast';

const teachers: Teacher[] = [
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

const TeacherProfilePage = () => {
  const params = useParams();
  const teacherId = params?.id as string;
  const teacher = teachers.find(t => t.id === teacherId);
  const { showToast } = useToast();

  useEffect(() => {
    if (teacher) {
      showToast(`Viewing profile for ${teacher.name}`, 'success');
    }
  }, [teacher, showToast]);

  if (!teacher) return <div className="text-red-600">Teacher not found.</div>;
  return (
    <div className="space-y-8">
      <TeacherDetails teacher={teacher} />
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Schedule</h2>
        <ScheduleTable schedule={teacher.schedule} />
      </div>
    </div>
  );
};

export default TeacherProfilePage; 