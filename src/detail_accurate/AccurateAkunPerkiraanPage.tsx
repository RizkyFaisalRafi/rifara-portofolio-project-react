import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../App"; // Mengimpor komponen Reveal dari App.tsx

const AccurateAkunPerkiraanPage: React.FC = () => {
  const [videoHasError, setVideoHasError] = useState(false);

  const accurateSteps = [
    {
      title: "Klasifikasi Tipe Akun (Account Types)",
      desc: "Langkah pertama dalam sistem Accurate adalah memahami klasifikasi utama akun. Sistem ini mengategorikan akun menjadi Harta (Kas/Bank, Piutang, Persediaan), Kewajiban (Hutang Usaha), Ekuitas (Modal), Pendapatan, Harga Pokok Penjualan (HPP), dan Beban. Pemetaan yang benar di awal sangat krusial untuk struktur laporan Neraca dan Laba Rugi yang valid.",
      image: "https://placehold.co/800x600/1a202c/e67e22?text=Klasifikasi+Tipe+Akun", 
      tag: "Tahap 1 - Klasifikasi",
      color: "text-blue-400"
    },
    {
      title: "Pembuatan Akun Induk (Header Account)",
      desc: "Akun Induk digunakan sebagai 'Folder' atau pengelompokan akun-akun detail di bawahnya. Akun ini tidak dapat menampung transaksi langsung, melainkan menjumlahkan total dari sub-akunnya. Pengaturan Akun Induk memastikan Chart of Accounts (COA) terlihat rapi dan berhierarki saat laporan keuangan dicetak.",
      image: "https://placehold.co/800x600/1a202c/e67e22?text=Pembuatan+Akun+Induk", 
      tag: "Tahap 2 - Hierarki Data",
      color: "text-yellow-400"
    },
    {
      title: "Input Akun Rincian & Saldo Normal",
      desc: "Setelah kerangka akun induk terbentuk, selanjutnya adalah mendaftarkan akun rincian (Detail Account). Setiap akun akan dipetakan saldo normalnya (Debit/Kredit) sesuai standar akuntansi. Pada tahap ini, pengkodean akun (Account No) yang konsisten sangat diperlukan untuk mempermudah pencarian.",
      image: "https://placehold.co/800x600/1a202c/e67e22?text=Input+Akun+Rincian",
      tag: "Tahap 3 - Detail & Pemetaan", 
      color: "text-orange-400"
    },
    {
      title: "Mapping Akun Default (Mata Uang, Barang, Pajak)",
      desc: "Agar penjurnalan terjadi secara otomatis saat ada transaksi pembelian/penjualan, sistem Accurate membutuhkan 'Default Account Mapping'. Kita harus mengatur akun penampung untuk Hutang/Piutang per mata uang, akun default untuk Item Barang (Persediaan, Penjualan, HPP), serta akun default untuk penampungan Pajak (PPN Masukan/Keluaran).",
      image: "https://placehold.co/800x600/1a202c/e67e22?text=Mapping+Akun+Default",
      tag: "Tahap 4 - Automatisasi Jurnal", 
      color: "text-purple-400"
    },
    {
      title: "Input Saldo Awal (Opening Balance)",
      desc: "Langkah terakhir sebelum sistem siap digunakan untuk operasional harian adalah memasukkan Saldo Awal (Opening Balance). Nilai ini diambil dari Neraca Saldo perusahaan di bulan cut-off. Accurate memvalidasi keseimbangan (balance) antara total Debit dan Kredit agar data historis tercatat akurat sebelum transaksi baru berjalan.",
      image: "https://placehold.co/800x600/1a202c/e67e22?text=Input+Saldo+Awal",
      tag: "Tahap 5 - Finalisasi & Cut-off", 
      color: "text-green-400"
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <Reveal>
        <div className="text-center mb-16">
          <Link to="/accurate" className="inline-flex items-center text-gray-400 hover:text-orange-500 transition-colors mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
            Kembali ke Katalog Modul
          </Link>
          <h3 className="text-xl font-bold uppercase text-orange-500 tracking-widest mb-3">Modul 1</h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Accurate: Setup Akun Perkiraan</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Studi kasus penjelasan dan konfigurasi awal (setup database) pada sistem Accurate. Fokus materi ini adalah tentang bagaimana merancang, mengklasifikasi, dan memetakan Akun Perkiraan (Chart of Accounts) agar otomatisasi penjurnalan berjalan akurat sesuai kaidah akuntansi.
          </p>
        </div>
      </Reveal>

      {/* --- VIDEO DEMO SECTION --- */}
      <Reveal className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Video Demo Setup</h2>
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.15)] border border-gray-700 bg-gray-900 relative group">
          {videoHasError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gray-900/90 backdrop-blur-sm border border-red-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500 mb-3 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-gray-200 font-semibold mb-1">Maaf, video demo gagal dimuat.</p>
              <p className="text-gray-400 text-sm mb-5">Silakan periksa koneksi internet Anda atau tonton langsung melalui YouTube.</p>
              <a 
                href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" // TODO: Ganti link youtube
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
              src="https://www.youtube.com/embed/e0BnBkhS1oI" // TODO: Ganti Link Youtube Disini
              title="Video Demo Setup Akun Perkiraan"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              onError={() => setVideoHasError(true)} 
            ></iframe> 
          )}
        </div>
      </Reveal>

      {/* --- [UPDATE TAMBAHAN] MATERI: PRE-SETUP & TIPE AKUN --- */}
      <Reveal className="mb-16">
        <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 md:p-10 shadow-xl">
          
          {/* BAGIAN PENDAHULUAN (PRE-SETUP) DARI GAMBAR */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-500 p-3 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014-8.81c-2.28-.46-4.646-.723-7.054-.723m0 0V3m0 0c-2.408 0-4.774.263-7.054.723M5.58 3.095A23.91 23.91 0 014.566 8.49" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Pre-Setup: Pengaturan Awal Database</h2>
            </div>
            
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Sebelum mulai membuat akun, Accurate akan menampilkan halaman pengaturan awal (*Initial Setup*). Pada studi kasus ini, terdapat beberapa konfigurasi krusial yang perlu diperhatikan:
              </p>
              
              <ul className="space-y-4">
                <li className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <strong className="text-white block mb-1">1. Menentukan Tanggal Cut-Off (Tgl Mulai Data)</strong>
                  Sebagai contoh, jika Anda menyetel tanggal mulai pada <b>31/12/2022</b>, artinya Anda akan menginput Saldo Awal (aset, utang, dll) per tanggal tersebut. Transaksi harian operasional baru akan dicatat efektif mulai 1 Januari 2023.
                </li>
                <li className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <strong className="text-white block mb-1">2. Pemilihan Metode HPP / COGS</strong>
                  Pemilihan metode <b>FIFO (First In First Out)</b> menginstruksikan sistem agar barang yang pertama kali dibeli/masuk gudang akan dihitung sebagai barang yang pertama kali terjual saat mengkalkulasi Harga Pokok Penjualan.
                </li>
                <li className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
                  <strong className="text-orange-400 block mb-1">3. Non-aktifkan Pembuatan Akun Otomatis</strong>
                  Pastikan <b>tidak mencentang</b> opsi <i>"Buatkan daftar akun perkiraan secara otomatis"</i>. Dengan membiarkannya kosong, kita mencegah sistem memasukkan *template* standar. Hal ini memungkinkan kita membangun struktur Akun Perkiraan (Chart of Accounts) yang benar-benar kustom dan terisolasi dari nol sesuai kebutuhan spesifik bisnis.
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full h-px bg-gray-700 my-10"></div>

          {/* BAGIAN MATERI TIPE AKUN (SUDAH ADA SEBELUMNYA) */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-orange-500 p-3 rounded-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Materi: Memahami Tipe Akun Dasar (Account Types)</h2>
          </div>

          <div className="text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Tipe Akun dalam akuntansi pada dasarnya adalah kategori atau "laci" yang digunakan untuk mengelompokkan setiap transaksi keuangan. Tujuan pengelompokan ini sangat sederhana: agar pemilik bisnis tahu secara pasti dari mana uang berasal, ke mana uang pergi, serta apa saja kekayaan dan tanggungan bisnis saat ini.
            </p>
            <p className="text-lg">
              Secara umum, seluruh tipe akun di dunia akuntansi dibagi menjadi <b>lima kelompok besar</b>. Berikut adalah rincian masing-masing tipe akun beserta kode resminya yang digunakan dalam sistem Accurate, dijelaskan menggunakan bahasa bisnis sehari-hari:
            </p>

            <div className="space-y-6 mt-6">
              
              {/* KELOMPOK 1: HARTA */}
              <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span> 
                  Kelompok Harta (Kekayaan Bisnis)
                </h3>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▪</span>
                    <span><strong className="text-white">BANK (Kas/Bank):</strong> Uang tunai yang siap dipakai kapan saja, baik yang ada di brankas fisik maupun saldo di rekening bank.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▪</span>
                    <span><strong className="text-white">AREC (Piutang Usaha):</strong> Uang hak milik bisnis yang masih belum dibayar oleh pelanggan. Misalnya, ada penghuni kontrakan yang belum membayar uang sewa bulan ini, atau klien layanan hosting yang belum mentransfer biaya perpanjangan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▪</span>
                    <span><strong className="text-white">INTR (Persediaan):</strong> Stok fisik barang dagangan yang dibeli untuk dijual kembali.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▪</span>
                    <span><strong className="text-white">OCAS (Aset lancar lainnya):</strong> Kekayaan jangka pendek selain tiga hal di atas. Contohnya adalah uang muka (DP) yang sudah Anda bayarkan kepada pihak lain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▪</span>
                    <span><strong className="text-white">FASS (Aset Tetap):</strong> Harta berwujud yang dibeli untuk dipakai dalam jangka panjang (lebih dari satu tahun) dan tidak berniat untuk dijual sehari-hari. Contohnya adalah tanah, bangunan fisik kontrakan, atau perangkat keras komputer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▪</span>
                    <span><strong className="text-white">DEPR (Akumulasi Depresiasi):</strong> Catatan penurunan nilai dari Aset Tetap. Bangunan atau perangkat elektronik pasti mengalami penyusutan nilai setiap tahunnya karena faktor keausan atau usia.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▪</span>
                    <span><strong className="text-white">OASS (Aset lainnya):</strong> Kekayaan yang sifatnya di luar kategori umum, biasanya tidak berwujud fisik, seperti hak merek dagang suatu bisnis.</span>
                  </li>
                </ul>
              </div>

              {/* KELOMPOK 2: UTANG */}
              <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  <span className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span> 
                  Kelompok Utang (Kewajiban)
                </h3>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▪</span>
                    <span><strong className="text-white">APAY (Utang Usaha):</strong> Tagihan dari pemasok (supplier) untuk keperluan operasional yang belum Anda lunasi. Misalnya, tagihan biaya sewa server ke Biznet atau Rumahweb yang pembayarannya Anda tunda minggu depan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▪</span>
                    <span><strong className="text-white">OCLY (Utang lancar lain-lain):</strong> Kewajiban jangka pendek (jatuh tempo kurang dari setahun) yang tidak berkaitan langsung dengan pembelian operasional, misalnya utang pajak ke pemerintah.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▪</span>
                    <span><strong className="text-white">LTLY (Utang jangka panjang):</strong> Pinjaman besar yang masa pembayarannya lebih dari satu tahun, seperti pinjaman modal dari bank untuk membangun atau merenovasi properti.</span>
                  </li>
                </ul>
              </div>

              {/* KELOMPOK 3: MODAL */}
              <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">3</span> 
                  Kelompok Modal
                </h3>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">▪</span>
                    <span><strong className="text-white">EQTY (Ekuitas):</strong> Hak murni pemilik bisnis atas seluruh kekayaan perusahaan. Angka ini berasal dari modal awal yang disetorkan, ditambah dengan kumpulan keuntungan bisnis dari tahun ke tahun yang tidak ditarik untuk keperluan pribadi.</span>
                  </li>
                </ul>
              </div>

              {/* KELOMPOK 4: PENDAPATAN */}
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <span className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">4</span> 
                  Kelompok Pendapatan (Pemasukan)
                </h3>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▪</span>
                    <span><strong className="text-white">REVE (Pendapatan):</strong> Hasil uang yang didapat dari kegiatan utama bisnis. Contohnya adalah uang sewa bulanan dari properti kontrakan, atau uang hasil penjualan pendaftaran nama domain (.com, .online, .store).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▪</span>
                    <span><strong className="text-white">OINC (Pendapatan lain-lain):</strong> Pemasukan tambahan yang tidak berasal dari operasional utama bisnis. Misalnya, bisnis Anda mendapat bunga dari saldo tabungan di bank.</span>
                  </li>
                </ul>
              </div>

              {/* KELOMPOK 5: BEBAN */}
              <div className="p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                  <span className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">5</span> 
                  Kelompok Beban (Pengeluaran)
                </h3>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">▪</span>
                    <span><strong className="text-white">COGS (Beban Pokok Penjualan):</strong> Modal harga beli dari produk atau jasa yang berhasil terjual. Jika Anda menjual domain ke pelanggan, biaya dasar yang harus Anda bayarkan ke registrar domain pusat masuk ke dalam kategori ini.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">▪</span>
                    <span><strong className="text-white">EXPS (Beban):</strong> Biaya operasional rutin yang harus dikeluarkan agar bisnis tetap berjalan. Contohnya meliputi tagihan listrik, biaya air, biaya perbaikan kerusakan bangunan, atau gaji pegawai kebersihan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">▪</span>
                    <span><strong className="text-white">OEXP (Beban lain-lain):</strong> Pengeluaran yang tidak berkaitan langsung dengan usaha utama, seperti biaya potongan administrasi rekening bank setiap bulannya.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </Reveal>

      {/* --- TIMELINE DEMO CASE STUDY --- */}
      <Reveal>
        <h2 className="text-3xl font-bold text-center text-white mb-10">Dokumentasi Langkah Setup</h2>
      </Reveal>
      <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
        {accurateSteps.map((step, idx) => (
          <Reveal key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-gray-800 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-125">
              {idx + 1}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-800/80 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <span className={`text-sm font-bold uppercase tracking-wider mb-2 block ${step.color}`}>{step.tag}</span>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{step.desc}</p>
              
              <div className="w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-900 aspect-[4/3] group-hover:shadow-lg transition-all cursor-pointer">
                <img src={step.image} alt={step.title} className="w-full h-full object-cover object-center opacity-80 transition-all duration-500 hover:scale-105 hover:opacity-100" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default AccurateAkunPerkiraanPage;