"use client";
import React, { useState } from 'react';
import ScheduleTable from '../../components/ScheduleTable';
import { Teacher } from '../../types';
import AssignClassModal from '../../components/AssignClassModal';

// Sample teachers data with schedules
const teachers: Teacher[] = [
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
      { day: 'Monday', startTime: '9:00', endTime: '11:00', type: 'Music Class' },
      { day: 'Wednesday', startTime: '14:00', endTime: '16:00', type: 'Vocal Training' },
      { day: 'Friday', startTime: '10:00', endTime: '12:00', type: 'Choir Practice' },
    ],
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
      { day: 'Tuesday', startTime: '10:00', endTime: '12:00', type: 'Math Class' },
      { day: 'Thursday', startTime: '13:00', endTime: '15:00', type: 'Physics Lab' },
      { day: 'Saturday', startTime: '9:00', endTime: '11:00', type: 'Math Club' },
    ],
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
      { day: 'Monday', startTime: '13:00', endTime: '15:00', type: 'English Class' },
      { day: 'Friday', startTime: '9:00', endTime: '11:00', type: 'Literature' },
      { day: 'Saturday', startTime: '10:00', endTime: '12:00', type: 'Book Club' },
    ],
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
      { day: 'Monday', startTime: '8:00', endTime: '10:00', type: 'Biology Lab' },
      { day: 'Thursday', startTime: '9:00', endTime: '11:00', type: 'Science Class' },
      { day: 'Sunday', startTime: '14:00', endTime: '16:00', type: 'Science Club' },
    ],
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
      { day: 'Wednesday', startTime: '11:00', endTime: '13:00', type: 'Art Class' },
      { day: 'Saturday', startTime: '13:00', endTime: '15:00', type: 'Design Workshop' },
    ],
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
      { day: 'Tuesday', startTime: '8:00', endTime: '10:00', type: 'Chemistry Lab' },
      { day: 'Friday', startTime: '10:00', endTime: '12:00', type: 'Biology Class' },
    ],
  },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const SchedulePage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'individual'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherList, setTeacherList] = useState<Teacher[]>(teachers);

  // Filter teachers based on selection
  const filteredTeachers = teacherList.filter(teacher => {
    if (selectedTeacher !== 'all' && teacher.id !== selectedTeacher) return false;
    if (selectedDay !== 'all' && !teacher.schedule.some(slot => slot.day === selectedDay)) return false;
    return true;
  });

  // Get all schedule slots for the filtered teachers
  const allScheduleSlots = filteredTeachers.flatMap(teacher => 
    teacher.schedule.map(slot => ({
      ...slot,
      teacherName: teacher.name,
      teacherId: teacher.id,
    }))
  );

  // Filter by day if selected
  const finalScheduleSlots = selectedDay === 'all' 
    ? allScheduleSlots 
    : allScheduleSlots.filter(slot => slot.day === selectedDay);

  // Handle assigning a class
  const handleAssign = (teacherId: string, day: string, startTime: string, endTime: string, type: string) => {
    setTeacherList(prev => prev.map(teacher => {
      if (teacher.id === teacherId) {
        return {
          ...teacher,
          schedule: [
            ...teacher.schedule,
            { day, startTime, endTime, type }
          ]
        };
      }
      return teacher;
    }));
  };

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Schedule Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
          >
            + Add Class
          </button>
        </div>
        <AssignClassModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          teachers={teacherList}
          onAssign={handleAssign}
        />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{teachers.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Teachers</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {teachers.reduce((total, teacher) => total + teacher.schedule.length, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Classes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {new Set(allScheduleSlots.map(slot => slot.day)).size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Days</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {Math.round(allScheduleSlots.reduce((total, slot) => {
                const [startHour] = slot.startTime.split(':').map(Number);
                const [endHour] = slot.endTime.split(':').map(Number);
                return total + (endHour - startHour);
              }, 0))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Hours</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">View Mode:</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'all' | 'individual')}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Teachers</option>
                <option value="individual">Individual Teachers</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Teacher:</label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Teachers</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Day:</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Days</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSelectedTeacher('all');
                setSelectedDay('all');
                setViewMode('all');
              }}
              className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Schedule Display */}
        {viewMode === 'all' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedTeacher !== 'all' 
                  ? `${teachers.find(t => t.id === selectedTeacher)?.name}'s Schedule`
                  : 'All Teachers Schedule'
                }
              </h2>
            </div>
            <ScheduleTable schedule={finalScheduleSlots} showTeacherNames={true} />
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTeachers.map(teacher => (
              <div key={teacher.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{teacher.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.email}</p>
                </div>
                <ScheduleTable schedule={teacher.schedule} showTeacherNames={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage; 