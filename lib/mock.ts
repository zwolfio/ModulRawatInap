import { Patient } from './types';

const NAMES = ['Andi', 'Budi', 'Citra', 'Dewi', 'Eka', 'Farhan', 'Gita', 'Hadi'];
const DIAG = ['Demam Dengue', 'Gastroenteritis', 'ISPA', 'Hipertensi'];
const DOCS = ['dr. Sari', 'dr. Putra', 'dr. Kevin', 'dr. Maya'];
const ROOMS = ['Mawar-101', 'Melati-202', 'Anggrek-303', 'Cempaka-404'];

function randomDate(start: Date, end: Date) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().slice(0, 10);
}

export function seedPatients(count = 18): Patient[] {
  return Array.from({ length: count }, (_, i) => {
    const name = NAMES[i % NAMES.length] + ' ' + String.fromCharCode(65 + (i % 26));
    const nik = (1000000000000000n + BigInt(i)).toString();
    const diagnosis = String(DIAG[i % DIAG.length]);
    const admissionDate = randomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ).toString();
    const doctor = String(DOCS[i % DOCS.length]);
    const room = String(ROOMS[i % ROOMS.length]);
    return { id: crypto.randomUUID(), name, nik, diagnosis, admissionDate, doctor, room };
  });
}

export async function fetchPatientsMock(): Promise<Patient[]> {
  // Delay 500ms agar bisa test loading state
  await new Promise((res) => setTimeout(res, 500));
  return seedPatients(24);
}
