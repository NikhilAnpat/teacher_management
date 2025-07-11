"use client";
import React, { useState, useEffect } from 'react';
import { Teacher } from '../types';

interface TeacherModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (teacher: any) => void;
  onEdit?: (teacher: any) => void;
  teacher?: Teacher | null;
  mode: 'add' | 'edit';
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  hourRate: '',
  qualifications: [''],
  groupQualifications: [''],
};

const TeacherModal: React.FC<TeacherModalProps> = ({ open, onClose, onAdd, onEdit, teacher, mode }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (teacher && mode === 'edit') {
      setForm({
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        address: teacher.address,
        hourRate: teacher.hourRate.toString(),
        qualifications: teacher.qualifications.length > 0 
          ? teacher.qualifications.map(q => q.name)
          : [''],
        groupQualifications: teacher.groupQualifications.length > 0
          ? teacher.groupQualifications.map(gq => gq.name)
          : [''],
      });
    } else {
      setForm(initialForm);
    }
  }, [teacher, mode, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx?: number, type?: string) => {
    const { name, value } = e.target;
    if (type === 'qualifications' && typeof idx === 'number') {
      const updated = [...form.qualifications];
      updated[idx] = value;
      setForm(f => ({ ...f, qualifications: updated }));
    } else if (type === 'groupQualifications' && typeof idx === 'number') {
      const updated = [...form.groupQualifications];
      updated[idx] = value;
      setForm(f => ({ ...f, groupQualifications: updated }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const addField = (type: 'qualifications' | 'groupQualifications') => {
    setForm(f => ({ ...f, [type]: [...f[type], ''] }));
  };

  const removeField = (type: 'qualifications' | 'groupQualifications', idx: number) => {
    setForm(f => ({ ...f, [type]: f[type].filter((_: any, i: number) => i !== idx) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.hourRate) {
      setError('All fields are required.');
      return;
    }
    
    const teacherData = {
      ...form,
      hourRate: parseFloat(form.hourRate),
      qualifications: form.qualifications.filter(q => q),
      groupQualifications: form.groupQualifications.filter(gq => gq),
    };

    if (mode === 'edit' && onEdit) {
      onEdit({ ...teacherData, id: teacher?.id });
    } else {
      onAdd(teacherData);
    }
    
    setForm(initialForm);
    setError('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === 'edit' ? 'Edit Teacher' : 'Add Teacher'}
        </h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input name="address" value={form.address} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
            <input name="hourRate" type="number" min="0" step="0.01" value={form.hourRate} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Qualifications</label>
          {form.qualifications.map((q, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input value={q} onChange={e => handleChange(e, idx, 'qualifications')} className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              {form.qualifications.length > 1 && (
                <button type="button" onClick={() => removeField('qualifications', idx)} className="text-red-500">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addField('qualifications')} className="text-blue-600 text-sm">+ Add Qualification</button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Group Qualifications</label>
          {form.groupQualifications.map((gq, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input value={gq} onChange={e => handleChange(e, idx, 'groupQualifications')} className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              {form.groupQualifications.length > 1 && (
                <button type="button" onClick={() => removeField('groupQualifications', idx)} className="text-red-500">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addField('groupQualifications')} className="text-blue-600 text-sm">+ Add Group Qualification</button>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            {mode === 'edit' ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherModal; 