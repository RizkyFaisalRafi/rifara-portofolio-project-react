import React, { useState, useEffect } from "react";

// --- [BAGIAN 1: KOMPONEN NAVIGASI] ---
const Navbar: React.FC = () => {
  // State untuk menu mobile, status scroll, dan seksi aktif
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Daftar item menu
  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Bootcamp", href: "#bootcamp" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Publications", href: "#publications" },
    { name: "Contact", href: "#contact" },
  ];

  // Efek untuk mengunci scroll body saat menu mobile terbuka
  useEffect(() => {
    // [PERBAIKAN SCROLL] Menggunakan class pada body lebih aman daripada mengubah style langsung
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  // Efek untuk mendeteksi scroll dan mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = menuItems.map((item) =>
        document.getElementById(item.href.substring(1))
      );
      let currentSection = "";
      for (const section of sections) {
        if (section && window.scrollY >= section.offsetTop - 100) {
          currentSection = section.id;
        }
      }
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Komponen Tautan Navigasi dengan penanda aktif
  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => {
    const isActive = activeSection === href.substring(1);
    return (
      <a
        href={href}
        onClick={() => setIsMenuOpen(false)}
        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
          isActive ? "text-[#3498db]" : "text-gray-300 hover:text-white"
        }`}
      >
        {children}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 transform bg-[#3498db] rounded-full"></span>
        )}
      </a>
    );
  };

  // Komponen Logo
  const BrandLogo = () => (
    <a
      href="#home"
      className="text-xl font-bold text-white transition-opacity hover:opacity-80"
    >
      <span className="text-[#3498db]">Rizky </span>
      <span>Faisal </span>
      <span className="text-[#00C950]">Rafi</span>
    </a>
  );

  // Tombol Utama
  const PrimaryButton: React.FC<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }> = ({ href, children, className }) => (
    <a
      href={href}
      className={`inline-block bg-[#3498db] text-white font-semibold px-5 py-2 rounded-lg shadow-lg shadow-[#3498db]/30 transition-all duration-300 hover:bg-[#2980b9] hover:shadow-xl hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </a>
  );

  // Ikon Hamburger Menu dengan Animasi
  const BurgerMenuIcon: React.FC<{ isOpen: boolean; toggle: () => void }> = ({
    isOpen,
    toggle,
  }) => (
    <button
      onClick={toggle}
      className="relative z-50 h-8 w-8 text-white focus:outline-none"
      aria-label="Toggle Menu"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45" : "-translate-y-2"
          }`}
        ></span>
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45" : "translate-y-2"
          }`}
        ></span>
      </div>
    </button>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-gray-800"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-shrink-0 items-center space-x-3">
              <img
                src="logo_besmart_hd.png"
                alt="Logo Rifara"
                className="h-10 w-10"
              />
              <BrandLogo />
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <NavLink key={item.name} href={item.href}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <PrimaryButton href="#contact">Contact Me</PrimaryButton>
            </div>
            <div className="md:hidden">
              <BurgerMenuIcon
                isOpen={isMenuOpen}
                toggle={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </nav>
      </header>
      {/* [PERBAIKAN SCROLL] Menambahkan onClick pada backdrop untuk menutup menu */}
      <div
        className={`fixed inset-0 z-30 transform transition-opacity md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm">
          <div className="mt-24 flex flex-col items-center space-y-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-gray-200 hover:text-[#3498db] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <PrimaryButton href="#contact" className="mt-4">
              Contact Me
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* <div
        className={`fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm">
          <div className="mt-24 flex flex-col items-center space-y-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-gray-200 hover:text-[#3498db] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <PrimaryButton href="#contact" className="mt-4">
              Contact Me
            </PrimaryButton>
          </div>
        </div>
      </div> */}
    </>
  );
};

