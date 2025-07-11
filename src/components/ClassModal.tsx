"use client";
import React, { useState } from "react";

interface ClassModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (classData: { name: string; description: string; teacherId: string }) => void;
  teachers: { id: string; name: string }[];
}

const ClassModal: React.FC<ClassModalProps> = ({ open, onClose, onAdd, teachers }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && teacherId) {
      onAdd({ name, description, teacherId });
      setName("");
      setDescription("");
      setTeacherId("");
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-6">Add Class</h2>
        <div className="mb-4">
          <label>Class Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required className="w-full" placeholder="Enter class name" />
        </div>
        <div className="mb-4">
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full" placeholder="Enter description (optional)" />
        </div>
        <div className="mb-4">
          <label>Teacher</label>
          <select value={teacherId} onChange={e => setTeacherId(e.target.value)} required className="w-full">
            <option value="">Select Teacher</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200">Add</button>
        </div>
      </form>
    </div>
  );
};

export default ClassModal; 