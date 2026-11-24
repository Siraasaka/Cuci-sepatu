# cucisepatu

Halaman profil layanan cuci sepatu satu halaman: pengunjung memilih layanan atau paket, melihat estimasi pengerjaan, lalu melanjutkan pemesanan lewat WhatsApp. Semua konten berasal dari satu objek konfigurasi di dalam `index.html`; tidak ada server, database, atau build step.

## Tujuan

- Menjelaskan layanan dan harga cuci sepatu secara ringkas dan mudah dipindai.
- Mengarahkan calon pelanggan ke WhatsApp dengan pesan yang sudah terisi (layanan, paket, jenis sepatu, jumlah pasang, catatan).
- Menampilkan estimasi pengerjaan per kategori sepatu, lokasi, jam operasional, dan FAQ.

## Fitur

- **Hero + ringkasan layanan** dengan gambar sepatu dan catatan singkat.
- **Layanan dan harga**: tiga kartu layanan hasil render dari `CONFIG.services` (Fast Clean Rp25.000, Deep Clean Rp40.000, Premium Clean Rp60.000 per pasang) beserta daftar cakupan perawatan.
- **Tabel estimasi pengerjaan** (`CONFIG.estimates`): 4 kategori sepatu × 3 layanan, dirender ke `<tbody id="estimateRows">`.
- **Paket hemat** (`CONFIG.packages`): Paket Berdua (2 pasang, Rp70.000), Paket Hemat (3 pasang, Rp100.000), Paket Rutin (4 pasang, Rp85.000), lengkap dengan hitungan "setara per pasang".
- **Pemesanan lewat modal**: form jenis sepatu, jumlah pasang, dan catatan; tombol submit menyusun teks pesan lalu membuka `https://wa.me/<nomor>`.
- **Tombol WhatsApp otomatis** untuk semua elemen `[data-wa-general]` (navbar, hero, CTA, footer, tombol mengambang).
- **Slider perbandingan sebelum/sesudah** (`input[type=range]` menggeser `--split` pada frame).
- **Lokasi & jam operasional**: tabel jam dari `CONFIG.hours` dengan penanda "hari ini", embed Google Maps (atau peta fallback bila `CONFIG.mapEmbedUrl` kosong) dan tautan buka Maps.
- **FAQ akordeon**, **menu navigasi mobile**, dan **animasi GSAP/ScrollTrigger opsional** yang tidak memblokir konten bila CDN gagal dimuat; `prefers-reduced-motion` dihormati.

## Stack

- **HTML + CSS + JavaScript vanilla** dalam satu file `index.html`; CSS dan script ditulis inline (tanpa bundler, tanpa framework, tanpa TypeScript).
- **Tanpa dependency npm**: tidak ada `package.json`, lockfile, atau `node_modules`.
- **Aset lokal**: `cucisepatu-hero.png`, `sepatu_kotor.png`, `sepatu_bersih.webp`, `favicon.svg`.
- **Sumber eksternal saat runtime**:
  - Google Fonts (Plus Jakarta Sans).
  - GSAP 3.12.5 + ScrollTrigger 3.12.5 dari cdnjs, dipasang `integrity` (SRI sha384) + `crossOrigin="anonymous"` dan dimuat hanya jika pengguna tidak meminta reduced motion.
  - `rupato.com` (gambar ilustrasi) dan `cdn.jsdelivr.net` (ikon WhatsApp pada tombol mengambang).
  - Google Maps embed untuk peta.

## Cara instal

Tidak ada langkah instalasi dependency. Cukup salin folder proyek lalu sajikan sebagai berkas statis:

```bash
git clone https://github.com/Siraasaka/Cuci-sepatu.git
cd Cuci-sepatu
python3 -m http.server 3000
```

Buka `http://localhost:3000`. Server statis lain (mis. `npx serve`, Live Server) juga bisa; jangan membuka `index.html` lewat `file://` jika ingin peta dan tautan bekerja normal.

Sebelum dipakai sebagai situs nyata, lengkapi `CONFIG` di bagian atas `<script>`:

- `whatsappNumber` (saat ini placeholder `62XXXXXXXXXX`, format `62…` tanpa `+` dan tanpa spasi). Selama masih placeholder, submit form menampilkan `alert` dan tidak membuka WhatsApp.
- `address` dan `mapEmbedUrl` (saat ini placeholder/ kosong; peta memakai fallback pencarian Google Maps).
- `services`, `estimates`, `packages`, `hours` sesuai harga dan jam yang berlaku.

