'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Patient, SortDir, SortKey } from '@/lib/types';

export type PatientFilters = {
  q: string; // search by name or NIK
  sortKey: SortKey;
  sortDir: SortDir;
  page: number;
  pageSize: number;
};

export type PatientState = {
  patients: Patient[];
  loading: boolean;
  initialized: boolean;
  filters: PatientFilters;
  setLoading: (v: boolean) => void;
  setPatients: (p: Patient[]) => void;
  addPatient: (p: Patient) => void;
  setFilters: (f: Partial<PatientFilters>) => void;
  resetFilters: () => void;
};

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patients: [],
      loading: false,
      initialized: false,
      filters: {
        q: '',
        sortKey: 'admissionDate',
        sortDir: 'desc',
        page: 1,
        pageSize: 10,
      },
      setLoading: (v) => set({ loading: v }),
      setPatients: (p) => set({ patients: p, initialized: true }),
      addPatient: (p) => set((s) => ({ patients: [p, ...s.patients] })),
      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
      resetFilters: () => set({
        filters: { q: '', sortKey: 'admissionDate', sortDir: 'desc', page: 1, pageSize: 10 }
      })
    }),
    { name: 'patient-store' }
  )
);
