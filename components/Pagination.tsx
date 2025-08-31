'use client';
import React from 'react';
import { clsx } from 'clsx';

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="text-sm text-gray-600">Halaman {page} dari {totalPages} • Total {total}</div>
      <div className="flex gap-2">
        <button className={clsx('btn btn-ghost', !canPrev && 'opacity-50 cursor-not-allowed')} disabled={!canPrev}
          onClick={() => canPrev && onPageChange(page - 1)}>Sebelumnya</button>
        <button className={clsx('btn btn-primary', !canNext && 'opacity-50 cursor-not-allowed')} disabled={!canNext}
          onClick={() => canNext && onPageChange(page + 1)}>Berikutnya</button>
      </div>
    </div>
  );
}
