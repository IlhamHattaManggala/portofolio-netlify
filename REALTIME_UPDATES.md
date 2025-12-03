# Real-Time Updates (Auto-Refresh)

Fitur ini memungkinkan frontend untuk secara otomatis memperbarui data dari backend tanpa perlu refresh halaman manual.

## Cara Kerja

Sistem menggunakan **Polling** untuk secara periodik mengambil data terbaru dari API. Data akan otomatis diperbarui di frontend ketika ada perubahan di backend.

## Data yang Di-Update Otomatis

### 1. Portfolio Data (10 detik)
- **Projects** - Proyek portfolio
- **Technologies** - Teknologi yang digunakan
- **Certificates** - Sertifikat

### 2. Testimonials (10 detik)
- Testimoni dari klien

### 3. Experiences (10 detik)
- Pengalaman kerja/profesional

### 4. Articles/Blog (10 detik)
- Artikel dan blog posts

### 5. Settings (30 detik)
- Logo, site name, resume PDF
- Footer description
- Email, LinkedIn URL

## Konfigurasi

### Environment Variables

Tambahkan ke file `.env`:

```env
# Polling Configuration
VITE_POLLING_ENABLED=true          # Aktifkan/matikan polling (default: true)
VITE_POLLING_INTERVAL=10000         # Interval polling dalam milliseconds (default: 10000 = 10 detik)
```

### Contoh Konfigurasi

```env
# Polling setiap 5 detik (lebih cepat, lebih banyak request)
VITE_POLLING_INTERVAL=5000

# Polling setiap 30 detik (lebih lambat, lebih sedikit request)
VITE_POLLING_INTERVAL=30000

# Matikan polling
VITE_POLLING_ENABLED=false
```

## Penggunaan

### Di Komponen React

```typescript
import { usePolling } from '../hooks/usePolling';
import { POLLING_INTERVAL, POLLING_ENABLED } from '../config/api';

const MyComponent = () => {
  const loadData = async () => {
    // Fetch data dari API
    const data = await fetchData();
    setData(data);
  };

  useEffect(() => {
    loadData(); // Initial load
  }, []);

  // Setup polling
  usePolling({
    enabled: POLLING_ENABLED,
    interval: POLLING_INTERVAL,
    onPoll: loadData,
  });

  return <div>...</div>;
};
```

### Custom Interval

```typescript
// Polling dengan interval custom (30 detik)
usePolling({
  enabled: true,
  interval: 30000,
  onPoll: loadData,
});
```

## Performa

### Optimasi

1. **Polling hanya aktif saat halaman terlihat** - Polling otomatis berhenti saat tab tidak aktif (dengan `Page Visibility API`)
2. **Interval yang wajar** - Default 10 detik sudah cukup untuk kebanyakan use case
3. **Error handling** - Jika API error, polling tetap berjalan tanpa mengganggu user experience

### Rekomendasi Interval

- **Data yang sering berubah**: 5-10 detik (Projects, Testimonials, Articles)
- **Data yang jarang berubah**: 30-60 detik (Settings)
- **Production**: 10-30 detik (balance antara real-time dan performa)

## Troubleshooting

### Polling tidak berjalan

1. Cek `VITE_POLLING_ENABLED` di `.env` - pastikan `true`
2. Cek console browser untuk error
3. Pastikan API endpoint tersedia dan merespons

### Terlalu banyak request

1. Tingkatkan `VITE_POLLING_INTERVAL` (misalnya ke 30000 untuk 30 detik)
2. Atau matikan polling dengan `VITE_POLLING_ENABLED=false`

### Data tidak ter-update

1. Cek network tab di browser DevTools untuk melihat request API
2. Pastikan backend mengembalikan data terbaru
3. Cek console untuk error messages

## Catatan

- Polling akan otomatis berhenti saat halaman tidak terlihat (tab tidak aktif)
- Polling tidak akan berjalan jika API menggunakan fallback data (static data)
- Untuk production, pertimbangkan menggunakan WebSockets untuk real-time yang lebih efisien

