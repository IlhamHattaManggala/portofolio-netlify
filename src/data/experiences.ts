import type { TExperience } from "../components/types";

const experiences: TExperience[] = [
  {
    id: 1,
    company: "Himpunan Mahasiswa Prodi Teknik Informatika",
    position: "Divisi Kewirausahaan",
    description: "Mengelola dan mengembangkan program kewirausahaan bagi anggota himpunan. Mengelola keuangan bisnis dan melaporkan serta menyiapkan laporan keuangan sederhana.",
    start_date: "2023-01-16", // Estimasi tanggal berdasarkan "Published at 2025" di blog
    end_date: "2024-01-16",
    is_current: false,
    location: "Tegal, Jawa Tengah, Indonesia"
  },
  {
    id: 2,
    company: "IT Solution Yogyakarta",
    position: "Programmer Intern",
    description: "Mengembangkan berbagai fitur web & mobile (CRUD, autentikasi, notifikasi, dashboard, UI/UX). Merancang struktur database dan menyesuaikan alur aplikasi sesuai kebutuhan sistem. Mengembangkan dan mengintegrasikan API untuk proses login, reset password, program, dan laporan. Melakukan debugging, perbaikan bug, serta pengujian fungsional aplikasi. Melakukan integrasi notifikasi server/Firebase dan menyesuaikan payment gateway. Membuat dokumentasi API, panduan penggunaan, serta membantu build dan deployment aplikasi.",
    start_date: "2025-08-04",
    end_date: "2025-11-15",
    is_current: false,
    location: "Yogyakarta, Indonesia"
  }
];

export default experiences;
