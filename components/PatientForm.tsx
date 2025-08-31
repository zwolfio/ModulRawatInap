'use client';
import React, { useMemo, useState } from 'react';
import InputField from './ui/InputField';
import SelectField from './ui/SelectField';
import Spinner from './ui/Spinner';
import { Patient } from '@/lib/types';
import { usePatientStore } from '@/store/patientStore';
import { useRouter } from 'next/navigation';

const DOCTORS = ['dr. Sari', 'dr. Putra', 'dr. Kevin', 'dr. Maya'];
const ROOMS = ['Mawar-101', 'Melati-202', 'Anggrek-303', 'Cempaka-404'];

export default function PatientForm() {
  const addPatient = usePatientStore((s) => s.addPatient);
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    nik: '',
    diagnosis: '',
    admissionDate: new Date().toISOString().slice(0, 10),
    doctor: '',
    room: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.nik.trim()) e.nik = 'NIK wajib diisi';
    if (form.nik && !/^\d{16}$/.test(form.nik)) e.nik = 'NIK harus 16 digit angka';
    if (!form.diagnosis.trim()) e.diagnosis = 'Diagnosa masuk wajib diisi';
    if (!form.admissionDate) e.admissionDate = 'Tanggal masuk wajib diisi';
    if (!form.doctor) e.doctor = 'Dokter wajib dipilih';
    if (!form.room) e.room = 'Ruangan wajib dipilih';
    return e;
  }, [form]);

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, nik: true, diagnosis: true, admissionDate: true, doctor: true, room: true });
    if (Object.keys(errors).length > 0) return;
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 500));
    const newPatient: Patient = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      nik: form.nik.trim(),
      diagnosis: form.diagnosis.trim(),
      admissionDate: form.admissionDate,
      doctor: form.doctor,
      room: form.room
    };
    addPatient(newPatient);
    setSubmitting(false);
    router.push('/patients');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Nama" placeholder="mis. Andi Saputra" value={form.name}
          onChange={handleChange('name')} error={touched.name ? errors.name : undefined} />
        <InputField label="NIK" placeholder="16 digit" value={form.nik} maxLength={16}
          onChange={handleChange('nik')} error={touched.nik ? errors.nik : undefined}
          hint="Wajib 16 digit angka" />
        <InputField label="Diagnosa Masuk" placeholder="mis. Demam Dengue" value={form.diagnosis}
          onChange={handleChange('diagnosis')} error={touched.diagnosis ? errors.diagnosis : undefined} />
        <InputField label="Tanggal Masuk" type="date" value={form.admissionDate}
          onChange={handleChange('admissionDate')} error={touched.admissionDate ? errors.admissionDate : undefined} />
        <SelectField label="Dokter Penanggung Jawab" value={form.doctor} onChange={handleChange('doctor')}
          options={DOCTORS.map((d) => ({ label: d, value: d }))}
          error={touched.doctor ? errors.doctor : undefined} />
        <SelectField label="Ruangan" value={form.room} onChange={handleChange('room')}
          options={ROOMS.map((r) => ({ label: r, value: r }))}
          error={touched.room ? errors.room : undefined} />
      </div>

      <div className="flex items-center gap-3">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? (<><Spinner /> <span className="ml-2">Menyimpan...</span></>) : 'Simpan' }
        </button>
        <a className="btn btn-ghost" href="/patients">Batal</a>
      </div>
    </form>
  );
}