## Cara test

Dua skrip pemeriksaan berbasis Node (tanpa dependency, Node 18+):

```bash
node tests/security-check.mjs    # setiap script eksternal wajib punya SRI + crossOrigin
node tests/regression-check.mjs  # struktur halaman, sintaks script, kelengkapan layanan
```

- `tests/security-check.mjs` memindai `index.html`, memeriksa semua `<script src>` dan injeksi dinamis `var.src="https://…"`, lalu gagal (exit 1) jika ada yang tanpa `integrity`, tanpa `crossOrigin="anonymous"`, atau dimuat lewat HTTP. Hasil saat ini: PASS.
- `tests/regression-check.mjs` memastikan tidak ada sisa kode filter layanan (`service-tabs`, `data-service-tab`, `data-service-card`), CSS seimbang, jumlah `@media` tetap 9, sintaks inline script valid (via `vm.Script`), dan `CONFIG.services` masih berisi tiga layanan.

Keduanya pemeriksaan statis terhadap berkas HTML/JS. Tidak ada test browser, test render visual, atau end-to-end test — interaksi (modal, akordeon, slider, animasi) belum tercakup otomatis.

## Cara build

Tidak ada build step. `index.html` adalah artefak akhir yang disajikan apa adanya; tidak ada transpile, minify, atau bundling yang perlu dijalankan. Setelah mengubah `index.html` atau aset, cukup refresh browser.

## Deployment

- Unggah berkas statis: `index.html`, `favicon.svg`, `cucisepatu-hero.png`, `sepatu_kotor.png`, `sepatu_bersih.webp`.
- **Jangan** ikut mengunggah folder `tests/` (dan `preview-server.log` bila ada) ke direktori publik.
- Tidak ada konfigurasi deployment, environment variable, atau secret di repo ini — semua konfigurasi bisnis berada di `CONFIG` dan bersifat publik.
- Cocok untuk hosting statis apa pun (GitHub Pages, Netlify, Cloudflare Pages, Sites, dsb.). Repo ini belum memuat konfigurasi khusus untuk salah satu penyedia.
- Karena tidak ada server, header keamanan (CSP, `frame-ancestors`, `Referrer-Policy`) hanya bisa ditambahkan lewat pengaturan hosting, bukan dari HTML.

## Keterbatasan

- **Tanpa backend dan tanpa autentikasi.** Tidak ada login, sesi, API, maupun validasi di sisi server. Form pemesanan hanya menyusun pesan dan membuka WhatsApp; ketersediaan, harga final, dan jadwal tetap dikonfirmasi manual melalui chat.
- **Tanpa penyimpanan data sama sekali.** Proyek ini **tidak memakai `localStorage`**, `sessionStorage`, cookie, IndexedDB, atau database: seluruh layanan, harga, estimasi, paket, dan jam operasional adalah konstanta di `CONFIG` di dalam `index.html`. Tidak ada riwayat pesanan atau data pengguna yang tersimpan, sehingga tidak ada yang bisa dipulihkan setelah halaman ditutup. Bila nanti ditambahkan penyimpanan lokal, datanya hanya akan ada di browser perangkat itu — tidak tersinkron antar perangkat dan hilang jika data situs dibersihkan.
- **Konten masih placeholder.** Nomor WhatsApp dan alamat belum diisi (`62XXXXXXXXXX`, `Jl. Contoh No. 12, [Kota]`); testimoni masih berupa kotak kosong, dan foto sebelum/sesudah adalah ilustrasi, bukan hasil pengerjaan asli.
- **Harga bersifat acuan**, bukan transaksi atau reservasi. Perubahan status pesanan tidak tercatat di halaman.
- **Bergantung pada layanan pihak ketiga**: Google Fonts, cdnjs (GSAP), Google Maps, serta gambar dari `rupato.com` dan `cdn.jsdelivr.net`. Tanpa internet atau bila host memblokir permintaan tersebut, font/animasi/ikon/peta bisa tidak tampil; konten utama tetap terbaca karena animasi bersifat opsional.
- **Tanpa CSP dan header keamanan** pada tingkat berkas; lihat bagian Deployment.
- **Cakupan test terbatas** pada pemeriksaan statis HTML/JS, bukan pengujian perilaku di browser.
- Aksesibilitas dasar sudah ada (label form, `aria-*`, alt teks), namun belum diaudit dengan alat khusus.
