# PRD Landing Page cucisepatu v1.0.0

Target selesai: hari ini. Dibuat lewat vibecoding di opencode (akun free).

## 1. Ringkasan

cucisepatu adalah jasa cuci sepatu harian untuk anak muda. Landing page ini punya satu tujuan: membuat pengunjung memilih layanan lalu chat WhatsApp. Tidak ada login, backend, pembayaran, atau tracking.

## 2. Target pengguna

Pemilik sepatu harian berusia sekitar 17 sampai 30 tahun (pelajar, mahasiswa, pekerja awal). Mereka membuka dari HP atau laptop, ingin tahu harga, lama pengerjaan, dan lokasi dengan cepat.

## 3. Tujuan dan ukuran berhasil

- Pengunjung paham layanan dan harga dalam kurang dari 30 detik
- Tombol WhatsApp terlihat di setiap bagian halaman
- Skor Lighthouse mobile di atas 90 untuk Performance
- Halaman rapi di layar 360 px sampai desktop

## 4. Cakupan

Masuk:

- Satu halaman statis dengan 9 section (lihat bagian 6)
- CTA WhatsApp dengan pesan terisi otomatis sesuai layanan atau paket yang dipilih
- Embed Google Maps, jam buka, estimasi waktu per kategori, menu paket combo
- Animasi singkat dengan GSAP

Tidak masuk:

- Login, form backend, database, pembayaran, tracking status
- Blog, multi bahasa, mode gelap
- Layanan repaint dan reparasi (hanya sepatu harian)

## 4a. Stack

- HTML5, CSS biasa dengan variabel CSS (tanpa framework agar ringan)
- JS native (satu file script.js)
- GSAP 3 dan ScrollTrigger lewat CDN cdnjs, versi dipin
- Font Plus Jakarta Sans dari Google Fonts, dengan fallback sans-serif
- Deploy statis ke Vercel tanpa build

## 4b. Struktur file

- index.html
- style.css
- script.js
- assets/ (logo.svg, foto before dan after, favicon)

## 5. Identitas visual

Gaya bersih dan minimal, banyak ruang kosong, sudut membulat, satu warna aksen.

Warna brand (placeholder, ganti sesuai brand kamu):

- Primer: #0EA5E9 (biru langit)
- Gelap: #0F172A
- Latar: #FFFFFF dan #F8FAFC
- Aksen CTA WhatsApp: #22C55E

Semua warna disimpan sebagai variabel di :root agar mudah diganti satu tempat.

Logo: teks "cucisepatu" dengan font tebal sebagai placeholder, ganti file logo.svg nanti.

## 6. Section halaman

1. Navbar. Logo, tautan Layanan, Paket, Cara Kerja, Lokasi, dan tombol Chat WA. Menu burger di mobile.
2. Hero. Headline, subjudul, tombol Chat WA dan Lihat Harga. Satu visual sepatu (placeholder).
3. Layanan dan harga. Tiga tingkat layanan dalam kartu.
4. Estimasi waktu per kategori. Tabel kategori sepatu dengan lama pengerjaan.
5. Paket combo. Tiga kartu paket.
6. Before dan after. Slider geser dengan input range dan clip-path.
7. Cara kerja. Empat langkah: Chat, Antar atau jemput, Kami cuci, Ambil.
8. Testimoni dan FAQ. Tiga testimoni dummy, lima pertanyaan akordeon.
9. Lokasi dan jam buka. Embed Google Maps, tabel jam buka, tombol WA, footer.

Tombol WhatsApp melayang tampil di pojok kanan bawah pada semua ukuran layar.

## 7. Konten dummy

Semua isi di bawah adalah contoh. Ganti dengan data asli sebelum rilis.

Layanan:

- Fast Clean, Rp25.000. Bersihkan bagian luar, sol, dan tali.
- Deep Clean, Rp40.000. Cuci menyeluruh luar dan dalam, tali, dan sol.
- Premium Clean, Rp60.000. Deep Clean ditambah penghilang bau dan perawatan sol kuning.

Estimasi waktu per kategori:

