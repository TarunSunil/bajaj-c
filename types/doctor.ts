interface Clinic {
  name: string;
  address?: string;
}

interface Location {
  address: string;
  city?: string;
}

export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string | null;
  doctor_introduction?: string;
  specialities: Array<{ name: string }>;
  fees: string;
  experience: string;
  languages: string[];
  clinic?: {
    name: string;
    address?: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  };
  video_consult: boolean;
  in_clinic: boolean;
}

export type ConsultationType = 'video' | 'in-clinic' | 'all';
export type SortType = 'fees' | 'experience' | null;

export interface FilterState {
  search: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortType;
} 