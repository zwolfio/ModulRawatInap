'use client';
import React, { useEffect, useMemo } from 'react';
import Pagination from './Pagination';
import Spinner from './ui/Spinner';
import { usePatientStore } from '@/store/patientStore';
import { fetchPatientsMock } from '@/lib/mock';
import { Patient } from '@/lib/types';

function sortPatients(items: Patient[], key: 'name' | 'admissionDate', dir: 'asc' | 'desc') {
  const sorted = [...items].sort((a, b) => {
    const va = key === 'name' ? a.name.toLowerCase() : a.admissionDate;
    const vb = key === 'name' ? b.name.toLowerCase() : b.admissionDate;
    if (va < vb) return -1;
    if (va > vb) return 1;
    return 0;
  });
  return dir === 'asc' ? sorted : sorted.reverse();
}

export default function PatientTable() {
  const { patients, loading, initialized, setLoading, setPatients, filters, setFilters } = usePatientStore();

  useEffect(() => {
    if (initialized && patients.length > 0) return;
    (async () => {
      setLoading(true);
      const data = await fetchPatientsMock();
      setPatients(data);
      setLoading(false);
    })();
  }, [initialized, patients.length, setLoading, setPatients]);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    let arr = patients;
    if (q) {
      arr = arr.filter((p) => p.name.toLowerCase().includes(q) || p.nik.includes(q));
    }
    arr = sortPatients(arr, filters.sortKey, filters.sortDir);
    return arr;
  }, [patients, filters.q, filters.sortDir, filters.sortKey]);

  const total = filtered.length;
  const start = (filters.page - 1) * filters.pageSize;
  const end = start + filters.pageSize;
  const pageItems = filtered.slice(start, end);

  useEffect(() => {
    setFilters({ page: 1 });
  }, [filters.q, filters.sortKey, filters.sortDir, setFilters]);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex gap-2 items-center">
          <label className="label m-0">Sort:</label>
          <select className="input w-44" value={filters.sortKey} onChange={(e) => setFilters({ sortKey: e.target.value as any })}>
            <option value="name">Nama</option>
            <option value="admissionDate">Tanggal</option>
          </select>
          <select className="input w-36" value={filters.sortDir} onChange={(e) => setFilters({ sortDir: e.target.value as any })}>
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </div>
        <a href="/patients/new" className="btn btn-primary">+ Pasien Masuk</a>
      </div>

      <div className="mb-4">
        <input className="input" placeholder="Cari nama/NIK..." value={filters.q}
          onChange={(e) => setFilters({ q: e.target.value })} />
      </div>

      {loading ? (
        <div className="flex items-center gap-3"><Spinner /><span>Memuat data pasien...</span></div>
      ) : pageItems.length === 0 ? (
        <div className="text-center p-10 text-gray-600">
          <p className="mb-2">Belum ada pasien atau pencarian tidak ditemukan.</p>
          <a href="/patients/new" className="btn btn-ghost">Tambah Pasien</a>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="border-b">
                <th className="th py-2">Nama</th>
                <th className="th py-2">NIK</th>
                <th className="th py-2">Diagnosa Masuk</th>
                <th className="th py-2">Tanggal Masuk</th>
                <th className="th py-2">Dokter PJ</th>
                <th className="th py-2">Ruangan</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="td py-2 font-medium">{p.name}</td>
                  <td className="td py-2">{p.nik}</td>
                  <td className="td py-2">{p.diagnosis}</td>
                  <td className="td py-2">{p.admissionDate}</td>
                  <td className="td py-2">{p.doctor}</td>
                  <td className="td py-2">{p.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4">
        <Pagination page={filters.page} pageSize={filters.pageSize} total={total} onPageChange={(p) => setFilters({ page: p })} />
      </div>
    </div>
  );
}
