import React from "react";

// --- Komponen Pendukung ---
// Didefinisikan di sini agar komponen ini mandiri dan mudah digunakan.

// Komponen untuk animasi fade-in
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

// Komponen untuk judul seksi
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

// Komponen untuk tag teknologi (chip)
const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-gray-700 text-gray-200 border border-gray-600 px-3 py-1 rounded-md text-sm font-medium">
    {children}
  </div>
);

// Komponen untuk tombol tautan proyek
const ProjectLinkButton: React.FC<{
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}> = ({ href, children, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-all duration-300 hover:bg-[#3498db] hover:shadow-lg hover:-translate-y-0.5"
  >
    {icon}
    {children}
  </a>
);

// --- Data Proyek ---
const projectList = [
  {
    image: "https://placehold.co/600x400/1a202c/3498db?text=Image+Converter", // Ganti dengan path gambar Anda
    link: "https://play.google.com/store/apps/details?id=id.haaweejee.imageconverter",
    githubLink: "https://github.com/username/image-converter", // Contoh tautan GitHub
    title: "Image Converter - JPG/WEBP/PNG",
    desc: "Konverter format gambar ringan untuk perangkat seluler, memungkinkan pengguna mengubah gambar dengan mudah ke berbagai format umum.",
    features: [
      "Konversi format JPG, WEBP, dan PNG",
      "Mendukung Kompresi Gambar",
      "Mendukung Pemotongan (Cropping) Gambar",
    ],
    tech: [
      "Kotlin",
      "Android",
      "MVVM",
      "Clean Architecture",
      "Jetpack Compose",
      "Koin",
    ],
  },
  {
    image: "https://placehold.co/600x400/1a202c/3498db?text=Urunan+Bersama", // Ganti dengan path gambar Anda
    title: "Urunan Bersama (Uber)",
    link: "",
    githubLink: "https://github.com/username/uber-project", // Contoh tautan GitHub
    desc: "Platform crowdfunding yang memungkinkan pengguna membuat dan mengelola kampanye untuk menggalang dana untuk berbagai tujuan.",
    features: [
      "Backend Golang dengan Gin Framework, Database PostgreSQL",
      "Integrasi pembayaran dengan Midtrans",
      "Aplikasi Mobile dengan Android Jetpack Compose",
    ],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Golang",
      "Gin",
      "PostgreSQL",
      "Midtrans",
      "Room",
      "Datastore",
    ],
  },
  {
    image: "https://placehold.co/600x400/1a202c/3498db?text=Jogja+POS", // Ganti dengan path gambar Anda
    title: "Jogja Pos (Android)",
    link: "",
    githubLink: "",
    desc: "Aplikasi Point of Sale (POS) untuk mengelola transaksi penjualan, inventaris, dan data pelanggan di lingkungan ritel.",
    features: [
      "Backend Golang dengan Gin Framework, Database PostgreSQL",
      "Dibangun dengan Android Jetpack Compose",
      "Mendukung Mode Offline dengan database Room",
    ],
    tech: [
      "Kotlin",
      "Android",
      "Jetpack Compose",
      "Clean Architecture",
      "Golang",
      "Gin",
      "PostgreSQL",
      "Room",
    ],
  },
];

// --- Ikon SVG ---
const PlayStoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M21.5,12c0-0.2-0.1-0.4-0.1-0.6l-3.3-3.3L3.6,3.6C3.4,3.4,3,3.6,3,4v16c0,0.4,0.4,0.6,0.6,0.4l14.5-4.5l3.3-3.3C21.4,12.4,21.5,12.2,21.5,12z M6.7,8.5l6.4,3.5l-6.4,3.5V8.5z M18,12.8l-5.1,1.6L6.7,18V6l6.2,3.4L18,11.2V12.8z" />
  </svg>
);
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12,2.2C6.5,2.2,2.2,6.5,2.2,12c0,4.3,2.8,8,6.6,9.3c0.5,0.1,0.7-0.2,0.7-0.5v-1.7c-2.7,0.6-3.3-1.3-3.3-1.3c-0.4-1.1-1.1-1.4-1.1-1.4c-0.9-0.6,0.1-0.6,0.1-0.6c1,0.1,1.5,1,1.5,1c0.9,1.5,2.3,1.1,2.9,0.8c0.1-0.7,0.3-1.1,0.6-1.3c-2.2-0.3-4.5-1.1-4.5-4.9c0-1.1,0.4-2,1-2.7c-0.1-0.3-0.5-1.3,0.1-2.7c0,0,0.8-0.3,2.7,1c0.8-0.2,1.6-0.3,2.5-0.3s1.7,0.1,2.5,0.3c1.9-1.3,2.7-1,2.7-1c0.6,1.4,0.2,2.4,0.1,2.7c0.6,0.7,1,1.6,1,2.7c0,3.8-2.3,4.6-4.5,4.9c0.4,0.3,0.7,0.9,0.7,1.8v2.7c0,0.3,0.2,0.6,0.7,0.5c3.8-1.3,6.6-5,6.6-9.3C21.8,6.5,17.5,2.2,12,2.2z" />
  </svg>
);

const Projects: React.FC = () => {
  return (
    <section id="projects" className="mx-auto mt-12 max-w-6xl px-4 py-12">
      <style>
        {`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate3d(0, 40px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                `}
      </style>
      <SectionTitle title="Riwayat Proyek" subtitle="Studi Kasus" />
      <div className="space-y-16 mt-8">
        {projectList.map((project, idx) => (
          <Fade key={idx} duration={800} delay={idx * 200}>
            <div
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-xl overflow-hidden ${
                idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Sisi Gambar */}
              <div className="w-full lg:w-1/2">
                <a
                  href={project.link || project.githubLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto aspect-video object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400/1a202c/ffffff?text=Image+Error";
                    }}
                  />
                </a>
              </div>

              {/* Sisi Deskripsi */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-5 leading-relaxed">
                  {project.desc}
                </p>

                <ul className="space-y-2 mb-6 text-gray-300">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">&#10003;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <Chip key={i}>{tech}</Chip>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.link && (
                    <ProjectLinkButton
                      href={project.link}
                      icon={<PlayStoreIcon />}
                    >
                      Lihat di Play Store
                    </ProjectLinkButton>
                  )}
                  {project.githubLink && (
                    <ProjectLinkButton
                      href={project.githubLink}
                      icon={<GitHubIcon />}
                    >
                      Lihat di GitHub
                    </ProjectLinkButton>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default Projects;
