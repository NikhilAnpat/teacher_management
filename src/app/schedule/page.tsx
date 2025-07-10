import React from 'react';
import ScheduleTable from '../../components/ScheduleTable';
import { ScheduleSlot } from '../../types';

const mockSchedule: ScheduleSlot[] = [
  { day: 'Monday', startTime: '9:00', endTime: '11:00', type: 'Class' },
  { day: 'Tuesday', startTime: '13:00', endTime: '15:00', type: 'Class' },
  { day: 'Saturday', startTime: '10:00', endTime: '12:00', type: 'Class' },
];

const SchedulePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Schedule</h1>
      <ScheduleTable schedule={mockSchedule} />
    </div>
  );
};

export default SchedulePage; 