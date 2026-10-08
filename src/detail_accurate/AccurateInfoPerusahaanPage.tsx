import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../App";

const AccurateInfoPerusahaanPage: React.FC = () => {
  const companyProfile = [
    { label: "Nama Perusahaan", value: "TOKO MEBEL MAJU" },
    { label: "Level Distribusi", value: "Distributor" },
    { label: "Bidang Usaha", value: "Others (Lainnya)" },
    { label: "Telepon & Faksimili", value: "031-1234567 & 031-7654321" },
    { label: "Email", value: "admin@mebelmaju.com" },
    { label: "Tanggal Mulai/Tutup Buku", value: "31 Desember 2022" },
    { label: "Periode Akuntansi", value: "Januari - Desember" },
    { label: "Alamat Perusahaan", value: "Jl. Simponi No 18" },
    { label: "Kota", value: "Gresik" },
    { label: "Kode Pos", value: "12345" },
  ];

  const operationalPolicies = [
    {
      title: "Informasi Umum",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      ),
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      color: "text-blue-400",
      items: [
        "Perusahaan memiliki 1 Cabang yaitu Cabang Surabaya.",
        "Beberapa pelanggan dan pemasok masih menggunakan USD dalam bertransaksi dengan Perusahaan.",
        "Perusahaan adalah Pengusaha Kena Pajak yang memungut dan membayar PPN.",
        "Aset Perusahaan diakui dalam pencatatan perusahaan."
      ]
    },
    {
      title: "Informasi Penjualan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      color: "text-green-400",
      items: [
        "Penawaran Penjualan dibuat dan dikirimkan kepada Pelanggan.",
        "Retur penjualan sebagai pengurang nilai piutang berlaku untuk barang yang rusak (cacat).",
        "Perusahaan menghitung dan membayar komisi salesman.",
        "Perusahaan mengirimkan barang melalui jasa pengiriman.",
        "Perusahaan memberikan syarat dan tenggang waktu pelunasan kepada pelanggan."
      ]
    },
    {
      title: "Informasi Pembelian",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      color: "text-red-400",
      items: [
        "Bagian Accounting membuat PO (Purchase Order) kepada pemasok yang terpilih.",
        "Dalam proses pembelian barang, proses pengirimannya diproses oleh pemasok lain (Forwarder)."
      ]
    },
    {
      title: "Informasi Persediaan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      color: "text-purple-400",
      items: [
        "Bagian Gudang membuat Permintaan Barang atas barang yang ingin diajukan pembelian.",
        "Gudang yang dimiliki perusahaan: 2 (Belakang & Toko).",
        "Barang yang dijual memiliki lebih dari satu satuan pada satu jenis barang.",
        "Perusahaan memiliki kegiatan memproduksi/merakit barang.",
        "Metode perhitungan nilai persediaan: FIFO."
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <Reveal>
        <div className="text-center mb-12">
          <Link className="inline-flex items-center text-gray-400 hover:text-orange-500 transition-colors mb-6" to="/accurate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
            Kembali ke Katalog Modul
          </Link>
          <h3 className="text-xl font-bold uppercase text-orange-500 tracking-widest mb-3">Modul 1</h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Accurate: Profil & Informasi Perusahaan</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Halaman ini memuat latar belakang (Case Study Brief) dari simulasi implementasi Accurate Online. Seluruh pengaturan fitur, daftar akun, dan master data di modul berikutnya akan merujuk pada kebijakan operasional perusahaan di bawah ini.
          </p>
        </div>
      </Reveal>

      {/* --- BAGIAN 1: PROFIL PERUSAHAAN --- */}
      <Reveal className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Profil Perusahaan</h2>
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-700">
            {companyProfile.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row bg-gray-900/40">
                <div className="sm:w-1/2 p-4 text-gray-400 font-medium bg-gray-800/80 border-b sm:border-b-0 sm:border-r border-gray-700 flex items-center">
                  {item.label}
                </div>
                <div className="sm:w-1/2 p-4 text-white font-semibold flex items-center">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* --- BAGIAN 2: KEBIJAKAN OPERASIONAL --- */}
      <Reveal>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">Kebijakan Operasional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operationalPolicies.map((policy, index) => (
            <div key={index} className={`p-6 rounded-2xl border shadow-lg flex flex-col ${policy.bg} ${policy.border}`}>
              <div className="flex items-center gap-3 mb-5 border-b border-gray-700/50 pb-4">
                <div className={`p-2 rounded-lg bg-gray-900 shadow-inner border border-gray-700`}>
                  {policy.icon}
                </div>
                <h3 className={`text-xl font-bold ${policy.color}`}>{policy.title}</h3>
              </div>
              <ul className="space-y-3 flex-grow pl-1">
                {policy.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed text-sm">
                    <span className={`${policy.color} mt-1 font-bold`}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
      
    </div>
  );
};

export default AccurateInfoPerusahaanPage;