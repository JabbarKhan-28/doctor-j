export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Doctor {
  id: number;
  name: string;
  speciality: string;
  experience: string;
  fees: number;
  image: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: number;
  doctorName: string;
  doctorImage: string;
  doctorSpeciality: string;
  doctorFees: number;
  date: string;
  timeSlot: string;
  status: "booked" | "cancelled";
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
}
