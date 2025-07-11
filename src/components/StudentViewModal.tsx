"use client";
import React, { useRef } from 'react';
import { Student } from '../types';

interface StudentViewModalProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
}

const StudentViewModal: React.FC<StudentViewModalProps> = ({ open, onClose, student }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!student) return;
    
    try {
      const content = `
Student Profile: ${student.name}
Email: ${student.email}
Phone: ${student.phone}
Grade: ${student.grade}
Status: ${student.status}
Enrollment Date: ${student.enrollmentDate}
Address: ${student.address || 'N/A'}
Parent Name: ${student.parentName || 'N/A'}
Parent Phone: ${student.parentPhone || 'N/A'}
Emergency Contact: ${student.emergencyContact || 'N/A'}
Medical Information: ${student.medicalInfo || 'N/A'}
Notes: ${student.notes || 'N/A'}
      `;
      
      // Create a blob and download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${student.name.replace(/\s+/g, '_')}_profile.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const shareProfile = async () => {
    if (!student) return;
    
    const profileText = `
Student Profile: ${student.name}
Email: ${student.email}
Phone: ${student.phone}
Grade: ${student.grade}
Status: ${student.status}
    `;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${student.name} - Student Profile`,
          text: profileText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(profileText);
        alert('Profile copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Profile</h2>
          <div className="flex gap-2">
            <button
              onClick={shareProfile}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Share
            </button>
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="p-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                  <p className="text-gray-900 dark:text-white">{student.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                  <p className="text-gray-900 dark:text-white">{student.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                  <p className="text-gray-900 dark:text-white">{student.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Grade</label>
                  <p className="text-gray-900 dark:text-white">Grade {student.grade}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {student.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Enrollment Date</label>
                  <p className="text-gray-900 dark:text-white">{student.enrollmentDate}</p>
                </div>
                {student.address && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</label>
                    <p className="text-gray-900 dark:text-white">{student.address}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                {student.parentName && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Parent Name</label>
                    <div className="bg-white dark:bg-gray-700 p-2 rounded border">
                      <span className="text-gray-900 dark:text-white">{student.parentName}</span>
                    </div>
                  </div>
                )}
                {student.parentPhone && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Parent Phone</label>
                    <div className="bg-white dark:bg-gray-700 p-2 rounded border">
                      <span className="text-gray-900 dark:text-white">{student.parentPhone}</span>
                    </div>
                  </div>
                )}
                {student.emergencyContact && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Emergency Contact</label>
                    <div className="bg-white dark:bg-gray-700 p-2 rounded border">
                      <span className="text-gray-900 dark:text-white">{student.emergencyContact}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {(student.medicalInfo || student.notes) && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h3>
              <div className="space-y-4">
                {student.medicalInfo && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Medical Information</label>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded border">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{student.medicalInfo}</p>
                    </div>
                  </div>
                )}
                {student.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Notes</label>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded border">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{student.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentViewModal; 