- Sneakers kain atau kanvas: Fast 1 hari, Deep 2 hari, Premium 3 hari
- Sneakers kulit atau sintetis: Fast 1 hari, Deep 3 hari, Premium 3 hari
- Sepatu sekolah atau kets: Fast 1 hari, Deep 2 hari, Premium 3 hari
- Sepatu formal atau pantofel: Fast 2 hari, Deep 3 hari, Premium 4 hari

Paket combo:

- Paket Berdua: 2 pasang Deep Clean, Rp70.000 (hemat Rp10.000)
- Paket Hemat: 3 pasang Deep Clean, Rp100.000 (hemat Rp20.000)
- Paket Rutin: 4 pasang Fast Clean, Rp85.000 (hemat Rp15.000)

Jam buka:

- Senin sampai Sabtu: 09.00 sampai 20.00
- Minggu: 13.00 sampai 18.00

Alamat: Jl. Contoh No. 12, \[Kota\]. Nomor WhatsApp: 62XXXXXXXXXX.

Catatan: kolom harga dan estimasi dibuat dari array JS agar edit data tidak menyentuh HTML.

## 8. Perilaku WhatsApp

Format tautan: https://wa.me/62XXXXXXXXXX?text=PESAN (PESAN di-encode dengan encodeURIComponent).

Pesan bawaan: "Halo cucisepatu, saya mau pesan \[nama layanan atau paket\]. Jenis sepatu: ... Jumlah: ..."

Nomor disimpan sebagai satu konstanta di script.js.

## 9. Animasi GSAP

Batasi pada animasi singkat (durasi 0,4 sampai 0,8 detik):

- Hero: teks dan tombol muncul bertahap
- Section lain: fade dan geser naik saat masuk layar dengan ScrollTrigger (sekali jalan)
- Kartu layanan dan paket: stagger kecil
- Hormati prefers-reduced-motion, matikan animasi jika aktif

Tidak ada animasi berat, parallax, atau pin scroll.

## 10. Kebutuhan non fungsional

- Mobile first, breakpoint 640 px dan 1024 px
- Gambar memakai atribut loading=lazy, alt, dan ukuran jelas
- Kontras teks sesuai standar WCAG AA
- Meta title, description, dan Open Graph terisi
- Total ukuran halaman di bawah 1 MB tanpa foto asli

## 11. Rencana kerja bertahap untuk opencode

Kerjakan satu langkah per prompt agar kuota hemat dan hasil mudah dicek.

1. Kerangka: index.html, style.css, script.js, variabel warna, font, navbar, hero, tombol WA melayang. Cek di browser.
2. Section layanan, estimasi, dan paket dari data array di JS. Tombol Pesan di tiap kartu membuka WhatsApp dengan pesan terisi.
3. Section before dan after (slider), cara kerja, testimoni, FAQ akordeon.
4. Section lokasi: embed Maps, jam buka, footer. Tandai hari ini pada tabel jam buka dengan JS.
5. GSAP dan ScrollTrigger sesuai bagian 9, termasuk prefers-reduced-motion.
6. Poles: responsif 360 px, meta tag, favicon, cek Lighthouse.
7. Deploy: push ke GitHub, import di Vercel, tes tautan WhatsApp dari HP.

## 12. Kriteria selesai

- Semua 9 section tampil rapi di HP dan desktop
- Setiap tombol pesan membuka WhatsApp dengan pesan yang benar
- Slider before dan after berfungsi di sentuhan dan mouse
- Animasi berjalan dan mati saat reduced motion aktif
- Situs live di Vercel

## 13. Yang perlu kamu isi sebelum rilis

- Nomor WhatsApp, alamat asli, dan tautan embed Google Maps
- Harga, estimasi, dan paket asli
- Warna brand dan logo asli
- Foto before dan after asli (minimal 2 pasang)
- Tiga testimoni asli, atau hapus section testimoni

## 14. Prompt awal untuk opencode

Salin ini ke prompt pertama, lalu lampirkan dokumen ini:

"Baca PRD terlampir. Kerjakan langkah 1 saja. Gunakan HTML, CSS biasa, dan JS native. Jangan memakai framework atau build tool. Tunjukkan file yang dibuat, lalu tunggu instruksi untuk langkah berikutnya."
