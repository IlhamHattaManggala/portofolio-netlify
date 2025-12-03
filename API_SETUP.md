# API Setup Guide

Project ini sekarang menggunakan data dinamis dari API Laravel dengan fallback ke data statik jika API tidak tersedia.

## Konfigurasi

1. Buat file `.env` di root project (copy dari `.env.example` jika ada):
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

2. Untuk production, ganti dengan URL API production:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

## Fitur

### 1. Data Dinamis dengan Fallback
- **Projects**: Mengambil dari `/api/v1/projects`
- **Technologies**: Mengambil dari `/api/v1/technologies`
- **Certificates**: Mengambil dari `/api/v1/certificates`
- **Messages**: Mengirim ke `/api/v1/messages` (fallback ke EmailJS)

### 2. Fallback Mechanism
Jika API tidak tersedia atau error:
- Otomatis menggunakan data statik dari `src/components/constant/index.ts`
- Menampilkan warning indicator di UI
- Aplikasi tetap berfungsi normal

### 3. Contact Form
Contact form akan:
1. Mencoba mengirim ke API Laravel terlebih dahulu
2. Jika gagal, fallback ke EmailJS (konfigurasi lama)

## Struktur File

```
src/
├── config/
│   └── api.ts              # Konfigurasi API
├── services/
│   └── api.ts              # Service untuk fetch data dari API
├── hooks/
│   └── usePortfolioData.ts # Custom hook untuk data portfolio
└── utils/
    └── iconMapper.ts       # Utility untuk mapping icon
```

## Cara Menggunakan

### Development
1. Pastikan Laravel API berjalan di `http://localhost:8000`
2. Set `VITE_API_BASE_URL` di `.env`
3. Jalankan `npm run dev`

### Production
1. Set `VITE_API_BASE_URL` ke URL production API
2. Build dengan `npm run build`
3. Deploy

## Testing Fallback

Untuk test fallback mechanism:
1. Matikan Laravel API server
2. Refresh halaman
3. Aplikasi akan otomatis menggunakan data statik
4. Warning indicator akan muncul di UI

## API Endpoints yang Digunakan

- `GET /api/v1/projects` - List semua projects
- `GET /api/v1/technologies` - List semua technologies
- `GET /api/v1/certificates` - List semua certificates
- `POST /api/v1/messages` - Submit contact message

## Catatan

- Data statik tetap ada sebagai fallback
- Icon technologies dari API akan menggunakan URL, sedangkan dari statik menggunakan import
- Semua komponen sudah diupdate untuk menggunakan hook `usePortfolioData`