// --- [BAGIAN 2: KOMPONEN HERO] ---
const Hero: React.FC = () => (
  <section
    id="home"
    className="min-h-screen flex items-center justify-center text-center px-4 relative bg-cover bg-no-repeat"
    style={{
      backgroundImage: `url('photo_with_parent.jpg')`,
      // [PERUBAHAN] Menyesuaikan posisi fokus gambar agar sedikit lebih ke bawah dari atas
      backgroundPosition: "center 17%",
    }}
  >
    {/* Lapisan overlay gelap untuk keterbacaan teks */}
    <div className="absolute inset-0 bg-black/60 z-0"></div>

    <div className="max-w-4xl relative z-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
        Rizky Faisal Rafi
      </h1>
      <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
        Seorang{" "}
        <span className="text-[#3498db] font-semibold">Mobile Developer</span> &{" "}
        <span className="text-[#3498db] font-semibold">Software Engineer</span>{" "}
        yang bersemangat dalam membangun aplikasi yang intuitif, andal, dan
        bermanfaat.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="#projects"
          className="bg-[#3498db] text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Lihat Proyek
        </a>
        <a
          href="https://drive.google.com/file/d/1Viw-9ev64CIISVf0tMWZJwRf0SCtzkXK/view?usp=sharing"
          target="_blank"
          className="bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Unduh CV
        </a>
      </div>
    </div>
  </section>
);

