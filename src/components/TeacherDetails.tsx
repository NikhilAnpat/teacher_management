import React from 'react';
import { Teacher } from '../types';

interface Props {
  teacher: Teacher;
}

const TeacherDetails: React.FC<Props> = ({ teacher }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 rounded-lg shadow p-8 border border-gray-200 dark:border-gray-800">
      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Details</h2>
        <div className="mb-2"><span className="font-medium">Name:</span> {teacher.name}</div>
        <div className="mb-2"><span className="font-medium">Email:</span> {teacher.email}</div>
        <div className="mb-2"><span className="font-medium">Phone:</span> {teacher.phone}</div>
        <div className="mb-2"><span className="font-medium">Address:</span> {teacher.address}</div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Private Qualifications</h2>
        <ul className="mb-4">
          {teacher.qualifications.map(q => (
            <li key={q.name} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-1">
              <span>{q.name}</span>
              <span className="text-xs text-gray-500">{q.date}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Group Qualifications</h2>
        <ul>
          {teacher.groupQualifications.map(gq => (
            <li key={gq.name} className="py-1">{gq.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDetails; 