"use client";
import React, { useState } from 'react';
import { Teacher } from '../types';

interface AssignClassModalProps {
  open: boolean;
  onClose: () => void;
  teachers: Teacher[];
  onAssign: (teacherId: string, day: string, startTime: string, endTime: string, type: string) => void;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AssignClassModal: React.FC<AssignClassModalProps> = ({ open, onClose, teachers, onAssign }) => {
  const [teacherId, setTeacherId] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherId && day && startTime && endTime && type) {
      onAssign(teacherId, day, startTime, endTime, type);
      onClose();
      setTeacherId('');
      setDay('');
      setStartTime('');
      setEndTime('');
      setType('');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-6">Assign Class</h2>
        <div className="mb-4">
          <label>Teacher</label>
          <select value={teacherId} onChange={e => setTeacherId(e.target.value)} required className="w-full">
            <option value="">Select Teacher</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label>Day</label>
          <select value={day} onChange={e => setDay(e.target.value)} required className="w-full">
            <option value="">Select Day</option>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label>Start Time</label>
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required className="w-full" />
        </div>
        <div className="mb-4">
          <label>End Time</label>
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required className="w-full" />
        </div>
        <div className="mb-4">
          <label>Type</label>
          <input value={type} onChange={e => setType(e.target.value)} required className="w-full" placeholder="e.g. Math, Music" />
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200">Assign</button>
        </div>
      </form>
    </div>
  );
};

export default AssignClassModal;
