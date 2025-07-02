export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export const WEEKDAYS: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export type Supervisor = 'Mr Olu' | "Mr Bobgar" | "Mr Ibrahim";

export type Department = 'SA&DM' | 'N&C' | 'R&SP' | 'H&IS';

export type User = {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  workDays: Weekday[];
  startDate: string;
  endDate: string;
  department: {
    name: Department;
    startDate: string;
    endDate: string;
  }[];
  supervisor: Supervisor[];
  status: string;
};
