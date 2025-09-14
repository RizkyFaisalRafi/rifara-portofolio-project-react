import React, { useState } from "react";

// --- Komponen Pengganti ---
// Karena lingkungan ini mungkin tidak mendukung instalasi pustaka eksternal,
// komponen pengganti sederhana dibuat di sini.

// Pengganti untuk <Chip>
const Chip: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={className}>{children}</div>;

// Pengganti untuk <Fade> dengan animasi CSS
const Fade: React.FC<{
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}> = ({ children, duration = 1000, delay = 300 }) => {
  const style: React.CSSProperties = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationName: "fadeInUp",
    animationFillMode: "both",
  };
  return <div style={style}>{children}</div>;
};

// Komponen terpisah untuk judul seksi
const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-8 md:mb-12">
    <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">
      {subtitle}
    </h3>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
      {title}
    </h2>
    <div className="w-24 h-1 bg-[#3498db] mx-auto mt-4 rounded"></div>
  </div>
);

// Data untuk Lulusan Bootcamp & Sertifikasi
const bootcampHistory = [
  {
    bootcampName: "Belajar Membuat Aplikasi Android untuk Pemula",
    program: "Sertifikasi Kompetensi",
    organizer: "Dicoding Indonesia",
    organizerUrl: "https://www.dicoding.com/",
    logo: "https://placehold.co/100x100/1a202c/ffffff?text=Dicoding", // Ganti dengan path logo Anda
    date: "Juni 2023",
    details: [
      "Menyelesaikan kelas dasar untuk menjadi seorang Android Developer.",
      "Mempelajari komponen-komponen fundamental dalam pengembangan aplikasi Android.",
      "Berhasil membuat aplikasi daftar pengguna GitHub menggunakan API sebagai proyek akhir.",
      "Mendapatkan sertifikat kelulusan sebagai bukti kompetensi.",
    ],
    skills: [
      "Android Studio",
      "Kotlin",
      "XML Layouting",
      "RecyclerView",
      "Intent",
      "API Consumption",
      "Git",
    ],
  },
  {
    bootcampName: "Cloud Practitioner Essentials",
    program: "Pelatihan & Sertifikasi",
    organizer: "Amazon Web Services (AWS)",
    organizerUrl: "https://aws.amazon.com/",
    logo: "https://placehold.co/100x100/1a202c/ffffff?text=AWS", // Ganti dengan path logo Anda
    date: "Maret 2024",
    details: [
      "Memahami konsep dasar dan manfaat dari komputasi awan (Cloud Computing).",
      "Mempelajari layanan-layanan inti AWS seperti EC2, S3, IAM, dan VPC.",
      "Mengerti tentang model harga, keamanan, dan arsitektur dasar di AWS.",
      'Lulus ujian dan mendapatkan sertifikasi resmi "AWS Certified Cloud Practitioner".',
    ],
    skills: [
      "Cloud Computing",
      "AWS Core Services",
      "EC2",
      "S3",
      "VPC",
      "IAM",
      "Cloud Security",
      "AWS Pricing",
    ],
  },
];

const Bootcamp: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="bootcamp"
      className="max-w-6xl mx-auto mt-2 py-6 px-4 sm:px-6 lg:px-8"
    >
      <style>
        {`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate3d(0, 40px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                `}
      </style>
      <SectionTitle title="Bootcamp & Sertifikasi" subtitle="Pelatihan" />
      <Fade duration={1000} delay={300}>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-4 lg:mt-6">
          {/* Desktop: Sidebar vertikal untuk navigasi */}
          <div className="hidden lg:flex lg:min-w-[240px] lg:w-auto">
            <div className="flex flex-col pr-8 space-y-2">
              {bootcampHistory.map((bootcamp, idx) => (
                <button
                  key={bootcamp.bootcampName}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative text-left px-4 py-3 font-semibold transition-all duration-300 w-full rounded-lg group
                                    ${
                                      activeIndex === idx
                                        ? "text-[#3498db] bg-gray-800/50 shadow-lg"
                                        : "text-gray-400 hover:text-[#3498db] hover:bg-gray-800/30 hover:shadow-md"
                                    }
                                `}
                >
                  {activeIndex === idx && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-[#3498db] rounded-r-lg shadow-sm animate-pulse" />
                  )}
                  <span className="relative z-10 block text-sm">
                    {bootcamp.bootcampName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Konten Utama */}
          <div className="flex-1 min-w-0 bg-gray-800/20 p-6 rounded-xl shadow-2xl border border-gray-700">
            <div className="mb-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white leading-tight">
                {bootcampHistory[activeIndex].bootcampName}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <a
                  href={bootcampHistory[activeIndex].organizerUrl}
                  className="inline-flex items-center text-[#3498db] hover:text-[#2980b9] transition-colors duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="h-8 md:h-10 mr-3 rounded-md group-hover:scale-105 transition-transform duration-200 bg-white p-1"
                    src={bootcampHistory[activeIndex].logo}
                    alt={`${bootcampHistory[activeIndex].organizer} logo`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/100x100/1a202c/ffffff?text=Logo";
                    }}
                  />
                  <span className="font-semibold text-lg md:text-xl group-hover:underline decoration-2 underline-offset-4">
                    {bootcampHistory[activeIndex].organizer}
                  </span>
                </a>
                <p className="text-gray-400 font-medium text-base">
                  {bootcampHistory[activeIndex].date}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <ul className="space-y-3">
                {bootcampHistory[activeIndex].details.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base leading-relaxed"
                  >
                    <svg
                      className="w-5 h-5 text-[#3498db] mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span
                      className="text-gray-300"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Teknologi & Keahlian:
              </h4>
              <div className="flex flex-wrap gap-2">
                {bootcampHistory[activeIndex].skills.map((item, i) => (
                  <Chip
                    key={i}
                    className="bg-gray-700 text-gray-200 border border-gray-600 hover:border-[#3498db] hover:bg-gray-600 transition-all duration-200 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile: Pilihan di Bawah */}
          <div className="lg:hidden mt-6 pt-4 border-t border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-3 text-center">
              Pilih Pelatihan
            </h4>
            <div className="flex overflow-x-auto scrollbar-thin gap-3 pb-4 px-1">
              {bootcampHistory.map((bootcamp, idx) => (
                <button
                  key={bootcamp.bootcampName}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative px-4 py-2 font-semibold text-sm rounded-full border-2 transition-all duration-300 flex-shrink-0 whitespace-nowrap
                                    ${
                                      activeIndex === idx
                                        ? "bg-[#3498db] text-white border-[#3498db] shadow-lg shadow-[#3498db]/30"
                                        : "bg-transparent text-gray-300 border-gray-600 hover:border-[#3498db] hover:text-[#3498db]"
                                    }
                                `}
                >
                  {bootcamp.organizer}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default Bootcamp;
