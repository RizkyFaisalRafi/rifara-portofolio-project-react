import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../App";

const AccurateKelolaFiturPage: React.FC = () => {
  const [videoHasError, setVideoHasError] = useState(false);

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <Reveal>
        <div className="text-center mb-16">
          <Link to="/accurate" className="inline-flex items-center text-gray-400 hover:text-orange-500 transition-colors mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
            Kembali ke Katalog Modul
          </Link>
          <h3 className="text-xl font-bold uppercase text-orange-500 tracking-widest mb-3">Modul 2</h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Accurate: Setup Preferensi & Fitur</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Studi kasus pemahaman menu Preferensi Fitur pada Accurate Online. Modul ini membahas bagaimana mengaktifkan atau menonaktifkan fitur spesifik (Perusahaan, Penjualan, Pembelian, Persediaan) untuk menyesuaikan sistem dengan skala dan alur kerja bisnis.
          </p>
        </div>
      </Reveal>

      {/* --- VIDEO DEMO SECTION --- */}
      <Reveal className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Video Demo Setup Fitur</h2>
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.15)] border border-gray-700 bg-gray-900 relative group">
          {videoHasError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gray-900/90 backdrop-blur-sm border border-red-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500 mb-3 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-gray-200 font-semibold mb-1">Maaf, video demo gagal dimuat.</p>
              <p className="text-gray-400 text-sm mb-5">Silakan periksa koneksi internet Anda atau tonton langsung melalui YouTube.</p>
              <a 
                href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" // TODO: Ganti link youtube demo fitur Anda
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-transform transform hover:scale-105 shadow-lg shadow-red-600/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385-8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                Tonton di YouTube
              </a>
            </div>
          ) : (
            <iframe 
              className="w-full h-full border-0 bg-black"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID" // TODO: Ganti link embed youtube demo fitur Anda
              title="Video Demo Setup Fitur Accurate"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              onError={() => setVideoHasError(true)} 
            ></iframe> 
          )}
        </div>
      </Reveal>

      {/* --- MATERI: PENGELOLAAN FITUR --- */}
      <Reveal className="mb-16">
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-orange-500 p-3 rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Materi Lengkap Kelola Fitur</h2>
          </div>

          <div className="text-gray-300 leading-relaxed space-y-8">
            <p className="text-lg">
              Menu <b>Preferensi - Fitur</b> digunakan untuk mendesain sistem agar beroperasi sesuai dengan kebutuhan aktual perusahaan. Fitur-fitur ini dikelompokkan ke dalam empat tab utama untuk mempermudah manajemen modul.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* TAB PERUSAHAAN */}
              <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span> 
                  Tab Perusahaan
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Fitur Dasar:</h4>
                    <ul className="space-y-2 pl-2 border-l border-blue-500/30 ml-1">
                      <li><strong className="text-white">Multi Cabang:</strong> Mengelola operasional, persediaan, dan laporan keuangan terpisah antar cabang.</li>
                      <li><strong className="text-white">Multi Mata Uang:</strong> Mencatat transaksi jual-beli dan saldo kas menggunakan mata uang asing.</li>
                      <li><strong className="text-white">Pajak:</strong> Mengaktifkan kalkulasi otomatis untuk PPN dan jenis pajak lainnya pada transaksi.</li>
                      <li><strong className="text-white">Persetujuan (Approval):</strong> Menjalankan alur otorisasi berjenjang sebelum transaksi diproses.</li>
                      <li><strong className="text-white">Pencatatan Aset:</strong> Mengelola aset tetap berwujud beserta perhitungan akumulasi penyusutannya.</li>
                      <li><strong className="text-white">Anggaran & Target:</strong> Menetapkan budget dan melacak persentase pencapaian bisnis.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Pusat Laba & Biaya:</h4>
                    <ul className="space-y-2 pl-2 border-l border-blue-500/30 ml-1">
                      <li><strong className="text-white">Departemen:</strong> Melacak rincian pendapatan/pengeluaran spesifik per divisi.</li>
                      <li><strong className="text-white">Proyek:</strong> Menghitung alokasi biaya dan proyeksi laba spesifik per proyek kerja.</li>
                      <li><strong className="text-white">Kategori Keuangan:</strong> Analitik khusus di luar struktur akun standar.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Metode Biaya Persediaan & Lainnya:</h4>
                    <ul className="space-y-2 pl-2 border-l border-blue-500/30 ml-1">
                      <li><strong className="text-white">Pinjaman Karyawan:</strong> Pencatatan fasilitas kasbon dan cicilan potong gaji.</li>
                      <li><strong className="text-white">Metode Persediaan:</strong> Pilihan untuk menghitung HPP menggunakan <b>Rata-rata (Average)</b> atau <b>FIFO (First In First Out)</b>.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TAB PENJUALAN */}
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span> 
                  Tab Penjualan
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Alur Penjualan:</h4>
                    <ul className="space-y-2 pl-2 border-l border-green-500/30 ml-1">
                      <li><strong className="text-white">Penawaran & Pesanan:</strong> Menerbitkan Quotation dan mengikat Sales Order sebelum pengiriman.</li>
                      <li><strong className="text-white">Retur Penjualan:</strong> Pengembalian fisik barang dan pemotongan piutang pelanggan.</li>
                      <li><strong className="text-white">Tukar Faktur:</strong> Tanda terima atas faktur tagihan fisik yang diserahkan ke pelanggan.</li>
                      <li><strong className="text-white">Penyesuaian Harga/Diskon:</strong> Mengubah nominal harga jual dasar atau menyematkan potongan harga.</li>
                      <li><strong className="text-white">Faktur Dimuka:</strong> Menagih uang muka (DP) atau menerbitkan Invoice sebelum barang didistribusikan.</li>
                      <li><strong className="text-white">Tenaga Penjual (Salesman):</strong> Menautkan nama sales pada faktur untuk kalkulasi komisi.</li>
                      <li><strong className="text-white">Klaim Pelanggan:</strong> Menangani keluhan pelanggan terkait garansi.</li>
                      <li><strong className="text-white">Pembayaran dengan Kode Unik:</strong> Menambahkan angka unik pada tagihan untuk otomatisasi verifikasi transfer bank.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Integrasi & Lainnya:</h4>
                    <ul className="space-y-2 pl-2 border-l border-green-500/30 ml-1">
                      <li><strong className="text-white">Konsinyasi Barang:</strong> Alur akuntansi untuk skema penitipan barang jualan ke agen.</li>
                      <li><strong className="text-white">Jasa Pengiriman:</strong> Alokasi biaya ongkos kirim ekspedisi ketiga.</li>
                      <li><strong className="text-white">Syarat Pembayaran:</strong> Termin jatuh tempo (Net 15, Net 30, dll).</li>
                      <li><strong className="text-white">SmartLink Integration:</strong> Menghubungkan mutasi bank (BCA, UOB, Mandiri) untuk rekonsiliasi kas.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TAB PEMBELIAN */}
              <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <span className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">3</span> 
                  Tab Pembelian
                </h3>
                <div className="space-y-4 text-sm">
                  <ul className="space-y-3 pl-2 border-l border-red-500/30 ml-1">
                    <li><strong className="text-white">Pesanan Pembelian:</strong> Menerbitkan dokumen Purchase Order (PO) sebagai dasar pembelian ke pemasok.</li>
                    <li><strong className="text-white">Klaim Pemasok:</strong> Memproses retur klaim garansi atas barang cacat ke pemasok.</li>
                    <li><strong className="text-white">Daftar Harga Pemasok:</strong> Menyimpan riwayat katalog harga beli untuk otomatisasi form pesanan.</li>
                    <li><strong className="text-white">Tagihan Dimuka:</strong> Pencatatan faktur tagihan (Purchase Invoice) atau pelunasan DP meskipun fisik barang belum tiba.</li>
                    <li><strong className="text-white">Biaya Pembelian oleh Pemasok lain:</strong> Mengalokasikan biaya tambahan operasional (seperti asuransi/cukai muatan) dari vendor ketiga ke total nilai persediaan.</li>
                  </ul>
                </div>
              </div>

              {/* TAB PERSEDIAAN */}
              <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">4</span> 
                  Tab Persediaan
                </h3>
                <div className="space-y-4 text-sm">
                  <ul className="space-y-3 pl-2 border-l border-purple-500/30 ml-1">
                    <li><strong className="text-white">Permintaan Barang:</strong> Formulir pengajuan (Material Requisition) dari divisi internal sebelum diterbitkan PO.</li>
                    <li><strong className="text-white">Multi Gudang:</strong> Melacak alokasi, saldo, dan perpindahan stok di lebih dari satu lokasi fisik.</li>
                    <li><strong className="text-white">Multi Satuan Barang:</strong> Konfigurasi hierarki satuan ukuran barang (contoh: dari "Karton" ke "Pcs").</li>
                    <li><strong className="text-white">Nomor Serial/Produksi:</strong> Pelacakan inventaris spesifik (Serial Number untuk elektronik, Batch/Expired Date untuk makanan).</li>
                    <li><strong className="text-white">Produksi Sederhana:</strong> Merakit bahan baku mentah menjadi barang jadi baru (seperti parsel) tanpa modul pabrik rumit.</li>
                    <li><strong className="text-white">Manufaktur:</strong> Fungsionalitas pabrikasi kompleks termasuk SPK, pembebanan overhead, dan Work in Progress (WIP).</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default AccurateKelolaFiturPage;