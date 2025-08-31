'use client';
import React from 'react';
import PatientForm from '@/components/PatientForm';

export default function NewPatientPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Formulir Pasien Masuk</h1>
      <div className="card p-4">
        <PatientForm />
      </div>
    </div>
  );
}
