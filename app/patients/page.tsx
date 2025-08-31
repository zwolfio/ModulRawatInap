'use client';
import React from 'react';
import PatientTable from '@/components/PatientTable';

export default function PatientsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Daftar Pasien Aktif</h1>
      <PatientTable />
    </div>
  );
}
