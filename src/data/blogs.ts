
import type { TArticle } from "../components/types";
import { juara2, magangIT, ReactHeader, TailwindHeader, TypescriptHeader } from "../assets";

const blogs: TArticle[] = [
  {
    id: 1,
    title: "Memahami Dasar-Dasar React Hooks",
    slug: "memahami-dasar-dasar-react-hooks",
    excerpt: "Panduan lengkap untuk pemula dalam memahami dan menggunakan React Hooks seperti useState dan useEffect.",
    content: `
# Memahami Dasar-Dasar React Hooks

React Hooks adalah fitur baru di React 16.8 yang memungkinkan Anda menggunakan state dan fitur React lainnya tanpa menulis kelas.

## Apa itu Hooks?

Hooks adalah fungsi yang membiarkan Anda "mengaitkan" (hook into) state dan fitur lifecycle React dari function components. Hooks tidak bisa digunakan di dalam class.

### useState

useState adalah Hook yang memungkinkan Anda menambahkan state React ke function components.

\`\`\`jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect

useEffect memungkinkan Anda melakukan efek samping (side effects) dalam function components. Ini mirip dengan componentDidMount, componentDidUpdate, dan componentWillUnmount dalam class React.

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
`,
    featured_image: ReactHeader,
    meta_title: "Memahami Dasar-Dasar React Hooks",
    meta_description: "Panduan lengkap React Hooks untuk pemula",
    meta_keywords: "react, hooks, javascript, frontend",
    is_published: true,
    published_at: "2024-01-15 08:00:00",
    views: 0,
    created_at: "2024-01-10 09:00:00",
    updated_at: "2024-01-15 08:00:00"
  },
  {
    id: 2,
    title: "Tutorial Tailwind CSS untuk Pemula",
    slug: "tutorial-tailwind-css-untuk-pemula",
    excerpt: "Cara cepat membuat tampilan website yang modern dan responsif menggunakan utility-first CSS framework, Tailwind CSS.",
    content: `
# Tutorial Tailwind CSS untuk Pemula

Tailwind CSS adalah framework CSS utility-first yang memungkinkan Anda membangun desain kustom dengan cepat tanpa harus meninggalkan HTML Anda.

## Mengapa Tailwind CSS?

1. **Utility-First**: Membangun desain kompleks dari utilitas dasar.
2. **Responsif**: Sangat mudah membuat desain responsif.
3. **Kustomisasi**: Mudah dikonfigurasi sesuai kebutuhan desain Anda.

## Contoh Penggunaan

\`\`\`html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
\`\`\`
`,
    featured_image: TailwindHeader,
    meta_title: "Tutorial Tailwind CSS Lengkap",
    meta_description: "Belajar Tailwind CSS dari nol",
    meta_keywords: "tailwind, css, web design",
    is_published: true,
    published_at: "2024-02-01 10:00:00",
    views: 0,
    created_at: "2024-01-28 14:00:00",
    updated_at: "2024-02-01 10:00:00"
  },
  {
    id: 3,
    title: "Mengapa TypeScript Penting untuk Project Besar",
    slug: "mengapa-typescript-penting",
    excerpt: "Alasan mengapa banyak developer beralih ke TypeScript untuk meningkatkan produktivitas dan mengurangi bug dalam pengembangan aplikasi.",
    content: `
# Mengapa TypeScript Penting?

TypeScript adalah superset dari JavaScript yang menambahkan static typing opsional ke dalam bahasa tersebut.

## Keuntungan TypeScript

1. **Static Typing**: Menangkap error saat compile-time, bukan run-time.
2. **IntelliSense**: Autocomplete dan navigasi kode yang lebih baik.
3. **Readability**: Tipe data bertindak sebagai dokumentasi yang selalu update.

## Contoh Kode

\`\`\`typescript
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
\`\`\`
`,
    featured_image: TypescriptHeader,
    meta_title: "Pentingnya TypeScript",
    meta_description: "Manfaat TypeScript untuk software development",
    meta_keywords: "typescript, javascript, programming",
    is_published: true,
    published_at: "2024-03-10 13:00:00",
    views: 0,
    created_at: "2024-03-05 11:30:00",
    updated_at: "2024-03-10 13:00:00"
  },
  {
    id: 4,
    title: "Pengalaman Meraih Juara 2 Software Development",
    slug: "pengalaman-meraih-juara-2-software-development",
    excerpt: "Pengalaman saya bersama tim meraih Juara 2 Software Development dalam ajang CODE 5.0 Competition. Sebuah perjalanan berharga yang memberikan pembelajaran tentang teamwork, inovasi, dan presentasi proyek.",
    content: "Pada bulan Agustus lalu saya bersama dua rekan satu tim mengikuti ajang CODE 5.0 Competition dalam kategori Software Development. Perlombaan ini menjadi salah satu pengalaman yang sangat berharga bagi perjalanan akademik dan pengembangan diri saya di dunia teknologi. Awalnya kami mengikuti kompetisi ini dengan tujuan sederhana untuk menambah pengalaman, belajar hal baru, dan mencoba menantang kemampuan kami di luar ruang kelas. Tanpa target muluk-muluk kami ingin melihat sejauh mana karya kami mampu bersaing dengan ide peserta lainnya. Namun proses yang kami lalui justru memberikan hasil yang membanggakan karena proyek yang kami kembangkan berhasil membawa kami meraih Juara 2 Software Development sekaligus mendapatkan hadiah sebesar Rp 1.350.000. Prestasi ini terasa sangat berarti karena seluruh peserta berasal dari berbagai kampus dan latar belakang berbeda. Banyak karya impresif yang dipresentasikan sehingga bisa masuk ke jajaran pemenang benar-benar menjadi sebuah pencapaian luar biasa bagi kami. Selain prestasi tersebut kami juga belajar banyak hal mulai dari cara menyusun presentasi proyek dengan jelas, mengatur waktu pengembangan, memahami kebutuhan pengguna dalam desain sistem, hingga meningkatkan kemampuan komunikasi antar anggota tim. Proyek yang kami bawa berjudul SENJA Sistem Monitoring Pembelajaran Gerakan Tari Berbasis Teknologi yang awalnya kami kembangkan sebagai tugas akhir semester. Proyek ini menggabungkan teknologi dengan unsur seni budaya sebagai bentuk inovasi dalam dunia pendidikan. Pengalaman mengikuti event ini membuat saya semakin yakin untuk terus membangun karya digital, memperdalam kemampuan software development, dan memperluas jejaring dengan para pegiat teknologi lainnya. Terima kasih kepada tim, pembimbing, dan seluruh pihak yang terlibat dalam kompetisi ini. Semoga pencapaian ini menjadi langkah awal untuk keberhasilan berikutnya di masa depan.",
    featured_image: juara2,
    meta_title: "Pengalaman Meraih Juara 2 Software Development",
    meta_description: "Blog tentang pengalaman meraih Juara 2 Software Development di CODE 5.0 Competition bersama tim. Kisah kompetisi, pembelajaran, serta pengembangan proyek SENJA Sistem Monitoring Pembelajaran Gerakan Tari.",
    meta_keywords: "software development competition, juara 2 software development, pengalaman lomba IT, CODE 5.0 competition, portfolio software development, SENJA project, pengalaman mahasiswa IT",
    is_published: true,
    published_at: "2025-12-30 12:00:00",
    views: 0,
    created_at: "2025-12-30 12:00:00",
    updated_at: "2025-12-30 12:00:00"
  },
  {
    id: 5,
    title: "Pengalaman Magang di IT Solution",
    slug: "pengalaman-magang-di-it-solution",
    excerpt: "Pengalaman saya menjalani magang di IT Solution yang memberikan banyak pelajaran berharga tentang dunia kerja, pengembangan software, teamwork, dan lingkungan profesional yang sesungguhnya.",
    content: "Salah satu momen yang paling membanggakan adalah ketika angkatan magang kami mendapatkan penghargaan dari IT Solution sebagai angkatan terbaik. Pengakuan ini diberikan setelah membandingkan kontribusi dan performa angkatan kami dengan beberapa angkatan magang sebelumnya. Penghargaan tersebut menjadi pengalaman yang sangat berarti dan membuktikan bahwa kerja keras, kedisiplinan, serta kualitas pelaksanaan program magang diapresiasi dengan sangat baik oleh pihak perusahaan.",
    featured_image: magangIT,
    meta_title: "Pengalaman Magang di IT Solution",
    meta_description: "Blog tentang pengalaman magang di IT Solution yang memberikan banyak pelajaran berharga tentang dunia kerja, pengembangan software, teamwork, dan lingkungan profesional yang sesungguhnya.",
    meta_keywords: "magang, it solution, pengalaman magang, pengalaman kerja, pengembangan software, teamwork, lingkungan profesional",
    is_published: true,
    published_at: "2025-12-30 12:00:00",
    views: 0,
    created_at: "2025-12-30 12:00:00",
    updated_at: "2025-12-30 12:00:00"
  }
];

export default blogs;
