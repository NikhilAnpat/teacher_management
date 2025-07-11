"use client";
import React, { useRef } from 'react';
import { Teacher } from '../types';
import ScheduleTable from './ScheduleTable';

interface TeacherViewModalProps {
  open: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

const TeacherViewModal: React.FC<TeacherViewModalProps> = ({ open, onClose, teacher }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!teacher) return;
    
    try {
      // For now, we'll use a simple approach to generate PDF-like content
      // In a real app, you'd use a library like jsPDF or html2pdf
      const content = `
Teacher Profile: ${teacher.name}
Email: ${teacher.email}
Phone: ${teacher.phone}
Address: ${teacher.address}
Hourly Rate: $${teacher.hourRate}/hr
Join Date: ${teacher.joinDate || 'N/A'}

Qualifications:
${teacher.qualifications.map(q => `- ${q.name} (${q.date})`).join('\n')}

Group Qualifications:
${teacher.groupQualifications.map(gq => `- ${gq.name}`).join('\n')}

Schedule:
${teacher.schedule.map(s => `- ${s.day}: ${s.startTime} - ${s.endTime} (${s.type})`).join('\n')}
      `;
      
      // Create a blob and download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${teacher.name.replace(/\s+/g, '_')}_profile.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const shareProfile = async () => {
    if (!teacher) return;
    
    const profileText = `
Teacher Profile: ${teacher.name}
Email: ${teacher.email}
Phone: ${teacher.phone}
Hourly Rate: $${teacher.hourRate}/hr
    `;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${teacher.name} - Teacher Profile`,
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

  if (!open || !teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Teacher Profile</h2>
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
                  <p className="text-gray-900 dark:text-white">{teacher.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                  <p className="text-gray-900 dark:text-white">{teacher.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                  <p className="text-gray-900 dark:text-white">{teacher.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</label>
                  <p className="text-gray-900 dark:text-white">{teacher.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Hourly Rate</label>
                  <p className="text-gray-900 dark:text-white font-semibold">${teacher.hourRate}/hr</p>
                </div>
                {teacher.joinDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Join Date</label>
                    <p className="text-gray-900 dark:text-white">{teacher.joinDate}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Qualifications</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Professional Qualifications</label>
                  <div className="space-y-2">
                    {teacher.qualifications.map((qual, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 p-2 rounded border">
                        <span className="text-gray-900 dark:text-white font-medium">{qual.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({qual.date})</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Group Qualifications</label>
                  <div className="space-y-2">
                    {teacher.groupQualifications.map((groupQual, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 p-2 rounded border">
                        <span className="text-gray-900 dark:text-white">{groupQual.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Schedule</h3>
            {teacher.schedule.length > 0 ? (
              <ScheduleTable schedule={teacher.schedule} showTeacherNames={false} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No schedule available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherViewModal; 