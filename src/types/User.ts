export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export type Supervisor = 'Olu' | "Ola" | "Bolu";

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
  department: Department[];
  supervisor: Supervisor[];
};
