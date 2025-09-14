import React, { useState } from "react";

// --- Komponen Pengganti ---
// Karena lingkungan ini mungkin tidak mendukung instalasi pustaka eksternal seperti
// "@heroui/react" dan "react-awesome-reveal", saya membuat komponen pengganti sederhana di sini.

// Pengganti untuk <Chip> dari @heroui/react
const Chip: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={className}>{children}</div>;

// Pengganti untuk <Fade> dari react-awesome-reveal.
// Kita akan menggunakan animasi CSS sederhana.
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

// Komponen terpisah untuk judul seksi agar mudah digunakan kembali
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

// Data untuk Riwayat Pendidikan
const educationHistory = [
  {
    institution: "Universitas Bina Sarana Informatika",
    degree: "Sarjana Komputer (S.Kom)",
    major: "Teknologi Informasi",
    institutionUrl: "https://www.bsi.ac.id/",
    logo: "https://placehold.co/100x100/1a202c/ffffff?text=BSI", // Ganti dengan path logo Anda, contoh: './bsi_logo.png'
    date: "September 2020 - Oktober 2024",
    details: [
      "Lulus dengan predikat <strong>Cum Laude</strong>, meraih IPK 3.80.",
      "Fokus studi pada rekayasa perangkat lunak, pengembangan web, dan kecerdasan buatan.",
      "Aktif dalam Himpunan Mahasiswa Teknologi Informasi sebagai koordinator divisi riset dan teknologi.",
      'Mengembangkan proyek akhir berjudul "Implementasi Sistem Rekomendasi E-Commerce Menggunakan Metode Collaborative Filtering".',
    ],
    skills: [
      "Data Structures & Algorithms",
      "Web Development",
      "Software Engineering",
      "Database Systems",
      "Object-Oriented Programming",
      "Artificial Intelligence",
      "Project Management",
    ],
  },
  {
    institution: "SMK Negeri 4 Tangerang",
    degree: "Sekolah Menengah Kejuruan",
    major: "Teknik Komputer dan Jaringan (TKJ)",
    institutionUrl: "https://smkn4-tng.sch.id/",
    logo: "https://placehold.co/100x100/1a202c/ffffff?text=SMKN4", // Ganti dengan path logo Anda, contoh: './smkn4_logo.png'
    date: "Juli 2017 - Juni 2020",
    details: [
      "Mempelajari dasar-dasar perangkat keras, administrasi server, dan konfigurasi jaringan.",
      "Meraih Juara 2 dalam Lomba Kompetensi Siswa (LKS) tingkat kota di bidang IT Networking Support.",
      "Berhasil membangun dan mengelola laboratorium komputer sekolah sebagai bagian dari program praktik kerja.",
    ],
    skills: [
      "Network Configuration",
      "Server Administration",
      "Hardware Troubleshooting",
      "MikroTik",
      "Cisco Packet Tracer",
      "Linux OS",
      "Cybersecurity Basics",
    ],
  },
];

const Education: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="education"
      className="max-w-6xl mx-auto mt-2 py-6 px-4 sm:px-6 lg:px-8"
    >
      <style>
        {`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 40px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                `}
      </style>
      <SectionTitle title="Riwayat Pendidikan" subtitle="Edukasi" />
      <Fade duration={1000} delay={300}>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-4 lg:mt-6">
          {/* Desktop: Sidebar vertikal untuk navigasi */}
          <div className="hidden lg:flex lg:min-w-[240px] lg:w-auto">
            <div className="flex flex-col pr-8 space-y-2">
              {educationHistory.map((edu, idx) => (
                <button
                  key={edu.institution}
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
                  <span className="relative z-10 block">{edu.institution}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Konten Utama */}
          <div className="flex-1 min-w-0 bg-gray-800/20 p-6 rounded-xl shadow-2xl border border-gray-700">
            {/* Header: Gelar dan Institusi */}
            <div className="mb-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white leading-tight">
                {educationHistory[activeIndex].degree} -{" "}
                <span className="text-gray-300">
                  {educationHistory[activeIndex].major}
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <a
                  href={educationHistory[activeIndex].institutionUrl}
                  className="inline-flex items-center text-[#3498db] hover:text-[#2980b9] transition-colors duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="h-8 md:h-10 mr-3 rounded-md group-hover:scale-105 transition-transform duration-200 bg-white p-1"
                    src={educationHistory[activeIndex].logo}
                    alt={`${educationHistory[activeIndex].institution} logo`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/100x100/1a202c/ffffff?text=Logo";
                    }}
                  />
                  <span className="font-semibold text-lg md:text-xl group-hover:underline decoration-2 underline-offset-4">
                    {educationHistory[activeIndex].institution}
                  </span>
                </a>
                <p className="text-gray-400 font-medium text-base">
                  {educationHistory[activeIndex].date}
                </p>
              </div>
            </div>

            {/* Detail Pendidikan */}
            <div className="mb-6">
              <ul className="space-y-3">
                {educationHistory[activeIndex].details.map((item, i) => (
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

            {/* Mata Kuliah / Keahlian Relevan */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">
                Mata Kuliah & Keahlian Relevan:
              </h4>
              <div className="flex flex-wrap gap-2">
                {educationHistory[activeIndex].skills.map((item, i) => (
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
          {/* Mobile: Pilihan Institusi di Bawah */}
          <div className="lg:hidden mt-6 pt-4 border-t border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-3 text-center">
              Pilih Institusi
            </h4>
            <div className="flex overflow-x-auto scrollbar-thin gap-3 pb-4 px-1">
              {educationHistory.map((edu, idx) => (
                <button
                  key={edu.institution}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative px-4 py-2 font-semibold text-sm rounded-full border-2 transition-all duration-300 flex-shrink-0 whitespace-nowrap
                                    ${
                                      activeIndex === idx
                                        ? "bg-[#3498db] text-white border-[#3498db] shadow-lg shadow-[#3498db]/30"
                                        : "bg-transparent text-gray-300 border-gray-600 hover:border-[#3498db] hover:text-[#3498db]"
                                    }
                                `}
                >
                  {edu.institution}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default Education;