const SectionWithTabs: React.FC<{
  id: string;
  title: string;
  subtitle: string;
  data: any[];
}> = ({ id, title, subtitle, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!data || data.length === 0) return null;

  const activeItem = data[activeIndex];

  // --- Icon untuk tombol sertifikat ---
  const CertificateIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM9 12a1 1 0 102 0V9a1 1 0 10-2 0v3zm2-5a1 1 0 11-2 0 1 1 0 012 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <section id={id} className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">
          {subtitle}
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* [PERUBAHAN] Mengubah tata letak tombol menjadi vertikal di mobile */}
        <div className="flex flex-col gap-2 lg:w-1/4">
          {data.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              // [PERUBAHAN] Menghapus 'whitespace-nowrap' agar teks bisa wrap
              className={`text-left p-4 rounded-lg w-full transition-all duration-300 ${
                activeIndex === idx
                  ? "bg-[#3498db]/20 text-[#3498db]"
                  : "text-gray-400 hover:bg-gray-800/50"
              }`}
            >
              <h4 className="font-bold">
                {item.company || item.institution || item.name}
              </h4>
              <p className="text-sm">
                {item.role || item.degree || item.organizer}
              </p>
            </button>
          ))}
        </div>

        <div className="w-full lg:w-3/4">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {activeItem.role || activeItem.degree || activeItem.name}
                </h3>
                <a
                  href={activeItem.companyUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#3498db] hover:underline"
                >
                  {activeItem.company ||
                    activeItem.institution ||
                    activeItem.organizer}
                </a>
              </div>
              <p className="text-gray-400 mt-2 sm:mt-0 text-sm">
                {activeItem.date}
              </p>
            </div>
            <ul className="space-y-3 text-gray-300 mb-6">
              {(activeItem.details || []).map((detail: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#3498db] mt-1">&#10003;</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: detail.replace(
                        /<a /g,
                        `<a class='text-cyan-400 hover:underline' `
                      ),
                    }}
                  ></span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {(activeItem.skill || activeItem.relevantCourses || []).map(
                (skill: string, i: number) =>
                  skill && (
                    <span
                      key={i}
                      className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  )
              )}
            </div>

             {/* --- Tombol Lihat Sertifikat --- */}
            {activeItem.certificateUrl && (
              <div className="mt-6">
                <a
                  href={activeItem.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db]"
                >
                  <CertificateIcon />
                  Lihat Sertifikat
                </a>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkExperience = () => {
  const experiences = [
    {
      company: "Shan Information System",
      role: "Flutter Developer",
      companyUrl: "https://siscom.co.id/",
      date: "July 2025 - Present",
      details: [
        'Berkontribusi pada pengembangan aplikasi <a href="https://play.google.com/store/apps/details?id=com.siscom.myhris">My Hris</a>, <a href="https://play.google.com/store/apps/details?id=com.siscom.siscomhris">Siscom HRIS</a>.',
        "Bertanggung jawab dalam pengembangan dan pemeliharaan aplikasi SISCOM HRIS, My HRIS, dan Sam HRIS.",
        "Bug fixing & error resolving untuk menjaga stabilitas.",
        "Pengembangan fitur baru sesuai kebutuhan klien.",
        "Kolaborasi lintas tim (QA, web, back-end, support).",
      ],
      skill: [
        "Dart",
        "Flutter",
        "My SQL",
        "Firebase",
        "State Management GetX",
        "Git",
        "Android Studio",
        "SQLYog",
        "Postman",
        "Notion",
        "Http",
        "Shared Preferences",
        "location",
        "dartz",
        "Equatable",
        "Shimmer",
      ],
    },
    {
      company: "Anugrah Hadi Electric",
      role: "Fullstack Developer",
      companyUrl: "https://anugrahhadi.com/",
      date: "March 2024 - July 2024",
      details: [
        "Creating an Android-based E-Commerce system using the Flutter framework.",
        "Creating an admin website using the Laravel framework (Stisla Web Admin Template).",
      ],
      skill: [
        "Flutter",
        "Android",
        "Laravel",
        "Git",
        "Trello",
        "Figma",
        "My SQL",
        "Firebase Cloud Messaging",
        "Postman",
        "PHP",
        "Dart",
        "Xampp",
        "Visual Studio Code",
        "Android Studio",
        "Midtrans",
        "Raja Ongkir",
        "Navigator 2.0",
        "Build Runner",
        "Shared Preferences",
        "State Management BLOC",
        "Freezed",
        "Dartz",
        "Equatable",
        "Http",
        "Unit Testing",
      ],
    },
  ];
  return (
    <SectionWithTabs
      id="experience"
      title="Pengalaman Kerja"
      subtitle="Karier"
      data={experiences}
    />
  );
};

const Bootcamp = () => {
  const bootcampData = [
    {
      name: "Multiplatform Mobile App Development with Flutter",
      organizer: "Dicoding Indonesia",
      date: "Mei 2022 - Jun 2025",
      certificateUrl: "https://www.dicoding.com/certificates/...", // Ganti dengan URL asli
      details: [
        "Memulai Pemrograman Dengan Dart.",
        "Belajar Membuat Aplikasi Flutter untuk Pemula.",
        "Belajar Fundamental Aplikasi Flutter.",
        "Belajar Pengembangan Aplikasi Flutter Intermediate.",
        "Belajar Prinsip Pemrograman Solid.",
        "Menjadi Flutter Developer Expert.",
      ],
      relevantCourses: [
        "Dart Programming",
        "Deployment Build Apk",
        "Widget Widgets in Flutter",
        "State Management Provider & BLOC",
        "Navigation & Routing",
        "Asynchronous Programming",
        "REST API - JSON Serialization/deserialization",
        "Firebase Integration",
        "Testing (Unit Testing, Widget Testing & Integration Testing)",
        "Git & GitHub",
        "Clean Architecture & SOLID Principles",
        "MVVM Architecture",
        "sqflite",
        "Shared Preferences",
        "Flutter Animation",
        "Notification & Background Service",
        "Custom Widget",
        "Navigation 2.0 / GoRouter",
        "Image, Camera and Video Player",
        "Localization & Accessibility",
        "Flutter Web",
        "Advanced Widget",
        "Code Generation with Build Runner",
        "Maps And Location",
        "Build Variant",
        "Software Design Principles",
        "Advanced UI Design Custom Drawer",
        "Modularization",
        "CI/CD with CodeMagic",
        "Performance Optimization",
        "Security & Obfuscation",
        "Post Development",
      ],
    },

    {
      name: "2023 Complete Front-End Engineer Career With Flutter",
      organizer: "Alterra Academy",
      date: "Feb 2023 - Jun 2023",
      details: [
        "Dart Programming, Branch Management (Git), Widget in Flutter, State Management Provider and BLOC (Business Logic Component), Flutter Animation, Storage, REST API - JSON Serialization/deserialization.",
        "MVVM Architecture, Finite State Machine, Unit Testing, Widget Testing, Professional Skill (Communication, Building CV, Teamwork & Collaboration, Time & Task Management).",
      ],
      relevantCourses: [
        "Dart",
        "State Management Provider & BLOC",
        "TDD (Test Driven Development)",
        "Git & GitHub",
        "MVVM Architecture",
        "Flutter Animation",
        "REST API - JSON Serialization/deserialization",
        "Professional Skill (Communication, Building CV, Teamwork & Collaboration, Time & Task Management)",
      ],
    },

    {
      name: "Android Java For Mobile Developer",
      organizer: "Hacktiv8 (Hacktivate Teknologi Indonesia)",
      date: "Agu 2022 - Des 2022",
      details: [
        "Memahami Konsep Java Untuk Android.",
        "Memahami Konsep Kotlin Untuk Android.",
        "Mengenal Dasar - Dasar Java.",
      ],
      relevantCourses: [
        "Android Java",
        "Android Kotlin",
        "Data Local Storage (Shared Preferences, SQLite, Room)",
        "Navigation",
      ],
    },
  ];
  return (
    <SectionWithTabs
      id="bootcamp"
      title="Bootcamp & Sertifikasi"
      subtitle="Pengembangan Diri"
      data={bootcampData}
    />
  );
};

const Education = () => {
  const educationHistory = [
    {
      institution: "Universitas Raharja",
      degree: "Sarjana Komputer (S.Kom)",
      major: "Teknologi Informasi",
      date: "2020 - 2024",
      details: [
        "Aktif di organisasi kemahasiswaan (Himpunan Mahasiswa Teknik Informatika).",
        "Proyek akhir Skripsi tentang pengembangan aplikasi mobile.",
        "Meraih IPK 3.84.",
      ],
      relevantCourses: [
        "Sarjana Komputer (S.Kom)",
        "Teknik Informatika",
        "Raharja University",
        "IPK 3.84",
      ],
    },

    {
      institution: "SMK Negeri 8 Kota Tangerang",
      degree: "Sekolah Menengah Kejuruan (SMK)",
      major: "Teknik Instalasi Tenaga Listrik",
      date: "2017 - 2020",
      details: [
        "Aktif di organisasi Paskibra (PASLAVANTA).",
        "Aktif di organisasi Pramuka (Ketua Pradana).",
        "Aktif di organisasi Pramuka Saka Wirakartika.",
      ],
      relevantCourses: [
        "Sekolah Menengah Kejuruan (SMK)",
        "Teknik Instalasi Tenaga Listrik (TITL)",
        "SMK Negeri 8 Kota Tangerang",
        "Pramuka & Paskibra",
      ],
    },
  ];
  return (
    <SectionWithTabs
      id="education"
      title="Riwayat Pendidikan"
      subtitle="Edukasi"
      data={educationHistory}
    />
  );
};

// --- [BAGIAN 4: KOMPONEN RIWAYAT PROYEK] ---
const Projects: React.FC = () => {
  const projectList = [
    // AHE Shopping
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=AHE+Shopping",
      // link: "https://play.google.com/store/apps/details?id=id.haaweejee.imageconverter",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "AHE Shopping",
      desc: "E-Commerce App Flutter App and Laravel Web Admin.",
      features: [
        "Payment Gateway Midtrans",
        "RajaOngkir Integration",
        "Firebase Cloud Messaging",
        "Flutter for Mobile App",
        "Laravel for Web Admin",
        "State Management Provider",
      ],
      tech: [
        "Dart",
        "Flutter",
        "MVVM",
        "PHP",
        "Laravel",
        "MySQL",
        "Git",
        "GitHub",
        "Firebase",
        "Midtrans",
        "RajaOngkir",
        "Postman",
        "Xampp",
        "Visual Studio Code",
        "Android Studio",
        "State Management Provider",
      ],
    },

    // To Do List App
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=Todo+List+App",
      // link: "https://play.google.com/store/apps/details?id=id.haaweejee.imageconverter",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "To Do List App (Final Project (1) Bootcamp Hactiv8)",
      desc: "Aplikasi manajemen tugas harian yang dibangun sepenuhnya dengan Java Android, memungkinkan pengguna untuk menambah, mengedit, dan melacak tugas secara efisien.",
      features: [
        "Fungsionalitas CRUD (Create, Read, Update, Delete) untuk To Do List.",
        "Tandai tugas sebagai selesai atau belum selesai.",
        "Penyimpanan data lokal yang persisten.",
      ],
      tech: ["Java", "Android", "Data Local"],
    },

    // Kalkulator App
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=Kalkulator+App",
      // link: "https://play.google.com/store/apps/details?id=id.haaweejee.imageconverter",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "Kalkulator App (Final Project (2) Bootcamp Hactiv8)",
      desc: "Sebuah aplikasi kalkulator fungsional dengan antarmuka modern yang dibuat menggunakan Java Android untuk melakukan operasi perhitungan.",
      features: [
        "Mendukung operasi tambah, kurang, kali, dan bagi, sisa bagi.",
        "Fungsi 'Clear' untuk mereset / menghapus perhitungan.",
        "Antarmuka pengguna yang responsif dan intuitif.",
      ],
      tech: ["Java", "Android", "Data Local"],
    },

    // Travelgo App
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=Travelgo+App",
      // link: "https://play.google.com/store/apps/details?id=id.haaweejee.imageconverter",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "Travelgo App (Final Project (3) Bootcamp Hactiv8)",
      desc: "Aplikasi direktori wisata yang menampilkan daftar destinasi menarik. Dibangun untuk mempraktikkan pembuatan layout kompleks dan menampilkan data dalam daftar.",
      features: [
        "Menampilkan daftar destinasi wisata dengan gambar dan deskripsi singkat.",
        "Halaman detail untuk setiap destinasi.",
        "Pencarian sederhana untuk menemukan destinasi (From, To, Passengers, Departure, Class).",
      ],
      tech: ["Java", "Android", "Firebase"],
    },

    // E-Commerce App
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=E+Commerce+App",
      // link: "https://play.google.com/store/apps/details?id=id.haaweejee.imageconverter",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "Travelgo App (Final Project (4) Bootcamp Hactiv8)",
      desc: "Aplikasi E Commerce. Multi User bisa digunakan untuk memasukan barang dengan role Admin, Staff dan juga sebagai user/buyer.",
      features: [
        "CRUD Manajemen Produk.",
        "Halaman Home Produk, Detail Produk.",
        "Cart",
      ],
      tech: ["Java", "Android", "Firebase"],
    },

    // Submission Dicoding Flutter Pemula Project
    {
      image:
        "https://placehold.co/600x400/1a202c/3498db?text=Sekretariat+Kabinet",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "Sekretariat Kabinet (Submission Dicoding Pemula Project)",
      desc: "...",
      features: ["...", "...", "..."],
      tech: ["Dart", "Flutter", "___", "___", "___", "___"],
    },

    // Submission Dicoding Flutter Fundamental Project
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=Restaurant+App",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "Flutter Restaurant App (Submission Dicoding Fundamental Project)",
      desc: "...",
      features: ["", "", ""],
      tech: ["Dart", "Flutter", "___", "___", "___", "___"],
    },

    // Submission Dicoding Flutter Intermediate Project
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=Dicoding+Story",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title:
        "Flutter Dicoding Story (Submission Dicoding Intermediate Project)",
      desc: "...",
      features: ["", "", ""],
      tech: ["Dart", "Flutter", "___", "___", "___", "___"],
    },

    // Submission Dicoding Flutter Expert Project
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=Dicoding+Movie",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "Flutter Dicoding Movie (Submission Dicoding Expert Project)",
      desc: "...",
      features: ["...", "...", "..."],
      tech: ["Dart", "Flutter", "___", "___", "___", "___"],
    },

    // Submission Dicoding Kotlin Pemula Project
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=Tempat+Wisata",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "Kotlin Tempat Wisata (Submission Dicoding Pemula Project)",
      desc: "...",
      features: ["...", "...", "..."],
      tech: ["Kotlin", "Android", "___", "___", "___", "___"],
    },

    // Submission Dicoding Kotlin Fundamental Project
    {
      image: "https://placehold.co/600x400/1a202c/3498db?text=Github+User+App",
      githubLink: "https://github.com/RizkyFaisalRafi",
      title: "Kotlin Github User App (Submission Dicoding Fundamental Project)",
      desc: "...",
      features: ["...", "...", "..."],
      tech: ["Kotlin", "Android", "___", "___", "___", "___"],
    },
  ];

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
  const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm font-medium">
      {children}
    </div>
  );

  return (
    <section id="projects" className="mx-auto mt-12 max-w-6xl px-4 py-12">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">
          Studi Kasus
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Riwayat Proyek
        </h2>
      </div>
      <div className="space-y-16 mt-8">
        {projectList.map((project, idx) => (
          <div
            key={idx}
            className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-xl overflow-hidden ${
              idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full lg:w-1/2">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto aspect-video object-cover rounded-lg shadow-lg"
              />
            </div>
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
                {/* {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db]"
                  >
                    <PlayStoreIcon />
                    Lihat di Play Store
                  </a>
                )} */}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db]"
                  >
                    <GitHubIcon />
                    Lihat di GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- [BAGIAN 5: KOMPONEN PUBLIKASI JURNAL] ---

const Publications: React.FC = () => {
  const publicationList = [
    {
      title:
        "PENGEMBANGAN WEB DINAS PERPUSTAKAAN DAN ARSIP BERBASIS LARAVEL FRAMEWORK PADA DPAD KOTA TANGERANG",
      journal:
        "Jurnal Mahasiswa Teknik Informatika (Jurnal Teknologi Informasi)",
      date: "Desember 2023",
      desc: "Penelitian ini membahas pengembangan web Dinas Perpustakaan dan Arsip berbasis Laravel Framework pada DPAD Kota Tangerang untuk meningkatkan layanan perpustakaan dan arsip digital.",
      link: "https://ejournal.itn.ac.id/index.php/jati/article/view/7840",
      authors: [
        "Agam Adensa",
        "Kamilah Raihan",
        "Rizky Faisal Rafi",
        "Irwan Richwandi Putra",
        " Firda Azizah",
      ],
    },
  ];

  const DocumentIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  return (
    <section id="publications" className="mx-auto mt-12 max-w-6xl px-4 py-12">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">
          Riset & Akademik
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Publikasi Jurnal
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publicationList.map((pub, idx) => (
          <div
            key={idx}
            className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 shadow-xl flex flex-col transition-transform transform hover:-translate-y-2"
          >
            <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
            <p className="text-sm text-cyan-400 font-semibold mb-1">
              {pub.journal}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              {pub.authors.join(", ")} - {pub.date}
            </p>
            <p className="text-gray-300 flex-grow mb-6">{pub.desc}</p>
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db] self-start"
            >
              <DocumentIcon />
              Baca Publikasi
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- [BAGIAN 6: KOMPONEN KONTAK] ---
const Contact: React.FC = () => {
  const CommunicationIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-10 h-10 text-gray-300"
    >
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  );

  const Microsoft365Icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-10 h-10"
    >
      <path fill="#F25022" d="M11.25 3H3.75v7.5h7.5V3z" />
      <path fill="#7FBA00" d="M20.25 3h-7.5v7.5h7.5V3z" />
      <path fill="#00A4EF" d="M11.25 12.75H3.75v7.5h7.5v-7.5z" />
      <path fill="#FFB900" d="M20.25 12.75h-7.5v7.5h7.5v-7.5z" />
    </svg>
  );

  const skills = [
    {
      name: "Flutter",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg"
          alt="Flutter"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Kotlin",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg"
          alt="Kotlin"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Dart",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg"
          alt="Dart"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Java",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
          alt="Java"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Laravel",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg"
          alt="Laravel"
          className="w-10 h-10"
        />
      ),
    },

    {
      name: "PHP",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg"
          alt="PHP"
          className="w-10 h-10"
        />
      ),
    },

    {
      name: "Firebase",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg"
          alt="Firebase"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "UI/UX Design",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg"
          alt="UI/UX Design"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "MY SQL",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg"
          alt="MY SQL"
          className="w-10 h-10"
        />
      ),
    },

    {
      name: "Trello",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg"
          alt="Trello"
          className="w-10 h-10"
        />
      ),
    },

    {
      name: "Notion",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg"
          alt="Notion"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Postman",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
          alt="Postman"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Microsoft 365",
      icon: <Microsoft365Icon />,
    },

    {
      name: "Communi\ncation",
      icon: <CommunicationIcon />,
    },
  ];

  return (
    <section id="contact" className="max-w-6xl mx-auto py-12 px-4">
      <div className="bg-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-800 shadow-2xl text-center">
        <h2 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">
          Kontak & Keahlian
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Mari Berkolaborasi!
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Punya proyek menarik? Saya selalu terbuka untuk diskusi, peluang, dan
          ide-ide baru. Jangan ragu menghubungi saya.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold text-white bg-[#3498db] rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Hubungi di LinkedIn
          </a>
          <a
            href="https://wa.me/62895412892094"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Chat di WhatsApp
          </a>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Tools & Teknologi yang Saya Kuasai
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-transform duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                {skill.icon}
                <p className="font-semibold text-white text-xs text-cex`nter">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- [BAGIAN 6: KOMPONEN TESTIMONI] ---
const Testimonials: React.FC = () => {
  const testimonialList = [
    {
      quote:
        "Rizky adalah developer yang sangat berdedikasi dan cepat belajar. Kemampuannya dalam Flutter sangat membantu tim kami dalam menyelesaikan proyek tepat waktu.",
      name: "Nama Atasan",
      title: "Project Manager, Shan Information System",
      avatar: "https://placehold.co/100x100/3498db/ffffff?text=NA",
    },
    {
      quote:
        "Sangat senang bekerja sama dengan Rizky. Dia tidak hanya handal dalam coding, tetapi juga memiliki kemampuan komunikasi yang baik dan proaktif dalam memberikan solusi.",
      name: "Nama Rekan Kerja",
      title: "UI/UX Designer",
      avatar: "https://placehold.co/100x100/2ecc71/ffffff?text=NR",
    },
  ];

  return (
    <section id="testimonials" className="mx-auto mt-12 max-w-6xl px-4 py-12">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">
          Apresiasi
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Apa Kata Mereka
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonialList.map((testimonial, idx) => (
          <div
            key={idx}
            className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 shadow-xl text-center"
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#3498db]"
            />
            <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
            <h4 className="font-bold text-white">{testimonial.name}</h4>
            <p className="text-sm text-gray-400">{testimonial.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- [BAGIAN 7: KOMPONEN FOOTER] ---
const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="text-2xl font-bold mb-4 text-white">
          <span className="text-[#3498db]">Rizky </span>
          <span>Faisal </span>
          <span className="text-[#00C950]">Rafi</span>
        </div>
        <nav className="flex justify-center gap-6 sm:gap-8 mb-8 flex-wrap">
          <a className="text-gray-300 hover:text-[#3498db]" href="#home">
            Home
          </a>
          <a className="text-gray-300 hover:text-[#3498db]" href="#experience">
            Experience
          </a>
          <a className="text-gray-300 hover:text-[#3498db]" href="#projects">
            Projects
          </a>
          <a className="text-gray-300 hover:text-[#3498db]" href="#contact">
            Contact
          </a>
        </nav>
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rizky Faisal Rafi. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

// --- [BAGIAN 8: KOMPONEN UTAMA APLIKASI] ---

const App: React.FC = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen m-0 p-0 bg-gray-900 text-white overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3498db]/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow animation-delay-4000"></div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <WorkExperience />
          <Bootcamp />
          <Education />
          <Projects />
          <Publications />
          <Contact />
          {/* <Testimonials /> */}
        </main>
        <Footer />
      </div>

      {showTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#3498db] hover:bg-[#2176bd] text-white rounded-full w-14 h-14 shadow-lg transition-all flex items-center justify-center transform hover:scale-110"
          aria-label="Back to Top"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        .animate-pulse-slow { animation: pulse-slow 10s infinite ease-in-out; }
        .animation-delay-4000 { animation-delay: -5s; }
      `}</style>
    </div>
  );
};

export default App;
