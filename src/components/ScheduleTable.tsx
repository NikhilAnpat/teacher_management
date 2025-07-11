import React from 'react';
import { ScheduleSlot } from '../types';

interface EnhancedScheduleSlot extends ScheduleSlot {
  teacherName?: string;
  teacherId?: string;
}

interface Props {
  schedule: EnhancedScheduleSlot[];
  showTeacherNames?: boolean;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = [
  '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
];

// Color mapping for different teachers
const teacherColors = [
  'bg-blue-500',
  'bg-green-500', 
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-teal-500',
];

const ScheduleTable: React.FC<Props> = ({ schedule, showTeacherNames = false }) => {
  // Generate color for teacher
  const getTeacherColor = (teacherId?: string) => {
    if (!teacherId) return 'bg-blue-500';
    const index = parseInt(teacherId) % teacherColors.length;
    return teacherColors[index];
  };

  // Get all slots for a specific day and hour
  const getSlotsForDayAndHour = (day: string, hour: string) => {
    return schedule.filter(slot => {
      const slotStartHour = slot.startTime.split(':')[0];
      return slot.day === day && slotStartHour === hour.split(':')[0];
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 w-16">Time</th>
            {days.map(day => (
              <th key={day} className="p-2 border-b bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 min-w-[120px]">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td className="p-2 border-b bg-gray-50 dark:bg-gray-900 text-xs text-gray-500 w-16 font-medium">{hour}</td>
              {days.map(day => {
                const slots = getSlotsForDayAndHour(day, hour);
                return (
                  <td key={day} className="p-1 border-b border-r bg-white dark:bg-gray-900 h-12 relative">
                    {slots.map((slot, index) => (
                      <div
                        key={`${slot.teacherId || index}-${slot.startTime}`}
                        className={`${getTeacherColor(slot.teacherId)} text-white rounded px-2 py-1 text-xs text-center animate-fade-in mb-1 cursor-pointer hover:opacity-80 transition-opacity ${
                          slots.length > 1 ? 'text-[10px]' : ''
                        }`}
                        title={`${slot.type}${slot.teacherName ? ` - ${slot.teacherName}` : ''} (${slot.startTime} - ${slot.endTime})`}
                      >
                        <div className="font-medium">
                          {showTeacherNames && slot.teacherName ? (
                            <div className="truncate">{slot.teacherName}</div>
                          ) : null}
                          <div className="truncate">{slot.type}</div>
                        </div>
                        <div className="text-[9px] opacity-90">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Legend for teacher colors */}
      {showTeacherNames && schedule.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Teacher Legend:</h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(schedule.map(slot => slot.teacherId))).map((teacherId, index) => {
              const teacherSlot = schedule.find(slot => slot.teacherId === teacherId);
              if (!teacherSlot) return null;
              
              return (
                <div key={teacherId} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${getTeacherColor(teacherId)}`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{teacherSlot.teacherName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable; 