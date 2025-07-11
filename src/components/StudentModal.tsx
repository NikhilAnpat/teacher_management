"use client";
import React, { useState, useEffect } from 'react';
import { Student } from '../types';

interface StudentModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (student: any) => void;
  onEdit?: (student: any) => void;
  student?: Student | null;
  mode: 'add' | 'edit';
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  grade: '',
  address: '',
  parentName: '',
  parentPhone: '',
  emergencyContact: '',
  medicalInfo: '',
  notes: '',
};

const StudentModal: React.FC<StudentModalProps> = ({ open, onClose, onAdd, onEdit, student, mode }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (student && mode === 'edit') {
      setForm({
        name: student.name,
        email: student.email,
        phone: student.phone,
        grade: student.grade,
        address: student.address || '',
        parentName: student.parentName || '',
        parentPhone: student.parentPhone || '',
        emergencyContact: student.emergencyContact || '',
        medicalInfo: student.medicalInfo || '',
        notes: student.notes || '',
      });
    } else {
      setForm(initialForm);
    }
  }, [student, mode, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.grade) {
      setError('Name, email, phone, and grade are required.');
      return;
    }
    
    const studentData = {
      ...form,
      status: 'active' as const,
      enrollmentDate: mode === 'add' ? new Date().toISOString().slice(0, 10) : student?.enrollmentDate,
    };

    if (mode === 'edit' && onEdit) {
      onEdit({ ...studentData, id: student?.id });
    } else {
      onAdd(studentData);
    }
    
    setForm(initialForm);
    setError('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'edit' ? 'Edit Student' : 'Add Student'}
        </h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Grade *</label>
            <select name="grade" value={form.grade} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <option value="">Select Grade</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input name="address" value={form.address} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Parent Name</label>
            <input name="parentName" value={form.parentName} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Parent Phone</label>
            <input name="parentPhone" value={form.parentPhone} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Emergency Contact</label>
            <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Medical Information</label>
          <textarea name="medicalInfo" value={form.medicalInfo} onChange={handleChange} rows={3} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" placeholder="Any medical conditions, allergies, etc." />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" placeholder="Additional notes about the student" />
        </div>
        
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200">
            {mode === 'edit' ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentModal; 