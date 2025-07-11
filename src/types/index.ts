export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  hourRate: number;
  qualifications: Qualification[];
  groupQualifications: GroupQualification[];
  schedule: ScheduleSlot[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  status: "active" | "inactive";
  enrollmentDate: string;
  phone: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  emergencyContact?: string;
  medicalInfo?: string;
  notes?: string;
}

export interface Qualification {
  name: string;
  date: string;
}

export interface GroupQualification {
  name: string;
}

export interface ScheduleSlot {
  day: string;
  startTime: string;
  endTime: string;
  type: string;
}

export interface EnhancedScheduleSlot extends ScheduleSlot {
  teacherName?: string;
  teacherId?: string;
}

export interface Payment {
  id: string;
  teacherId: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
} 