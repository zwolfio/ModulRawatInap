import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Modul Rawat Inap – Pasien Masuk',
  description: 'Demo Next.js + TS + Tailwind + Zustand',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white border-b">
          <div className="container-narrow py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-semibold">🏥 Rawat Inap</a>
            <nav className="flex gap-3 text-sm">
              <a className="btn btn-ghost" href="/patients">Daftar Pasien</a>
              <a className="btn btn-primary" href="/patients/new">Pasien Masuk</a>
            </nav>
          </div>
        </header>
        <main className="container-narrow py-6">{children}</main>
      </body>
    </html>
  );
}
