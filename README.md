
# 🏥 Modul Rawat Inap – Pasien Masuk  

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)  
![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react&logoColor=white)  

> 💡 Mini project simulasi **Modul Rawat Inap**: pasien masuk, daftar pasien, sorting, search, pagination, dan router sederhana.  
> Dibangun dengan **Next.js (App Router) + TypeScript + TailwindCSS + Zustand**.  

---

## Menjalankan Proyek

```bash
pnpm install # atau npm install / yarn
pnpm dev     # atau npm run dev / yarn dev
```

Bisa langsung Buka: http://localhost:3000

## Fitur
- Formulir Pasien Masuk (validasi: required, NIK 16 digit)
- Daftar Pasien Aktif (mock data + delay 500ms)
- Sorting (Nama / Tanggal Masuk)
- Search (Nama / NIK)
- Pagination
- Loading state & Empty state
- Router: `/patients` ↔ `/patients/new`

## Catatan Teknis
- Tipe ketat (no `any`).
- Komponen reusable: InputField, SelectField, Pagination, Spinner.
- State global via Zustand (persist `localStorage`).
- Styling sederhana & rapi dengan Tailwind.

## Preview (Mockup)
-  Pasien Masuk
![alt text](Preview_patientForm.png)

- Daftar Pasien Aktif
![alt text](Preview_patientList.png)

## 🧑‍💻 Stack

-- Next.js (App Router) → routing modern dan file-based
-- TypeScript → tipe ketat, aman dari any liar
-- TailwindCSS → styling cepat & konsisten
-- Zustand → state management ringan, persisten di localStorage