# 🚨 Website Emergency Form

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Formulir kontak darurat yang responsif dengan deteksi perangkat canggih dan pengumpulan data otomatis ke Google Sheets.

## 🌟 Fitur Utama

- **📱 Desain Responsif**: Bekerja sempurna di desktop, tablet, dan perangkat mobile
- **🔍 Deteksi Canggih**: Otomatis menangkap informasi IP, Network, Device, dan Platform
- **📍 Geolokasi**: Pelacakan lokasi GPS dengan izin pengguna
- **📊 Integrasi Google Sheets**: Penyimpanan data real-time ke Google Spreadsheet
- **⏰ Zona Waktu Jakarta**: Timestamp otomatis dalam WIB (Waktu Indonesia Barat)
- **✅ Validasi Form**: Validasi sisi klien dengan feedback real-time
- **🎨 UI Modern**: Desain gradient yang indah dengan animasi halus

## 🚀 Demo

[Live Demo](https://emergency-website.netlify.app/) <!-- Ganti dengan URL Netlify Anda -->

## 📊 Pengumpulan Data

Form ini mengumpulkan informasi berikut:

### Data Input Pengguna
- **Nama Anda** (Wajib diisi)
- **Identitas Anda** (Wajib diisi): Family, Friends, Co-Workers, atau Outsiders
- **Buktikan Bahwa Kita Saling Kenal** (Wajib diisi): 10-1000 karakter
- **Nomor Telepon** (Wajib diisi)
- **Alamat Email** (Wajib diisi)
- **Kota** (Wajib diisi)
- **Alasan Menghubungi** (Wajib diisi): 10-1000 karakter

### Data yang Dikumpulkan Otomatis
- **Timestamp**: Zona waktu Jakarta (WIB)
- **Geolokasi**: Koordinat GPS (dengan izin)
- **URL Lokasi**: Link Google Maps
- **Alamat IP**: IP publik pengguna
- **Network**: Jenis koneksi dan kecepatan
- **Device**: Mobile, Tablet, atau Desktop
- **Platform**: Sistem Operasi dan Browser

## 🗂️ Struktur Google Sheets

Data disimpan dalam kolom-kolom berikut:

| Kolom | Field | Deskripsi |
|-------|-------|-----------|
| A | YourName | Nama lengkap pengguna |
| B | YourIdentity | Kategori hubungan |
| C | ProveThatWeKnowEachOther | Teks verifikasi |
| D | YourPhoneNumber | Nomor telepon kontak |
| E | YourEmail | Alamat email |
| F | YourCity | Kota pengguna |
| G | Whatisyourreasonforcontactingme | Alasan menghubungi |
| H | Timestamp | Waktu submit (WIB) |
| I | Geolocation | Koordinat GPS |
| J | Location_URL | Link Google Maps |
| K | IP_Address | Alamat IP pengguna |
| L | Network | Info koneksi jaringan |
| M | Device | Jenis perangkat |
| N | Platform | OS dan browser |

## 🛠️ Panduan Setup

### 1. Setup Google Sheets

1. Buat Google Spreadsheet baru
2. Catat ID Spreadsheet dari URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
3. Ganti `SPREADSHEET_ID` di Google Apps Script

### 2. Setup Google Apps Script

1. Kunjungi [Google Apps Script](https://script.google.com)
2. Buat project baru
3. Ganti kode default dengan file `script.gs` yang disediakan
4. Update variabel `SPREADSHEET_ID`
5. Deploy sebagai web app:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Salin URL deployment

### 3. Setup Frontend

1. Clone repository ini:
   ```bash
   git clone https://github.com/yourusername/emergency-website.git
   cd emergency-website
   ```

2. Update `scriptURL` di `index.html` dengan URL Google Apps Script Anda:
   ```javascript
   const scriptURL = 'URL_GOOGLE_APPS_SCRIPT_ANDA';
   ```

3. Deploy ke Netlify:
   - Hubungkan repository GitHub ke Netlify
   - Set build command: (kosongkan untuk static site)
   - Set publish directory: `/` (root directory)

## 📁 Struktur File

```
emergency-website/
├── index.html          # File HTML utama dengan CSS dan JavaScript
├── script.gs          # Google Apps Script untuk menangani form submission
├── README.md          # File ini
└── .gitignore         # Git ignore file
```

## 🔧 Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **Hosting**: Netlify
- **API yang Digunakan**: 
  - Geolocation API
  - API Deteksi IP (ipify.org, httpbin.org, my-ip.io)
  - Navigator API untuk deteksi perangkat

## 🎨 Fitur Desain

- **Background Gradient Modern**: Gradient teal ke dark teal
- **Efek Glass Morphism**: Container semi-transparan dengan backdrop blur
- **Animasi Halus**: Efek hover dan animasi loading
- **Layout Responsif**: Pendekatan mobile-first design
- **Error Handling**: Validasi real-time dengan pesan yang user-friendly

## 🔒 Privasi & Keamanan

- **Geolokasi**: Hanya dikumpulkan dengan izin eksplisit pengguna
- **Deteksi IP**: Menggunakan layanan deteksi IP publik
- **Penyimpanan Data**: Tersimpan aman di Google Sheets
- **Tanpa Tracking**: Tidak ada analytics atau tracking script pihak ketiga

## 📱 Kompatibilitas Browser

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Deployment Netlify

1. Fork repository ini
2. Hubungkan ke Netlify
3. Update URL Google Apps Script
4. Deploy!

### Deployment Manual

1. Download file-file
2. Update `scriptURL` di `index.html`
3. Upload ke layanan hosting static manapun

## 🧪 Testing

### Test Koneksi Google Apps Script

Kunjungi URL Google Apps Script Anda dengan parameter `?test=true`:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?test=true
```

### Testing Lokal

1. Buka `index.html` di browser
2. Isi form
3. Periksa browser console untuk informasi debug
4. Verifikasi data muncul di Google Sheet Anda

## 🐛 Troubleshooting

### Masalah Umum

1. **Form submission gagal**
   - Periksa URL deployment Google Apps Script
   - Pastikan script memiliki permission yang tepat
   - Periksa browser console untuk error

2. **Geolokasi tidak bekerja**
   - Pastikan koneksi HTTPS (diperlukan untuk geolokasi)
   - Periksa permission browser

3. **Deteksi IP gagal**
   - Multiple fallback service digunakan
   - Periksa konektivitas jaringan

### Mode Debug

Aktifkan console logging dengan membuka browser developer tools (F12) untuk melihat proses submission secara detail.

## 📄 Lisensi

Project ini dilisensikan under MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/fitur-menakjubkan`)
3. Commit perubahan Anda (`git commit -m 'Tambah fitur menakjubkan'`)
4. Push ke branch (`git push origin feature/fitur-menakjubkan`)
5. Buka Pull Request

## 📞 Dukungan

Jika Anda mengalami masalah atau memiliki pertanyaan:

1. Periksa halaman [Issues](https://github.com/yourusername/emergency-website/issues)
2. Buat issue baru dengan deskripsi detail
3. Sertakan log browser console jika ada

## 📈 Analytics

Form otomatis mengumpulkan analytics berikut:

- **Demografi Pengguna**: Informasi lokasi dan perangkat
- **Metrik Teknis**: Kecepatan jaringan, kemampuan perangkat
- **Pola Submission**: Analisis timestamp dan frekuensi

## 🔄 Update

### Versi 2.0 (Terbaru)
- ✅ Menambahkan deteksi alamat IP
- ✅ Menambahkan informasi jaringan
- ✅ Menambahkan deteksi jenis perangkat
- ✅ Menambahkan deteksi platform/browser
- ✅ Meningkatkan integrasi Google Sheets
- ✅ Memperbaiki error handling

### Versi 1.0
- ✅ Fungsionalitas form dasar
- ✅ Integrasi Google Sheets
- ✅ Deteksi geolokasi
- ✅ Validasi form

## 🎯 Roadmap Fitur Mendatang

- [ ] Dashboard analytics untuk melihat data submission
- [ ] Export data ke format CSV/Excel
- [ ] Notifikasi email otomatis saat ada submission baru
- [ ] Multi-language support
- [ ] Dark mode toggle

## 📞 Kontak Developer

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Netlify untuk hosting gratis
- Google Apps Script untuk backend solution
- Komunitas developer Indonesia

---

**Dibuat dengan ❤️ untuk Lomba Google Frontend Developer**

*Terakhir diupdate: 31 Agustus 2025*
