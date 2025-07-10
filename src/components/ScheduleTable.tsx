import React from 'react';
import { ScheduleSlot } from '../types';

interface Props {
  schedule: ScheduleSlot[];
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = [
  '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
];

const ScheduleTable: React.FC<Props> = ({ schedule }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b bg-gray-100 dark:bg-gray-800"></th>
            {days.map(day => (
              <th key={day} className="p-2 border-b bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td className="p-2 border-b bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 w-16">{hour}</td>
              {days.map(day => {
                const slot = schedule.find(s => s.day === day && s.startTime.startsWith(hour));
                return (
                  <td key={day} className="p-1 border-b border-r bg-white dark:bg-gray-900 h-12">
                    {slot ? (
                      <div className="bg-blue-500 text-white rounded px-2 py-1 text-xs text-center animate-fade-in">
                        {slot.type} <br /> {slot.startTime} - {slot.endTime}
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable; 