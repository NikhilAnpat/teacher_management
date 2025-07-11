"use client";
import React, { useState } from "react";
import { Student } from "../../../types";
import StudentModal from "../../../components/StudentModal";
import StudentViewModal from "../../../components/StudentViewModal";
import { useToast } from "../../../components/FeedbackToast";

const initialStudents: Student[] = [
  { id: "1", name: "Emily Carter", email: "emily.carter@example.com", grade: "10", status: "active", enrollmentDate: "2022-09-01", phone: "555-123-4567", address: "123 Oak St, New York", parentName: "John Carter", parentPhone: "555-123-4568", emergencyContact: "555-123-4569" },
  { id: "2", name: "Liam Smith", email: "liam.smith@example.com", grade: "11", status: "active", enrollmentDate: "2021-08-15", phone: "555-234-5678", address: "456 Pine St, New York", parentName: "Sarah Smith", parentPhone: "555-234-5679", emergencyContact: "555-234-5680" },
  { id: "3", name: "Sophia Lee", email: "sophia.lee@example.com", grade: "12", status: "inactive", enrollmentDate: "2020-07-10", phone: "555-345-6789", address: "789 Maple St, New York", parentName: "David Lee", parentPhone: "555-345-6790", emergencyContact: "555-345-6791" },
  { id: "4", name: "Noah Brown", email: "noah.brown@example.com", grade: "10", status: "active", enrollmentDate: "2022-09-01", phone: "555-456-7890", address: "321 Elm St, New York", parentName: "Lisa Brown", parentPhone: "555-456-7891", emergencyContact: "555-456-7892" },
  { id: "5", name: "Olivia Wilson", email: "olivia.wilson@example.com", grade: "11", status: "active", enrollmentDate: "2021-08-15", phone: "555-567-8901", address: "654 Birch St, New York", parentName: "Michael Wilson", parentPhone: "555-567-8902", emergencyContact: "555-567-8903" },
  { id: "6", name: "Ava Martinez", email: "ava.martinez@example.com", grade: "12", status: "active", enrollmentDate: "2020-07-10", phone: "555-678-9012", address: "987 Cedar St, New York", parentName: "Maria Martinez", parentPhone: "555-678-9013", emergencyContact: "555-678-9014" },
  { id: "7", name: "Mason Kim", email: "mason.kim@example.com", grade: "10", status: "inactive", enrollmentDate: "2022-09-01", phone: "555-789-0123", address: "147 Willow St, New York", parentName: "James Kim", parentPhone: "555-789-0124", emergencyContact: "555-789-0125" },
  { id: "8", name: "Isabella Chen", email: "isabella.chen@example.com", grade: "11", status: "active", enrollmentDate: "2021-08-15", phone: "555-890-1234", address: "258 Spruce St, New York", parentName: "Robert Chen", parentPhone: "555-890-1235", emergencyContact: "555-890-1236" },
  { id: "9", name: "James Patel", email: "james.patel@example.com", grade: "12", status: "active", enrollmentDate: "2020-07-10", phone: "555-901-2345", address: "369 Poplar St, New York", parentName: "Priya Patel", parentPhone: "555-901-2346", emergencyContact: "555-901-2347" },
  { id: "10", name: "Mia Garcia", email: "mia.garcia@example.com", grade: "10", status: "active", enrollmentDate: "2022-09-01", phone: "555-012-3456", address: "741 Aspen St, New York", parentName: "Carlos Garcia", parentPhone: "555-012-3457", emergencyContact: "555-012-3458" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const { showToast } = useToast();

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  // Stats
  const total = students.length;
  const active = students.filter(s => s.status === "active").length;
  const inactive = students.filter(s => s.status === "inactive").length;
  const avgGrade = (students.reduce((sum, s) => sum + parseInt(s.grade), 0) / total).toFixed(1);
  const newThisMonth = students.filter(s => s.enrollmentDate >= "2024-06-01").length;

  const handleAddStudent = (studentData: any) => {
    if (!studentData.name || !studentData.email || !studentData.phone || !studentData.grade) {
      showToast('Name, email, phone, and grade are required.', 'error');
      return;
    }
    
    setStudents([
      ...students,
      {
        id: (students.length + 1).toString(),
        ...studentData,
        status: 'active' as const,
        enrollmentDate: new Date().toISOString().slice(0, 10),
      },
    ]);
    showToast('Student added successfully!', 'success');
  };

  const handleEditStudent = (studentData: any) => {
    if (!studentData.name || !studentData.email || !studentData.phone || !studentData.grade) {
      showToast('Name, email, phone, and grade are required.', 'error');
      return;
    }
    
    setStudents(students.map(s => 
      s.id === studentData.id 
        ? { ...s, ...studentData }
        : s
    ));
    showToast('Student updated successfully!', 'success');
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEditStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAddStudentClick = () => {
    setSelectedStudent(null);
    setModalMode('add');
    setShowModal(true);
  };

  return (
    <div className="w-full min-h-screen p-0 sm:p-4 bg-gradient-to-br from-blue-20 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Students</h1>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{total}</div>
            <div className="text-xs text-gray-500">Total Students</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{active}</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{inactive}</div>
            <div className="text-xs text-gray-500">Inactive</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{avgGrade}</div>
            <div className="text-xs text-gray-500">Avg. Grade</div>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-900 shadow p-4 flex flex-col items-center col-span-2 lg:col-span-1">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{newThisMonth}</div>
            <div className="text-xs text-gray-500">New This Month</div>
          </div>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <button onClick={handleAddStudentClick} className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-sm">+ Add Student</button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Name</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Email</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Phone</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Grade</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Enrollment</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{student.name}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{student.email}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{student.phone}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{student.grade}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{student.enrollmentDate}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleViewStudent(student)}
                      className="text-blue-600 hover:underline mr-2 hover:text-blue-700 transition-colors"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleEditStudentClick(student)}
                      className="text-gray-600 hover:underline hover:text-gray-700 transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        <StudentModal 
          open={showModal} 
          onClose={() => setShowModal(false)} 
          onAdd={handleAddStudent}
          onEdit={handleEditStudent}
          student={selectedStudent}
          mode={modalMode}
        />
        
        <StudentViewModal
          open={showViewModal}
          onClose={() => setShowViewModal(false)}
          student={selectedStudent}
        />
      </div>
    </div>
  );
} 