'use client';
import React from 'react';
import InputField from './ui/InputField';

type Props = {
  q: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ q, onChange }: Props) {
  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1">
        <InputField label="Cari (Nama/NIK)" placeholder="mis. Andi / 3510..." value={q}
          onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}
