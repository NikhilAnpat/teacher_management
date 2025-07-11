import React from 'react';
import Link from 'next/link';
import { Teacher } from '../types';

interface Props {
  teacher: Teacher;
}

const TeacherCard: React.FC<Props> = ({ teacher }) => {
  return (
    <Link href={`/teachers/${teacher.id}`} className="block bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-200 dark:border-gray-800 cursor-pointer">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
          {teacher.name[0]}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{teacher.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{teacher.email}</p>
        </div>
      </div>
      <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">{teacher.phone}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{teacher.address}</div>
      <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">${teacher.hourRate}/hr</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {teacher.qualifications.map(q => (
          <span key={q.name} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{q.name}</span>
        ))}
      </div>
    </Link>
  );
};

export default TeacherCard; 