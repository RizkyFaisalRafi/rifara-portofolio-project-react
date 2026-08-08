import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

// --- [KOMPONEN PEMBANTU: Auto-Scroll saat berpindah hash] ---
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
};

// --- [BAGIAN 1: KOMPONEN NAVIGASI] ---
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Menu sudah disatukan di 1 page
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/#experience" },
    { name: "Bootcamp & Certificates", href: "/#bootcamp" },
    { name: "Education", href: "/#education" },
    { name: "Projects", href: "/#projects" },
    { name: "Microsoft 365", href: "/#microsoft-365" },
    { name: "Publications", href: "/#publications" },
    { name: "Contact", href: "/#contact" },
  ];

  // Perbaikan Scroll Body
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup function mencegah bug scroll stuck
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = menuItems
        .filter((item) => item.href.startsWith("/#"))
        .map((item) => document.getElementById(item.href.substring(2)));

      let currentSection = "home";
      if (window.scrollY < 100) {
        currentSection = "home";
      } else {
        for (const section of sections) {
          if (section && window.scrollY >= section.offsetTop - 150) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Hapus dependency yang tidak perlu

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    let isActive = false;
    if (href === "/") {
      isActive = activeSection === "home";
    } else if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      isActive = activeSection === sectionId;
    }

    return (
      <Link
        to={href}
        onClick={() => setIsMenuOpen(false)}
        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
          isActive ? "text-[#3498db]" : "text-gray-300 hover:text-white"
        }`}
      >
        {children}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 transform bg-[#3498db] rounded-full"></span>
        )}
      </Link>
    );
  };

  const BrandLogo = () => (
    <Link to="/" className="text-xl font-bold text-white transition-opacity hover:opacity-80">
      <span className="text-[#3498db]">Rizky </span>
      <span>Faisal </span>
      <span className="text-[#00C950]">Rafi</span>
    </Link>
  );

  const PrimaryButton: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ to, children, className }) => (
    <Link
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={`inline-block bg-[#3498db] text-white font-semibold px-5 py-2 rounded-lg shadow-lg shadow-[#3498db]/30 transition-all duration-300 hover:bg-[#2980b9] hover:shadow-xl hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </Link>
  );

  const BurgerMenuIcon: React.FC<{ isOpen: boolean; toggle: () => void }> = ({ isOpen, toggle }) => (
    <button onClick={toggle} className="relative z-50 h-8 w-8 text-white focus:outline-none" aria-label="Toggle Menu">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <span className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${isOpen ? "rotate-45" : "-translate-y-2"}`}></span>
        <span className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}></span>
        <span className={`absolute block h-0.5 w-6 transform bg-current transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45" : "translate-y-2"}`}></span>
      </div>
    </button>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-800" : "bg-transparent"}`}>
        <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-shrink-0 items-center space-x-3">
              <img src="logo_besmart_hd.png" alt="Logo Rifara" className="h-10 w-10" />
              <BrandLogo />
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <NavLink key={item.name} href={item.href}>{item.name}</NavLink>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <PrimaryButton to="/#contact">Contact Me</PrimaryButton>
            </div>
            <div className="lg:hidden">
              <BurgerMenuIcon isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-30 transform transition-opacity lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {/* Overlay ditambahkan penanganan scroll dan klik */}
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-md overflow-y-auto" onClick={() => setIsMenuOpen(false)}>
          <div className="min-h-full flex flex-col items-center justify-center space-y-8 pb-10 pt-24" onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold text-gray-200 hover:text-[#3498db] transition-colors">
                {item.name}
              </Link>
            ))}
            <PrimaryButton to="/#contact" className="mt-4">Contact Me</PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

// --- [BAGIAN 2: KOMPONEN HERO] ---
const Hero: React.FC = () => (
  <section id="home" className="min-h-screen flex items-center justify-center text-center px-4 relative bg-cover bg-no-repeat" style={{ backgroundImage: `url('photo_with_parent.jpg')`, backgroundPosition: "center 17%" }}>
    <div className="absolute inset-0 bg-black/60 z-0"></div>
    <div className="max-w-4xl relative z-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">Rizky Faisal Rafi</h1>
      <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
        Seorang <span className="text-[#3498db] font-semibold">Mobile Developer</span> & <span className="text-[#3498db] font-semibold">Software Engineer</span> yang bersemangat dalam membangun aplikasi yang intuitif, andal, dan bermanfaat.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/#projects" className="bg-[#3498db] text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">Lihat Proyek</Link>
        <a href="https://drive.google.com/file/d/1Viw-9ev64CIISVf0tMWZJwRf0SCtzkXK/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">Unduh CV</a>
        <a href="https://docs.google.com/presentation/d/1VPoWSX7t2qAgI5RfQ3S5GoExeZwX7Y2CVR0EHfT5ah0/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="border-2 border-gray-500 text-gray-300 font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#3498db] hover:text-white">Portofolio Aktif</a>
      </div>
    </div>
  </section>
);

