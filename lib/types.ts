export type Patient = {
  id: string;
  name: string;
  nik: string; 
  diagnosis: string;
  admissionDate: string;
  doctor: string;
  room: string;
};

export type SortKey = 'name' | 'admissionDate';
export type SortDir = 'asc' | 'desc';
