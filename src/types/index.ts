export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  qualifications: Qualification[];
  groupQualifications: GroupQualification[];
  schedule: ScheduleSlot[];
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

export interface Payment {
  id: string;
  teacherId: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
} 