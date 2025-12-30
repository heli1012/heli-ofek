
export type TransportOption = 
  | 'Hilton-Pickup' 
  | 'Carlton-Pickup' 
  | 'WIZO-HQ-Pickup' 
  | 'Independent' 
  | 'Not-Attending';

export interface DailyAttendance {
  status: 'Attending' | 'Not-Attending';
  pickupPoint: TransportOption;
}

export interface Delegate {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  federation: string;
  phone: string;
  
  // Daily logistics
  sunday_jan18: DailyAttendance;
  monday_jan19: DailyAttendance;
  tuesday_jan20: DailyAttendance;
  wednesday_jan21: DailyAttendance;
  thursday_jan22: DailyAttendance;
  
  timestamp: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ProgramDay {
  day: number;
  date: string;
  title: string;
  subtitle: string;
  activities: { time: string; activity: string; description?: string }[];
}