// --- [KOMPONEN SECTION TAB] ---
const SectionWithTabs: React.FC<{ id: string; title: string; subtitle: string; data: any[] }> = ({ id, title, subtitle, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!data || data.length === 0) return null;
  const activeItem = data[activeIndex];

  const CertificateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM9 12a1 1 0 102 0V9a1 1 0 10-2 0v3zm2-5a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
    </svg>
  );

  return (
    <section id={id} className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">{subtitle}</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-2 lg:w-1/4">
          {data.map((item, idx) => (
            <button key={idx} onClick={() => setActiveIndex(idx)} className={`text-left p-4 rounded-lg w-full transition-all duration-300 ${activeIndex === idx ? "bg-[#3498db]/20 text-[#3498db]" : "text-gray-400 hover:bg-gray-800/50"}`}>
              <h4 className="font-bold">{item.company || item.institution || item.name}</h4>
              <p className="text-sm">{item.role || item.degree || item.organizer}</p>
            </button>
          ))}
        </div>
        <div className="w-full lg:w-3/4">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{activeItem.role || activeItem.degree || activeItem.name}</h3>
                <a href={activeItem.companyUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-lg text-[#3498db] hover:underline">{activeItem.company || activeItem.institution || activeItem.organizer}</a>
              </div>
              <p className="text-gray-400 mt-2 sm:mt-0 text-sm">{activeItem.date}</p>
            </div>
            <ul className="space-y-3 text-gray-300 mb-6">
              {(activeItem.details || []).map((detail: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#3498db] mt-1">&#10003;</span>
                  <span dangerouslySetInnerHTML={{ __html: detail.replace(/<a /g, `<a class='text-cyan-400 hover:underline' `)}}></span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {(activeItem.skill || activeItem.relevantCourses || []).map((skill: string, i: number) => skill && (
                <span key={i} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-xs font-medium">{skill}</span>
              ))}
            </div>
            {activeItem.certificateUrl && (
              <div className="mt-6">
                <a href={activeItem.certificateUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db]">
                  <CertificateIcon /> Lihat Sertifikat
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- [BAGIAN 3: DATA PENGALAMAN & EDUKASI] ---
const WorkExperience = () => {
  const experiences = [
    { company: "Shan Information System", role: "Flutter Developer", companyUrl: "https://siscom.co.id/", date: "July 2025 - Present", details: ['Berkontribusi pada pengembangan aplikasi <a href="https://play.google.com/store/apps/details?id=com.siscom.myhris">My Hris</a>, <a href="https://play.google.com/store/apps/details?id=com.siscom.siscomhris">Siscom HRIS</a>.', "Bertanggung jawab dalam pengembangan dan pemeliharaan aplikasi SISCOM HRIS, My HRIS, dan Sam HRIS.", "Bug fixing & error resolving untuk menjaga stabilitas.", "Pengembangan fitur baru sesuai kebutuhan klien.", "Kolaborasi lintas tim (QA, web, back-end, support)."], skill: ["Dart", "Flutter", "My SQL", "Firebase", "State Management GetX", "Git", "Android Studio", "SQLYog", "Postman", "Notion", "Http", "Shared Preferences", "location", "dartz", "Equatable", "Shimmer"] },
    { company: "Anugrah Hadi Electric", role: "Fullstack Developer", companyUrl: "https://anugrahhadi.com/", date: "March 2024 - July 2024", certificateUrl: 'https://drive.google.com/file/d/1pYO9sTYYpDjX3tSWPuXt86alOSQlzrdg/view?usp=sharing', details: ["Creating an Android-based E-Commerce system using the Flutter framework.", "Creating an admin website using the Laravel framework (Stisla Web Admin Template)."], skill: ["Flutter", "Android", "Laravel", "Git", "Trello", "Figma", "My SQL", "Firebase Cloud Messaging", "Postman", "PHP", "Dart", "Xampp", "Visual Studio Code", "Android Studio", "Midtrans", "Raja Ongkir", "Navigator 2.0", "Build Runner", "Shared Preferences", "State Management BLOC", "Freezed", "Dartz", "Equatable", "Http", "Unit Testing"] },
    { company: "Toko Banyumas", role: "Store Crew and Manager for my family-owned retail business", companyUrl: "https://toko.rizkyfaisalrafi.id/", date: "January 2020 - Present", details: ["As a Store Crew and Manager for my family-owned retail business, I oversaw daily operations, including inventory monitoring and procurement from wholesale suppliers to ensure consistent product availability. I handled cashiering and customer service with high efficiency. Furthermore, I leveraged my technical background to develop and implement a custom Point of Sale (POS) system to digitalize transaction records and stock management."], skill: ["Inventory Management", "Procurement", "Customer Service", "Cashiering", "Point of Sale (POS) System Development", "Digitalization of Transaction Records"] },
    { company: "Driver GrabCar GoCar", role: "Driver Online", date: "June 2022 - Present", details: ["Provide safe, reliable, and comfortable transportation services to passengers through the GrabCar and GoCar platforms. Consistently maintain a high level of customer service with friendly and professional communication, resulting in a 5-star performance rating from passengers."], skill: ["Safe Driving", "Customer Service", "Navigation", "Time Management"] },
  ];
  return <SectionWithTabs id="experience" title="Pengalaman Kerja" subtitle="Karier" data={experiences} />;
};

const Bootcamp = () => {
  const bootcampData = [
    { name: "Multiplatform Mobile App Development with Flutter", organizer: "Dicoding Indonesia", date: "Mei 2022 - Jun 2025", certificateUrl: "https://drive.google.com/file/d/1C2s3ndu3S9KVdPF2P740BFTsc5txdgsl/view?usp=sharing", details: ["Memulai Pemrograman Dengan Dart.", "Belajar Membuat Aplikasi Flutter untuk Pemula.", "Belajar Fundamental Aplikasi Flutter.", "Belajar Pengembangan Aplikasi Flutter Intermediate.", "Belajar Prinsip Pemrograman Solid.", "Menjadi Flutter Developer Expert."], relevantCourses: ["Dart Programming", "Deployment Build Apk", "Widget Widgets in Flutter", "State Management Provider & BLOC", "Navigation & Routing", "Asynchronous Programming", "REST API - JSON Serialization/deserialization", "Firebase Integration", "Testing (Unit Testing, Widget Testing & Integration Testing)", "Git & GitHub", "Clean Architecture & SOLID Principles", "MVVM Architecture", "sqflite", "Shared Preferences", "Flutter Animation", "Notification & Background Service", "Custom Widget", "Navigation 2.0 / GoRouter", "Image, Camera and Video Player", "Localization & Accessibility", "Flutter Web", "Advanced Widget", "Code Generation with Build Runner", "Maps And Location", "Build Variant", "Software Design Principles", "Advanced UI Design Custom Drawer", "Modularization", "CI/CD with CodeMagic", "Performance Optimization", "Security & Obfuscation", "Post Development"] },
    { name: "2023 Complete Front-End Engineer Career With Flutter", organizer: "Alterra Academy", date: "Feb 2023 - Jun 2023", certificateUrl: "https://drive.google.com/file/d/1q3LQppiF38NcGB97gvo6v3MM4G2vtevx/view?usp=sharing", details: ["Dart Programming, Branch Management (Git), Widget in Flutter, State Management Provider and BLOC (Business Logic Component), Flutter Animation, Storage, REST API - JSON Serialization/deserialization.", "MVVM Architecture, Finite State Machine, Unit Testing, Widget Testing, Professional Skill (Communication, Building CV, Teamwork & Collaboration, Time & Task Management)."], relevantCourses: ["Dart", "State Management Provider & BLOC", "TDD (Test Driven Development)", "Git & GitHub", "MVVM Architecture", "Flutter Animation", "REST API - JSON Serialization/deserialization", "Professional Skill (Communication, Building CV, Teamwork & Collaboration, Time & Task Management)"] },
    { name: "Android Java For Mobile Developer", organizer: "Hacktiv8 (Hacktivate Teknologi Indonesia)", date: "Agu 2022 - Des 2022", certificateUrl: "https://drive.google.com/file/d/195gadyKUWLYtnCjKGthMsLyUZwHUl5Za/view?usp=sharing", details: ["Memahami Konsep Java Untuk Android.", "Memahami Konsep Kotlin Untuk Android.", "Mengenal Dasar - Dasar Java."], relevantCourses: ["Android Java", "Android Kotlin", "Data Local Storage (Shared Preferences, SQLite, Room)", "Navigation"] },
    { name: "Operator Forklift", organizer: "Kautsar Academy by PT Kautsar Inti Prima - Class 2 Forklift Operator SIO Kemnaker", date: "April 2026", certificateUrl: "https://drive.google.com/file/d/1suvWguewV9VcIOVA_SYA24YEsH6pvuLm/view?usp=sharing?", details: ["Memahami Konsep Dasar Forklift.", "Memahami Konsep Dasar Keselamatan Kerja Forklift.", "Mengenal Dasar - Dasar Forklift.", "Keselamatan Kerja Forklift.", "Safety Forklift.", "Driving Forklift."], relevantCourses: ["Forklift Operator SIO Kemnaker", "Safety Forklift", "Driving Forklift"] },
    { name: "BNSP - Operator Komputer", organizer: "Dinas Ketenagakerjaan Kota Tangerang", date: "July 2026 - Present", details: ["Proficient in Microsoft Word for document formatting, layout design, and professional document preparation.", "Skilled in Microsoft Excel, including complex formulas, data cleaning, data management, PivotTables, PivotCharts, dashboard creation, etc.", "Experienced in Microsoft PowerPoint for presentation design and content development, with certified competency and practical exercise experience."], relevantCourses: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "BNSP - Operator Komputer"] },
  ];
  return <SectionWithTabs id="bootcamp" title="Bootcamp & Sertifikasi" subtitle="Pengembangan Diri" data={bootcampData} />;
};

const Education = () => {
  const educationHistory = [
    { institution: "Universitas Raharja", degree: "Sarjana Komputer (S.Kom)", major: "Teknologi Informasi", date: "2020 - 2024", certificateUrl: "https://drive.google.com/file/d/1kwl6o_l5I91cH4MsTRVNricukyzq5vie/view?usp=sharing", details: ["Aktif di organisasi kemahasiswaan (Himpunan Mahasiswa Teknik Informatika).", "Proyek akhir Skripsi tentang pengembangan aplikasi mobile.", "Meraih IPK 3.84."], relevantCourses: ["Sarjana Komputer (S.Kom)", "Teknik Informatika", "Raharja University", "IPK 3.84"] },
    { institution: "SMK Negeri 8 Kota Tangerang", degree: "Sekolah Menengah Kejuruan (SMK)", major: "Teknik Instalasi Tenaga Listrik", certificateUrl: "https://drive.google.com/file/d/1FkqO-Csau7bGg-cUCDmc0gFLay4QSdpR/view?usp=sharing", date: "2017 - 2020", details: ["Aktif di organisasi Paskibra (PASLAVANTA).", "Aktif di organisasi Pramuka (Ketua Pradana).", "Aktif di organisasi Pramuka Saka Wirakartika."], relevantCourses: ["Sekolah Menengah Kejuruan (SMK)", "Teknik Instalasi Tenaga Listrik (TITL)", "SMK Negeri 8 Kota Tangerang", "Pramuka & Paskibra"] },
  ];
  return <SectionWithTabs id="education" title="Riwayat Pendidikan" subtitle="Edukasi" data={educationHistory} />;
};

// --- [BAGIAN 4: KOMPONEN RIWAYAT PROYEK MOBILE/WEB] ---
const Projects: React.FC = () => {
  const projectList = [
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Screenshot+Smart+Home+Pro", link: "https://play.google.com/store/apps/details?id=com.rifara.screenshootBesmartIndonesiaGemilang&pcampaignid=web_share", title: "Screenshot Smart Pro", desc: "Screenshot Layar dengan Jendela Mengambang dan Rekam Layar Suara Dengan Kualitas HD.", features: ["SCREENSHOT LAYAR DENGAN JENDELA MENGAMBANG", "REKAM LAYAR DENGAN SUARA", "KUALITAS HD", "FREE"], tech: ["Dart", "Flutter", 'Widget "Floating Action Button"', 'With Native Code', "MVVM", "Git", "GitHub", "Firebase", "Android Studio", "State Management Provider"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=AHE+Shopping", githubLink: "https://github.com/FinalProjectRifara/flutter_online_shop_app-ahe", title: "AHE Shopping", desc: "E-Commerce App Flutter App and Laravel Web Admin.", features: ["Payment Gateway Midtrans", "RajaOngkir Integration", "Firebase Cloud Messaging", "Flutter for Mobile App", "Laravel for Web Admin", "State Management Provider"], tech: ["Dart", "Flutter", "MVVM", "PHP", "Laravel", "MySQL", "Git", "GitHub", "Firebase", "Midtrans", "RajaOngkir", "Postman", "Xampp", "Visual Studio Code", "Android Studio", "State Management Provider"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Todo+List+App", githubLink: "https://github.com/RizkyFaisalRafi/Final-Project-1", title: "To Do List App (Final Project (1) Bootcamp Hactiv8)", desc: "Aplikasi manajemen tugas harian yang dibangun sepenuhnya dengan Java Android, memungkinkan pengguna untuk menambah, mengedit, dan melacak tugas secara efisien.", features: ["Fungsionalitas CRUD (Create, Read, Update, Delete) untuk To Do List.", "Tandai tugas sebagai selesai atau belum selesai.", "Penyimpanan data lokal yang persisten."], tech: ["Java", "Android", "Data Local"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Kalkulator+App", githubLink: "https://github.com/RizkyFaisalRafi/FinalProject3", title: "Kalkulator App (Final Project (2) Bootcamp Hactiv8)", desc: "Sebuah aplikasi kalkulator fungsional dengan antarmuka modern yang dibuat menggunakan Java Android untuk melakukan operasi perhitungan.", features: ["Mendukung operasi tambah, kurang, kali, dan bagi, sisa bagi.", "Fungsi 'Clear' untuk mereset / menghapus perhitungan.", "Antarmuka pengguna yang responsif dan intuitif."], tech: ["Java", "Android", "Data Local"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Travelgo+App", githubLink: "https://github.com/RizkyFaisalRafi/FinalProject4", title: "Travelgo App (Final Project (3) Bootcamp Hactiv8)", desc: "Aplikasi direktori wisata yang menampilkan daftar destinasi menarik. Dibangun untuk mempraktikkan pembuatan layout kompleks dan menampilkan data dalam daftar.", features: ["Menampilkan daftar destinasi wisata dengan gambar dan deskripsi singkat.", "Halaman detail untuk setiap destinasi.", "Pencarian sederhana untuk menemukan destinasi (From, To, Passengers, Departure, Class)."], tech: ["Java", "Android", "Firebase"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=E+Commerce+App", githubLink: "https://github.com/RizkyFaisalRafi/Final_Project_2", title: "Travelgo App (Final Project (4) Bootcamp Hactiv8)", desc: "Aplikasi E Commerce. Multi User bisa digunakan untuk memasukan barang dengan role Admin, Staff dan juga sebagai user/buyer.", features: ["CRUD Manajemen Produk.", "Halaman Home Produk, Detail Produk.", "Cart"], tech: ["Java", "Android", "Firebase"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Sekretariat+Kabinet", githubLink: "https://github.com/RizkyFaisalRafi/kabinet_indonesia", title: "Sekretariat Kabinet (Submission Dicoding Pemula Project)", desc: "APLIKASI INFORMASI KABINET INDONESIA", features: ["Informasi Kabinet", "Detail Kabinet", "Data Local"], tech: ["Dart", "Flutter", "Data Dummy"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Restaurant+App", githubLink: "https://github.com/RizkyFaisalRafi", title: "Flutter Restaurant App (Submission Dicoding Fundamental Project)", desc: "Tahap Development Web", features: ["", "", ""], tech: ["Dart", "Flutter", "___", "___", "___", "___"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Dicoding+Story", githubLink: "https://tree-sunstone-9a8.notion.site/Documentation-Portofolio-1e9169cf35a2804d81f9e146a6104bdb", title: "Flutter Dicoding Story (Submission Dicoding Intermediate Project)", desc: "Tahap Development Web", features: ["", "", ""], tech: ["Dart", "Flutter", "___", "___", "___", "___"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Dicoding+Movie", githubLink: "https://github.com/RizkyFaisalRafi/ditonton_clean_architecture/tree/Second-Submission", title: "Flutter Dicoding Movie (Submission Dicoding Expert Project)", desc: "Tahap Development Web", features: ["...", "...", "..."], tech: ["Dart", "Flutter", "___", "___", "___", "___"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Tempat+Wisata", githubLink: "https://github.com/RizkyFaisalRafi/Tempat_Wisata_Popular_App", title: "Kotlin Tempat Wisata (Submission Dicoding Pemula Project)", desc: "Tahap Development Web", features: ["...", "...", "..."], tech: ["Kotlin", "Android", "___", "___", "___", "___"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Github+User+App", githubLink: "https://github.com/RizkyFaisalRafi/Github_User", title: "Kotlin Github User App (Submission Dicoding Fundamental Project)", desc: "Tahap Development Web", features: ["...", "...", "..."], tech: ["Kotlin", "Android", "___", "___", "___", "___"] },
  ];

  const PlayStoreIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.5,12c0-0.2-0.1-0.4-0.1-0.6l-3.3-3.3L3.6,3.6C3.4,3.4,3,3.6,3,4v16c0,0.4,0.4,0.6,0.6,0.4l14.5-4.5l3.3-3.3C21.4,12.4,21.5,12.2,21.5,12z M6.7,8.5l6.4,3.5l-6.4,3.5V8.5z M18,12.8l-5.1,1.6L6.7,18V6l6.2,3.4L18,11.2V12.8z" /></svg>);
  const GitHubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.2C6.5,2.2,2.2,6.5,2.2,12c0,4.3,2.8,8,6.6,9.3c0.5,0.1,0.7-0.2,0.7-0.5v-1.7c-2.7,0.6-3.3-1.3-3.3-1.3c-0.4-1.1-1.1-1.4-1.1-1.4c-0.9-0.6,0.1-0.6,0.1-0.6c1,0.1,1.5,1,1.5,1c0.9,1.5,2.3,1.1,2.9,0.8c0.1-0.7,0.3-1.1,0.6-1.3c-2.2-0.3-4.5-1.1-4.5-4.9c0-1.1,0.4-2,1-2.7c-0.1-0.3-0.5-1.3,0.1-2.7c0,0,0.8-0.3,2.7,1c0.8-0.2,1.6-0.3,2.5-0.3s1.7,0.1,2.5,0.3c1.9-1.3,2.7-1,2.7-1c0.6,1.4,0.2,2.4,0.1,2.7c0.6,0.7,1,1.6,1,2.7c0,3.8-2.3,4.6-4.5,4.9c0.4,0.3,0.7,0.9,0.7,1.8v2.7c0,0.3,0.2,0.6,0.7,0.5c3.8-1.3,6.6-5,6.6-9.3C21.8,6.5,17.5,2.2,12,2.2z" /></svg>);
  const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (<div className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm font-medium">{children}</div>);

  return (
    <section id="projects" className="mx-auto mt-12 max-w-6xl px-4 py-12">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Studi Kasus</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Riwayat Proyek</h2>
      </div>
      <div className="space-y-16 mt-8">
        {projectList.map((project, idx) => (
          <div key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-xl overflow-hidden ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
            <div className="w-full lg:w-1/2">
              <img src={project.image} alt={project.title} className="w-full h-auto aspect-video object-cover rounded-lg shadow-lg" />
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-5 leading-relaxed">{project.desc}</p>
              <ul className="space-y-2 mb-6 text-gray-300">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => <Chip key={i}>{tech}</Chip>)}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db]">
                    <PlayStoreIcon /> Lihat di Play Store
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db]">
                    <GitHubIcon /> Lihat di GitHub
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

// --- [BAGIAN KOMPONEN MICROSOFT 365 DENGAN FITUR DOWNLOAD & DATABASE DATA PENGUNDUH] ---
const ProjectCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Perbaikan Scroll Body Modal
  React.useEffect(() => {
    if (isModalOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <>
      <div className="relative w-full h-auto aspect-video group overflow-hidden rounded-lg shadow-lg border border-gray-700 cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <img src={images[currentIndex]} alt={`${title} - slide ${currentIndex + 1}`} className="w-full h-full object-cover transition-transform duration-500 bg-gray-800 group-hover:scale-105" />
        <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
        </div>
        {images.length > 1 && (
          <>
            <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-2xl rounded-full p-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#3498db]" onClick={prevSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </div>
            <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 text-2xl rounded-full p-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#3498db]" onClick={nextSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </div>
            <div className="absolute bottom-2 w-full flex justify-center py-2" onClick={(e) => e.stopPropagation()}>
              {images.map((_, slideIndex) => (
                <div key={slideIndex} onClick={() => setCurrentIndex(slideIndex)} className={`w-2 h-2 mx-1 rounded-full cursor-pointer transition-colors ${currentIndex === slideIndex ? "bg-[#3498db]" : "bg-gray-400/70 hover:bg-white"}`}></div>
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <button className="absolute top-6 right-6 text-white hover:text-[#3498db] z-[101] p-2 bg-black/50 rounded-full transition-colors" onClick={() => setIsModalOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img src={images[currentIndex]} alt={`${title} - fullscreen`} className="max-w-full max-h-[90vh] object-contain cursor-default rounded-md shadow-2xl" onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <>
              <button className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white p-3 bg-black/50 hover:bg-[#3498db] rounded-full z-[101] transition-colors" onClick={prevSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
              <button className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white p-3 bg-black/50 hover:bg-[#3498db] rounded-full z-[101] transition-colors" onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

// --- KOMPONEN UTAMA MS 365 TERINTEGRASI SIMPAN DATABASE & MODEL LIHAT DATA ---
const Microsoft365Projects: React.FC = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadName, setDownloadName] = useState("");
  const [downloadPhone, setDownloadPhone] = useState("");
  const [selectedExcelUrl, setSelectedExcelUrl] = useState("");

  const [isViewDataModalOpen, setIsViewDataModalOpen] = useState(false);
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);
  const [adminPin, setAdminPin] = useState("");

  const [downloaders, setDownloaders] = useState<
    Array<{ id: number; name: string; phone: string; timestamp: string }>
  >(() => {
    const savedData = localStorage.getItem("excel_downloaders_db");
    return savedData ? JSON.parse(savedData) : [];
  });

  const ms365List = [
    // Template Excel 1
    {
      images: ["/excel/1/image.png"],
      pdfUrl: "/excel/1/AbsensiBulananRekapGajiByRIFARA.pdf",
      excelUrl: "/excel/1/TemplateAbsensiBulananRekapGajibyRIFARA.xlsx",
      title: "Absensi Bulanan & Penggajian Otomatis (Automated HR & Payroll System)",
      desc: "Pembuatan sistem rekapitulasi absensi dan kalkulasi penggajian karyawan bulanan yang terintegrasi. Menggunakan formula dinamis dan logika perhitungan bersyarat untuk melacak kehadiran, cuti, serta menghitung gaji bersih (Take-Home Pay) secara otomatis dan akurat.",
      features: ["Otomatisasi Kalkulasi Penggajian: Perhitungan gaji pokok, tunjangan, dan potongan kehadiran secara real-time.", "Rekapitulasi Data Bersyarat: Penggunaan COUNTIF dengan wildcard untuk melacak berbagai kode status cuti karyawan.", "Keamanan Data (Data Protection): Implementasi penguncian sel (Locked Cells) untuk melindungi integritas formula.", "Manajemen Tanggal & Teks Dinamis: Ekstraksi hari dan tanggal menggunakan kombinasi formula LEFT, TEXT, dan DATE."],
      tech: ["Microsoft Excel", "HR Analytics", "Payroll Automation", "Formula & Logic"],
    },

    // Template Excel 2
    {
      images: ["/excel/2/image1.png", "/excel/2/image2.png"],
      pdfUrl: "/excel/2/Faktur_Invoice_By_RIFARA.pdf",
      excelUrl: "/excel/2/Faktur_Invoice_By_RIFARA.xlsx",
      title: "Generator Faktur Penjualan Otomatis (Automated Sales Invoice Generator)",
      desc: "Pembuatan template faktur penjualan dinamis yang dirancang untuk mempercepat proses penagihan dan administrasi. Sistem ini menggunakan kombinasi fitur validasi data dan formula pencarian untuk mengisi detail pelanggan serta melakukan kalkulasi transaksi secara otomatis, sehingga meminimalisir kesalahan input manual (human error).",
      features: ["Otomatisasi Data Pelanggan: Implementasi Data Validation (Dropdown List) yang dipadukan dengan formula VLOOKUP untuk memanggil data alamat dan kontak pelanggan secara instan berdasarkan nama perusahaan.", "Kalkulasi Harga Dinamis: Perhitungan otomatis dan akurat untuk Sub Total, Total Diskon, perhitungan Pajak (10%), hingga Total Akhir (Yang Dibayar) menggunakan fungsi matematika dasar dan SUM.", "Manajemen Basis Data Terstruktur: Memanfaatkan tabel referensi terpisah (Master Data) untuk menyimpan daftar pelanggan secara rapi, sehingga pembuatan faktur baru menjadi jauh lebih cepat dan efisien.", "Desain Profesional & Siap Cetak: Tata letak (layout) faktur yang bersih, terstruktur, dan telah diatur area cetaknya (Print Area) agar formatnya tetap rapi saat diekspor ke PDF maupun dicetak langsung."],
      tech: ["Microsoft Excel", "Sales Automation", "VLOOKUP & Data Validation", "Formula & Logic"],
    },

    // Template Word
    // {
    //   images: ["/word/image.png"],
    //   pdfUrl: "/files/laporan-word.pdf",
    //   excelUrl: null,
    //   title: "Template Dokumen Laporan Profesional (Microsoft Word)",
    //   desc: "Penyusunan dan pemformatan dokumen profesional yang terstruktur rapi. Termasuk pembuatan daftar isi otomatis, mail merge untuk surat massal, pengaturan layout kompleks, dan implementasi styling standar perusahaan.",
    //   features: ["Daftar Isi & Referensi Otomatis", "Integrasi Mail Merge (Surat Massal)", "Formatting & Layout Tingkat Lanjut", "Desain Kop Surat, Header & Footer"],
    //   tech: ["Microsoft Word", "Document Formatting", "Administration", "Mail Merge"],
    // },
  ];

  const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm font-medium">{children}</div>
  );

  const maskPhoneNumber = (phone: string) => {
    const cleanPhone = phone.trim();
    if (cleanPhone.length <= 6) return "******";
    return cleanPhone.slice(0, cleanPhone.length - 6) + "******";
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadName.trim() && downloadPhone.trim()) {
      const newEntry = {
        id: Date.now(),
        name: downloadName.trim(),
        phone: downloadPhone.trim(),
        timestamp: new Date().toLocaleString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedList = [newEntry, ...downloaders];
      setDownloaders(updatedList);
      localStorage.setItem("excel_downloaders_db", JSON.stringify(updatedList));

      const link = document.createElement("a");
      link.href = selectedExcelUrl;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadName("");
      setDownloadPhone("");
      setIsDownloadModalOpen(false);

      alert("Terima kasih! Data Anda telah tersimpan dan file Excel sedang diunduh.");
    }
  };

  const handleExportAdminData = () => {
    if (downloaders.length === 0) {
      alert("Belum ada data pengunduh untuk diexport.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "No,Nama Lengkap,Nomor HP (Lengkap),Waktu Unduh\n";

    downloaders.forEach((row, index) => {
      const rowName = `"${row.name}"`;
      const rowPhone = `"${row.phone}"`; 
      const rowTime = `"${row.timestamp}"`;
      csvContent += `${index + 1},${rowName},${rowPhone},${rowTime}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Data_Pengunduh_Lengkap_Admin.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    // ID ditambahkan di section ini agar navigasi hash #microsoft-365 bisa bekerja
    <section id="microsoft-365" className="mx-auto mt-12 max-w-6xl px-4 py-12 relative">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Administrasi & Analisis Data</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Proyek Microsoft 365</h2>
      </div>

      <div className="space-y-16 mt-8">
        {ms365List.map((project, idx) => (
          <div key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-xl overflow-hidden ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
            <div className="w-full lg:w-1/2">
              <ProjectCarousel images={project.images} title={project.title} />
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-5 leading-relaxed">{project.desc}</p>
              <ul className="space-y-2 mb-6 text-gray-300">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => <Chip key={i}>{tech}</Chip>)}
              </div>

              {/* Area Tombol Aksi */}
              <div className="mt-4 border-t border-gray-700 pt-6 flex flex-wrap gap-3">
                {project.pdfUrl && (
                  <a
                    href={project.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-bold text-white bg-red-600 rounded-lg shadow-lg shadow-red-600/30 transition-transform transform hover:scale-105 hover:bg-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Lihat PDF
                  </a>
                )}

                {project.excelUrl && (
                  <button
                    onClick={() => {
                      setSelectedExcelUrl(project.excelUrl);
                      setIsDownloadModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-bold text-white bg-[#217346] rounded-lg shadow-lg shadow-[#217346]/30 transition-transform transform hover:scale-105 hover:bg-[#1e603b]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Excel
                  </button>
                )}

                {project.excelUrl && (
                  <button
                    onClick={() => setIsViewDataModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-gray-200 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-all transform hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#3498db]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat Data Pengunduh ({downloaders.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL 1: FORM ISIAN DOWNLOAD EXCEL --- */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative animate-fade-in-up">
            <button
              onClick={() => setIsDownloadModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Unduh Template Excel</h3>
              <p className="text-gray-400 text-sm">Isi formulir di bawah ini untuk mengunduh file secara gratis.</p>
            </div>

            <form onSubmit={handleDownloadSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  required
                  value={downloadName}
                  onChange={(e) => setDownloadName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Nomor WhatsApp <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={downloadPhone}
                  onChange={(e) => setDownloadPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="flex-1 px-4 py-3 font-semibold text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 font-bold text-white bg-[#3498db] rounded-lg shadow-lg shadow-[#3498db]/30 hover:bg-[#2980b9] transition-colors"
                >
                  Unduh Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: TABEL DATA PENGUNDUH (DENGAN SENSOR HP) & TOMBOL EXPORT ADMIN --- */}
      {isViewDataModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 w-full max-w-3xl shadow-2xl relative animate-fade-in-up">
            <button
              onClick={() => setIsViewDataModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-1">Daftar Pengunduh File Excel</h3>
              <p className="text-gray-400 text-sm">Menampilkan daftar pengguna yang telah mengunduh file template Excel ini (6 digit terakhir nomor HP disensor demi privasi).</p>
            </div>

            <div className="max-h-80 overflow-y-auto border border-gray-800 rounded-lg">
              {downloaders.length === 0 ? (
                <div className="text-center py-8 text-gray-400">Belum ada pengguna yang mengunduh file ini.</div>
              ) : (
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-800 text-gray-200 uppercase text-xs sticky top-0">
                    <tr>
                      <th className="px-4 py-3">No</th>
                      <th className="px-4 py-3">Nama</th>
                      <th className="px-4 py-3">Nomor HP (Sensored)</th>
                      <th className="px-4 py-3 text-right">Waktu Unduh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {downloaders.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-400">{index + 1}</td>
                        <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                        <td className="px-4 py-3 font-mono text-cyan-400">{maskPhoneNumber(item.phone)}</td>
                        <td className="px-4 py-3 text-right text-gray-400 text-xs">{item.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              
              {/* TOMBOL EXPORT: Akan membuka Modal PIN sebelum unduh data */}
              <button
                onClick={() => setIsAdminPinModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 font-bold text-white bg-green-600 rounded-lg shadow-lg shadow-green-600/30 hover:bg-green-700 transition-colors"
                title="Membutuhkan Kode Kunci"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Unduh Data (Admin / Dev)
              </button>

              <button
                onClick={() => setIsViewDataModalOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 font-bold text-white bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: INPUT PIN ADMIN --- */}
      {isAdminPinModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Otorisasi Admin</h3>
            <p className="text-gray-400 text-xs text-center mb-6">Masukkan kode kunci untuk mengunduh data utuh.</p>
            
            <input
              type="password"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              placeholder="Masukkan PIN"
              className="w-full px-4 py-3 mb-6 bg-gray-800 border border-gray-700 rounded-lg text-white text-center tracking-[0.5em] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all"
              autoFocus
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsAdminPinModalOpen(false);
                  setAdminPin(""); // Reset PIN saat batal
                }}
                className="flex-1 px-4 py-2 font-semibold text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (adminPin === "301201") {
                    setIsAdminPinModalOpen(false);
                    setAdminPin("");
                    handleExportAdminData(); // Eksekusi unduh data jika PIN benar
                  } else {
                    alert("Kode kunci salah! Akses ditolak.");
                    setAdminPin(""); // Kosongkan input agar bisa coba lagi
                  }
                }}
                className="flex-1 px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-lg shadow-green-600/30 transition-colors"
              >
                Verifikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Publications: React.FC = () => {
  const publicationList = [
    { title: "PENGEMBANGAN WEB DINAS PERPUSTAKAAN DAN ARSIP BERBASIS LARAVEL FRAMEWORK PADA DPAD Kota TANGERANG", journal: "Jurnal Mahasiswa Teknik Informatika (Jurnal Teknologi Informasi)", date: "Desember 2023", desc: "Penelitian ini membahas pengembangan web Dinas Perpustakaan dan Arsip berbasis Laravel Framework pada DPAD Kota Tangerang untuk meningkatkan layanan perpustakaan dan arsip digital.", link: "https://ejournal.itn.ac.id/index.php/jati/article/view/7840", authors: ["Agam Adensa", "Kamilah Raihan", "Rizky Faisal Rafi", "Irwan Richwandi Putra", " Firda Azizah"] },
  ];
  const DocumentIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);

  return (
    <section id="publications" className="mx-auto mt-12 max-w-6xl px-4 py-12">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Riset & Akademik</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Publikasi Jurnal</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publicationList.map((pub, idx) => (
          <div key={idx} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 shadow-xl flex flex-col transition-transform transform hover:-translate-y-2">
            <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
            <p className="text-sm text-cyan-400 font-semibold mb-1">{pub.journal}</p>
            <p className="text-xs text-gray-400 mb-4">{pub.authors.join(", ")} - {pub.date}</p>
            <p className="text-gray-300 flex-grow mb-6">{pub.desc}</p>
            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db] self-start">
              <DocumentIcon /> Baca Publikasi
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- [BAGIAN 6: KOMPONEN KONTAK] ---
const Contact: React.FC = () => {
  const CommunicationIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-gray-300"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>);
  const Microsoft365Icon = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10"><path fill="#F25022" d="M11.25 3H3.75v7.5h7.5V3z" /><path fill="#7FBA00" d="M20.25 3h-7.5v7.5h7.5V3z" /><path fill="#00A4EF" d="M11.25 12.75H3.75v7.5h7.5v-7.5z" /><path fill="#FFB900" d="M20.25 12.75h-7.5v7.5h7.5v-7.5z" /></svg>);

  const skills = [
    { name: "Flutter", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" alt="Flutter" className="w-10 h-10"/> },
    { name: "Kotlin", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg" alt="Kotlin" className="w-10 h-10"/> },
    { name: "Dart", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg" alt="Dart" className="w-10 h-10"/> },
    { name: "Java", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="Java" className="w-10 h-10"/> },
    { name: "Laravel", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" className="w-10 h-10"/> },
    { name: "PHP", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="PHP" className="w-10 h-10"/> },
    { name: "Firebase", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg" alt="Firebase" className="w-10 h-10"/> },
    { name: "UI/UX", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" alt="UI/UX Design" className="w-10 h-10"/> },
    { name: "MY SQL", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="MY SQL" className="w-10 h-10"/> },
    { name: "Trello", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg" alt="Trello" className="w-10 h-10"/> },
    { name: "Notion", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg" alt="Notion" className="w-10 h-10"/> },
    { name: "Postman", icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" alt="Postman" className="w-10 h-10"/> },
    { name: "MS 365", icon: <Microsoft365Icon /> },
    { name: "Comunication", icon: <CommunicationIcon /> },
  ];

  return (
    <section id="contact" className="max-w-6xl mx-auto py-12 px-4">
      <div className="bg-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-800 shadow-2xl text-center">
        <h2 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Kontak & Keahlian</h2>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Mari Berkolaborasi!</h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Punya proyek menarik? Saya selalu terbuka untuk diskusi, peluang, dan ide-ide baru. Jangan ragu menghubungi saya.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold text-white bg-[#3498db] rounded-lg shadow-lg transition-transform transform hover:scale-105">Hubungi di LinkedIn</a>
          <a href="https://wa.me/62895412892094" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow-lg transition-transform transform hover:scale-105">Chat di WhatsApp</a>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Tools & Teknologi yang Saya Kuasai</h3>
          <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-7 gap-4">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-transform duration-300 transform hover:scale-110 hover:-translate-y-1">
                {skill.icon}
                <p className="font-semibold text-white text-xs text-center whitespace-pre-wrap">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- [BAGIAN 7: KOMPONEN FOOTER] ---
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="text-2xl font-bold mb-4 text-white">
          <span className="text-[#3498db]">Rizky </span>
          <span>Faisal </span>
          <span className="text-[#00C950]">Rafi</span>
        </div>
        <nav className="flex justify-center gap-6 sm:gap-8 mb-8 flex-wrap">
          <Link className="text-gray-300 hover:text-[#3498db]" to="/">Home</Link>
          <Link className="text-gray-300 hover:text-[#3498db]" to="/#experience">Experience</Link>
          <Link className="text-gray-300 hover:text-[#3498db]" to="/#projects">Projects</Link>
          <Link className="text-gray-300 hover:text-[#3498db]" to="/#microsoft-365">Microsoft 365</Link>
          <Link className="text-gray-300 hover:text-[#3498db]" to="/#contact">Contact</Link>
        </nav>
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rizky Faisal Rafi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- [BAGIAN 8: HALAMAN (PAGES)] ---
// Microsoft365Page telah dihapus dan digabungkan langsung ke sini
const HomePage = () => (
  <>
    <Hero />
    <WorkExperience />
    <Bootcamp />
    <Education />
    <Projects />
    <Microsoft365Projects />
    <Publications />
    <Contact />
  </>
);

// --- [BAGIAN 9: APLIKASI UTAMA BESERTA ROUTING] ---
const AppContent = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen m-0 p-0 bg-gray-900 text-white relative">
      <ScrollHandler />
      
      {/* Efek Background dibungkus dalam div fixed agar tidak mengacaukan batas scroll halaman terbawah */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#3498db]/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Rute /microsoft-365 dihapus karena semua komponen sekarang dalam page HomePage */}
          </Routes>
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
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      <style>{`
        html { scroll-behavior: smooth; }
        body.overflow-hidden { overflow: hidden; }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 10s infinite ease-in-out; }
        .animation-delay-4000 { animation-delay: -5s; }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;