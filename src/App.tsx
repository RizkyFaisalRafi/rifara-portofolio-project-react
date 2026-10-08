import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
// [UPDATE]: Mengimpor Halaman yang sudah dipisah
import AccurateAkunPerkiraanPage from "./detail_accurate/AccurateAkunPerkiraanPage";
import AccurateKelolaFiturPage from "./detail_accurate/AccurateKelolaFiturPage";
import AccurateInfoPerusahaanPage from "./detail_accurate/AccurateInfoPerusahaanPage";

// --- [FUNGSI PEMBANTU: Animasi Scroll Kustom] ---
const slowScrollTo = (targetY: number, duration: number = 1200) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const nextY = easeInOutCubic(timeElapsed, startY, distance, duration);
    
    window.scrollTo(0, nextY);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// --- [KOMPONEN PEMBANTU: Auto-Scroll saat berpindah hash/halaman] ---
const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const yOffset = -80; 
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          slowScrollTo(y, 1200); 
        }, 50);
      }
    } else {
      slowScrollTo(0, 1200); 
    }
  }, [location]);

  return null;
};

// --- [KOMPONEN BARU: REVEAL SCROLL ANIMATION] ---
// [UPDATE] Menambahkan "export" agar bisa diakses oleh AccurateAkunPerkiraanPage.tsx
export const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.15 } 
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-on-scroll ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

// --- [KOMPONEN BARU: MODAL SELAMAT DATANG (URL BASED)] ---
const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    const hasNoHash = !location.hash || location.hash === "";

    if (isHomePage && hasNoHash) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname, location.hash]);

  const handleSelection = (hash: string) => {
    setIsOpen(false);
    navigate(`/${hash}`);
  };

  const handleCVClick = () => {
    setIsOpen(false);
    window.open("/cv/CV_Rizky_Faisal_Rafi.pdf", "_blank", "noopener,noreferrer");
  };

  const handleClose = () => {
    setIsOpen(false); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative text-center">
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-3xl font-extrabold text-white mb-3">Selamat Datang!</h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
          Terima kasih telah berkunjung. Untuk memberikan pengalaman terbaik, portofolio mana yang ingin Anda eksplorasi terlebih dahulu?
        </p>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelection("#projects")}
            className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-[#3498db]/10 hover:border-[#3498db] transition-all group"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-white group-hover:text-[#3498db] transition-colors">Portofolio IT & Software</h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Mobile App (Flutter, Kotlin), Web Dev, dll.</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 group-hover:text-[#3498db]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button
            onClick={() => handleSelection("#microsoft-365")}
            className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-[#217346]/10 hover:border-[#217346] transition-all group"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-white group-hover:text-[#217346] transition-colors">Portofolio Administrasi</h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Microsoft 365, Excel Dashboard, ERP, dll.</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 group-hover:text-[#217346]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => handleSelection("accurate")}
            className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-orange-500/10 hover:border-orange-500 transition-all group"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">Portofolio Accurate</h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Materi & Demo Setup Sistem Akuntansi.</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={handleCVClick}
            className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 hover:border-gray-500 transition-all group"
          >
            <div className="text-left">
              <h3 className="text-lg font-bold text-white group-hover:text-gray-200 transition-colors">Lihat CV / Resume</h3>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Unduh atau lihat profil profesional lengkap.</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
};

// --- [KOMPONEN ANIMASI BURUNG (FLYING BIRD)] ---
const FlyingBird: React.FC = () => {
  return (
    <div className="bird-container pointer-events-none fixed z-0">
      <div className="bird">
        <svg viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg" fill="rgba(52, 152, 219, 0.4)">
          <path d="M23.13 6.03c-1.89-1.39-4.88-2.03-7.53-1.12-1.93-1.63-4.34-2.88-6.68-2.91-1.36-.02-2.73.43-3.8 1.15-.36.24-.71.53-1.02.85-.43-.16-.86-.28-1.27-.37-.87-.19-1.65-.24-2.28-.21-.36.02-.67.06-.9.13-.19.06-.32.14-.4.21-.11.1-.17.24-.13.38.04.14.15.25.29.3.26.11.66.16 1.14.16.63 0 1.45-.09 2.37-.29.47-.1.97-.24 1.47-.41.31.25.66.45 1.05.61.94.4 2.11.55 3.32.48 1.1-.06 2.21-.31 3.25-.66 2.76-1.01 5.92-.3 7.9 1.17.65.48.97 1.05 1.06 1.54.09.49-.07 1.06-.52 1.6-1.57 1.9-4.99 2.66-8.32 2.6-1.52-.03-2.96-.28-4.22-.64-1.2-.34-2.24-.81-3.07-1.35-.41-.27-.79-.58-1.11-.93-.72.48-1.54.89-2.45 1.16-.9.27-1.85.42-2.81.44-.14 0-.27-.08-.34-.21-.06-.13-.04-.28.06-.38.16-.16.37-.24.59-.28.53-.1 1.09-.23 1.63-.44.5-.2 1-.46 1.47-.8.3-.21.57-.45.81-.72 1.25-.97 2.94-1.4 4.7-1.12.83.13 1.62.43 2.33.87.56.35 1.07.76 1.51 1.22.42.43.78.9 1.08 1.4 1.27 2.11 3.51 4.5 6.22 6.75 3.65 3.03 8.35 5.51 12.65 6.4.15.03.3.06.44.08.35.06.63.15.79.28.11.09.18.23.16.38-.02.15-.12.27-.26.33-.24.11-.64.15-1.13.14-.62-.01-1.42-.11-2.31-.32-1.01-.24-2.19-.64-3.41-1.19-2.3-1.03-4.83-2.61-7.07-4.63-1.63-1.47-3.13-3.23-4.32-5.18-.54-.89-1.02-1.82-1.41-2.77-.38-.93-.68-1.88-.87-2.83-1.44-.06-2.84-.44-4.08-1.07-1.2-.6-2.22-1.43-2.98-2.46-.86-1.17-1.31-2.58-1.28-4.02.04-1.6.67-3.13 1.77-4.42 1.22-1.43 2.92-2.5 4.88-3.08.97-.29 1.99-.44 3.02-.45h.19c.14 0 .28.09.34.22.06.13.04.28-.06.39-.16.16-.38.23-.61.27-.51.09-1.03.22-1.54.41-.5.18-.99.42-1.44.73C1.65 3.82.9 5.3.83 6.94c-.06 1.49.33 2.92 1.09 4.1.84 1.3 2.16 2.34 3.73 3.01 1.63.69 3.51 1 5.48 1.03 3.4.05 7.15-.49 10.3-2.56 1.2-.79 2.16-1.8 2.76-3.01.62-1.24.87-2.67.57-4.14-.3-1.47-1.22-2.8-2.66-3.83l.02.01z" />
        </svg>
      </div>
    </div>
  );
};

// --- [BAGIAN 1: KOMPONEN NAVIGASI] ---
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/#experience" },
    { name: "Bootcamp & Certificates", href: "/#bootcamp" },
    { name: "Education", href: "/#education" },
    { name: "Projects", href: "/#projects" },
    { name: "Microsoft 365", href: "/#microsoft-365" },
    { name: "Accurate", href: "/accurate" },
    { name: "Publications", href: "/#publications" },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (location.pathname !== "/") {
        if (location.pathname.startsWith("/accurate")) setActiveSection("accurate");
        if (location.pathname === "/mini-erp") setActiveSection("mini-erp");
        return;
      }

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
  }, [location.pathname]); 

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    let isActive = false;
    
    if (location.pathname === "/" && href === "/") {
      isActive = activeSection === "home";
    } else if (location.pathname === "/" && href.startsWith("/#")) {
      const sectionId = href.substring(2);
      isActive = activeSection === sectionId;
    } else if (location.pathname.startsWith(href) && href !== "/") {
      isActive = true;
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
      
      <div className={`fixed inset-0 z-30 transform transition-opacity lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
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
const Hero: React.FC = () => {
  const [videoHasError, setVideoHasError] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-4 relative bg-cover bg-no-repeat pt-24 pb-12" style={{ backgroundImage: `url('photo_with_parent.jpg')`, backgroundPosition: "center 17%" }}>
      <div className="absolute inset-0 bg-black/70 z-0"></div> 
      <div className="max-w-5xl relative z-10 animate-fade-in-up flex flex-col items-center mt-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">Rizky Faisal Rafi</h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
          Seorang <span className="text-[#3498db] font-semibold">Profesional Multidisiplin</span> dengan latar belakang <span className="text-[#3498db] font-semibold">Teknologi</span> serta kompetensi di bidang <span className="text-[#3498db] font-semibold">Administrasi</span>. Berdedikasi untuk memberikan solusi yang efisien, andal, dan terstruktur.
        </p>

        {/* --- CONTAINER VIDEO --- */}
        <div className="mt-8 w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-[0_0_30px_rgba(52,152,219,0.3)] border border-gray-700 bg-gray-900 relative group">
          
          {videoHasError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gray-900/90 backdrop-blur-sm border border-red-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500 mb-3 animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-gray-200 font-semibold mb-1">Maaf, pemutar video gagal dimuat.</p>
              <p className="text-gray-400 text-sm mb-5">Silakan periksa koneksi internet Anda atau tonton langsung melalui YouTube.</p>
              <a 
                href="https://www.youtube.com/watch?v=e0BnBkhS1oI"
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
              src="https://www.youtube.com/embed/e0BnBkhS1oI"
              title="Video Biodata Rizky Faisal Rafi"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              onError={() => setVideoHasError(true)} 
            ></iframe> 
          )}

        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/#projects" className="bg-[#3498db] text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">Lihat Proyek IT</Link>
          <Link to="/#microsoft-365" className="bg-[#217346] text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">Lihat Proyek Office</Link>
          <Link to="/accurate" className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">Portofolio Accurate</Link>
    
          <a 
            href="/cv/CV_Rizky_Faisal_Rafi.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center gap-2">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
                Lihat / Unduh CV
          </a>
        </div>
      </div>
    </section>
  );
};

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
      <Reveal>
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
      </Reveal>
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
    { name: "BNSP - Operator Komputer", organizer: "Dinas Ketenagakerjaan Kota Tangerang", date: "July 2026 - Present", certificateUrl: "https://drive.google.com/file/d/1KxpyJLvBRyaLf1UJlcFYSrQ6Bd1orp4Q/view?usp=sharing", details: ["Proficient in Microsoft Word for document formatting, layout design, and professional document preparation.", "Skilled in Microsoft Excel, including complex formulas, data cleaning, data management, PivotTables, PivotCharts, dashboard creation, etc.", "Experienced in Microsoft PowerPoint for presentation design and content development, with certified competency and practical exercise experience."], relevantCourses: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "BNSP - Operator Komputer"] },
    { name: "Microsoft Excel Course: Foundation to Mastery", organizer: "Entrefine By Calvin Lim Juara Dunia Excel 2025", date: "August 2026", certificateUrl: "https://learn.entrefine.com/certificate/ENT-M4GM-NJF5-7XGL", details: ["Skilled in Microsoft Excel, including complex formulas, data cleaning, data management, PivotTables, PivotCharts, dashboard creation, etc."], relevantCourses: ["Microsoft Excel", "Entrefine Learning", "Calvin Lim Teacher"] },
  ];
  return <SectionWithTabs id="bootcamp" title="Bootcamp & Sertifikasi" subtitle="Pengembangan Diri" data={bootcampData} />;
};

const Education = () => {
  const educationHistory = [
    { institution: "Universitas Raharja", degree: "Sarjana Komputer (S.Kom)", major: "Tekologi Informasi", date: "2020 - 2024", certificateUrl: "https://drive.google.com/file/d/1kwl6o_l5I91cH4MsTRVNricukyzq5vie/view?usp=sharing", details: ["Aktif di organisasi kemahasiswaan (Himpunan Mahasiswa Teknik Informatika).", "Proyek akhir Skripsi tentang pengembangan aplikasi mobile.", "Meraih IPK 3.84."], relevantCourses: ["Sarjana Komputer (S.Kom)", "Teknik Informatika", "Raharja University", "IPK 3.84"] },
    { institution: "SMK Negeri 8 Kota Tangerang", degree: "Sekolah Menengah Kejuruan (SMK)", major: "Teknik Instalasi Tenaga Listrik", certificateUrl: "https://drive.google.com/file/d/1FkqO-Csau7bGg-cUCDmc0gFLay4QSdpR/view?usp=sharing", date: "2017 - 2020", details: ["Aktif di organisasi Paskibra (PASLAVANTA).", "Aktif di organisasi Pramuka (Ketua Pradana).", "Aktif di organisasi Pramuka Saka Wirakartika."], relevantCourses: ["Sekolah Menengah Kejuruan (SMK)", "Teknik Instalasi Tenaga Listrik (TITL)", "SMK Negeri 8 Kota Tangerang", "Pramuka & Paskibra"] },
  ];
  return <SectionWithTabs id="education" title="Riwayat Pendidikan" subtitle="Edukasi" data={educationHistory} />;
};

// --- [BAGIAN 4: KOMPONEN RIWAYAT PROYEK MOBILE/WEB] ---
const Projects: React.FC = () => {
  const projectList = [
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Screenshot+Smart+Home+Pro", link: "https://play.google.com/store/apps/details?id=com.rifara.screenshootBesmartIndonesiaGemilang&pcampaignid=web_share", githubLink: "", videoUrl: "", title: "Screenshot Smart Pro", desc: "Screenshot Layar dengan Jendela Mengambang dan Rekam Layar Suara Dengan Kualitas HD.", features: ["SCREENSHOT LAYAR DENGAN JENDELA MENGAMBANG", "REKAM LAYAR DENGAN SUARA", "KUALITAS HD", "FREE"], tech: ["Dart", "Flutter", 'Widget "Floating Action Button"', 'With Native Code', "MVVM", "Git", "GitHub", "Firebase", "Android Studio", "State Management Provider"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=AHE+Shopping", githubLink: "https://github.com/FinalProjectRifara/flutter_online_shop_app-ahe", link: "", videoUrl: "", title: "AHE Shopping", desc: "E-Commerce App Flutter App and Laravel Web Admin.", features: ["Payment Gateway Midtrans", "RajaOngkir Integration", "Firebase Cloud Messaging", "Flutter for Mobile App", "Laravel for Web Admin", "State Management Provider"], tech: ["Dart", "Flutter", "MVVM", "PHP", "Laravel", "MySQL", "Git", "GitHub", "Firebase", "Midtrans", "RajaOngkir", "Postman", "Xampp", "Visual Studio Code", "Android Studio", "State Management Provider"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Todo+List+App", githubLink: "https://github.com/RizkyFaisalRafi/Final-Project-1", link: "", videoUrl: "", title: "To Do List App (Final Project (1) Bootcamp Hactiv8)", desc: "Aplikasi manajemen tugas harian yang dibangun sepenuhnya dengan Java Android, memungkinkan pengguna untuk menambah, mengedit, dan melacak tugas secara efisien.", features: ["Fungsionalitas CRUD (Create, Read, Update, Delete) untuk To Do List.", "Tandai tugas sebagai selesai atau belum selesai.", "Penyimpanan data lokal yang persisten."], tech: ["Java", "Android", "Data Local"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Kalkulator+App", githubLink: "https://github.com/RizkyFaisalRafi/FinalProject3", link: "", videoUrl: "", title: "Kalkulator App (Final Project (2) Bootcamp Hactiv8)", desc: "Sebuah aplikasi kalkulator fungsional dengan antarmuka modern yang dibuat menggunakan Java Android untuk melakukan operasi perhitungan.", features: ["Mendukung operasi tambah, kurang, kali, dan bagi, sisa bagi.", "Fungsi 'Clear' untuk mereset / menghapus perhitungan.", "Antarmuka pengguna yang responsif dan intuitif."], tech: ["Java", "Android", "Data Local"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Travelgo+App", githubLink: "https://github.com/RizkyFaisalRafi/FinalProject4", link: "", videoUrl: "", title: "Travelgo App (Final Project (3) Bootcamp Hactiv8)", desc: "Aplikasi direktori wisata yang menampilkan daftar destinasi menarik. Dibangun untuk mempraktikkan pembuatan layout kompleks dan menampilkan data dalam daftar.", features: ["Menampilkan daftar destinasi wisata dengan gambar dan deskripsi singkat.", "Halaman detail untuk setiap destinasi.", "Pencarian sederhana untuk menemukan destinasi (From, To, Passengers, Departure, Class)."], tech: ["Java", "Android", "Firebase"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=E+Commerce+App", githubLink: "https://github.com/RizkyFaisalRafi/Final_Project_2", link: "", videoUrl: "", title: "Travelgo App (Final Project (4) Bootcamp Hactiv8)", desc: "Aplikasi E Commerce. Multi User bisa digunakan untuk memasukan barang dengan role Admin, Staff dan juga sebagai user/buyer.", features: ["CRUD Manajemen Produk.", "Halaman Home Produk, Detail Produk.", "Cart"], tech: ["Java", "Android", "Firebase"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Sekretariat+Kabinet", githubLink: "https://github.com/RizkyFaisalRafi/kabinet_indonesia", link: "", videoUrl: "", title: "Sekretariat Kabinet (Submission Dicoding Pemula Project)", desc: "APLIKASI INFORMASI KABINET INDONESIA", features: ["Informasi Kabinet", "Detail Kabinet", "Data Local"], tech: ["Dart", "Flutter", "Data Dummy"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Restaurant+App", githubLink: "https://github.com/RizkyFaisalRafi", link: "", videoUrl: "", title: "Flutter Restaurant App (Submission Dicoding Fundamental Project)", desc: "Tahap Development Web", features: ["", "", ""], tech: ["Dart", "Flutter", "___", "___", "___", "___"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Dicoding+Story", githubLink: "https://tree-sunstone-9a8.notion.site/Documentation-Portofolio-1e9169cf35a2804d81f9e146a6104bdb", link: "", videoUrl: "", title: "Flutter Dicoding Story (Submission Dicoding Intermediate Project)", desc: "Tahap Development Web", features: ["", "", ""], tech: ["Dart", "Flutter", "___", "___", "___", "___"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Dicoding+Movie", githubLink: "https://github.com/RizkyFaisalRafi/ditonton_clean_architecture/tree/Second-Submission", link: "", videoUrl: "", title: "Flutter Dicoding Movie (Submission Dicoding Expert Project)", desc: "Tahap Development Web", features: ["...", "...", "..."], tech: ["Dart", "Flutter", "___", "___", "___", "___"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Tempat+Wisata", githubLink: "https://github.com/RizkyFaisalRafi/Tempat_Wisata_Popular_App", link: "", videoUrl: "", title: "Kotlin Tempat Wisata (Submission Dicoding Pemula Project)", desc: "Tahap Development Web", features: ["...", "...", "..."], tech: ["Kotlin", "Android", "___", "___", "___", "___"] },
    { image: "https://placehold.co/600x400/1a202c/3498db?text=Github+User+App", githubLink: "https://github.com/RizkyFaisalRafi/Github_User", link: "", videoUrl: "", title: "Kotlin Github User App (Submission Dicoding Fundamental Project)", desc: "Tahap Development Web", features: ["...", "...", "..."], tech: ["Kotlin", "Android", "___", "___", "___", "___"] },
  ];

  const PlayStoreIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.5,12c0-0.2-0.1-0.4-0.1-0.6l-3.3-3.3L3.6,3.6C3.4,3.4,3,3.6,3,4v16c0,0.4,0.4,0.6,0.6,0.4l14.5-4.5l3.3-3.3C21.4,12.4,21.5,12.2,21.5,12z M6.7,8.5l6.4,3.5l-6.4,3.5V8.5z M18,12.8l-5.1,1.6L6.7,18V6l6.2,3.4L18,11.2V12.8z" /></svg>);
  const GitHubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.2C6.5,2.2,2.2,6.5,2.2,12c0,4.3,2.8,8,6.6,9.3c0.5,0.1,0.7-0.2,0.7-0.5v-1.7c-2.7,0.6-3.3-1.3-3.3-1.3c-0.4-1.1-1.1-1.4-1.1-1.4c-0.9-0.6,0.1-0.6,0.1-0.6c1,0.1,1.5,1,1.5,1c0.9,1.5,2.3,1.1,2.9,0.8c0.1-0.7,0.3-1.1,0.6-1.3c-2.2-0.3-4.5-1.1-4.5-4.9c0-1.1,0.4-2,1-2.7c-0.1-0.3-0.5-1.3,0.1-2.7c0,0,0.8-0.3,2.7,1c0.8-0.2,1.6-0.3,2.5-0.3s1.7,0.1,2.5,0.3c1.9-1.3,2.7-1,2.7-1c0.6,1.4,0.2,2.4,0.1,2.7c0.6,0.7,1,1.6,1,2.7c0,3.8-2.3,4.6-4.5,4.9c0.4,0.3,0.7,0.9,0.7,1.8v2.7c0,0.3,0.2,0.6,0.7,0.5c3.8-1.3,6.6-5,6.6-9.3C21.8,6.5,17.5,2.2,12,2.2z" /></svg>);
  const VideoIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>);
  
  const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (<div className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm font-medium">{children}</div>);

  return (
    <section id="projects" className="mx-auto mt-12 max-w-6xl px-4 py-12">
      <Reveal>
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Studi Kasus</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Riwayat Proyek</h2>
        </div>
      </Reveal>
      <div className="space-y-16 mt-8">
        {projectList.map((project, idx) => (
          <Reveal key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-xl overflow-hidden ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
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
                {project.videoUrl && (
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg transition-colors hover:bg-indigo-700">
                    <VideoIcon /> Lihat Video Demo / Dokumentasi
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// --- [BAGIAN KOMPONEN MICROSOFT 365 DENGAN FITUR DOWNLOAD & DATABASE DATA PENGUNDUH] ---
const ProjectCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

// --- [BAGIAN KOMPONEN MICROSOFT 365 PROJECTS] ---
const Microsoft365Projects: React.FC = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadName, setDownloadName] = useState("");
  const [downloadPhone, setDownloadPhone] = useState("");
  const [selectedExcelUrl, setSelectedExcelUrl] = useState("");

  const ms365List = [
    {
      isCaseStudy: true,
      caseStudyLink: "/mini-erp",
      images: ["/excel/5/image.png"], 
      videoUrl: "", 
      title: "Mini-ERP System: Automated B2B Procurement Cycle",
      desc: "Sebuah purwarupa (prototype) sistem Enterprise Resource Planning (ERP) berskala kecil yang dirancang untuk mengotomatiskan seluruh alur pengadaan barang (B2B Procurement). Proyek ini memetakan kompleksitas alur kerja dunia nyata—mulai dari pemesanan hingga pembayaran—ke dalam ekosistem dokumen Excel yang terintegrasi dinamis.",
      features: [
        "Order Initiation: Otomatisasi dokumen Purchase Order (PO) & Kalkulasi Pajak.",
        "Fulfillment System: Form Surat Jalan yang terintegrasi dengan Database Inventaris.",
        "Quality Control: Penerbitan dokumen BAST & Surat Retur Barang.",
        "Billing & Settlement: Generator Invoice Otomatis & Kwitansi Pembayaran."
      ],
      tech: ["Microsoft Excel", "Database Relational", "VLOOKUP", "Business Logic"],
    },
    {
      images: ["/excel/1/image.png"],
      pdfUrl: "/excel/1/AbsensiBulananRekapGajiByRIFARA.pdf",
      excelUrl: "/excel/1/TemplateAbsensiBulananRekapGajibyRIFARA.xlsx",
      videoUrl: "", 
      title: "Absensi Bulanan & Penggajian Otomatis (Automated HR & Payroll System)",
      desc: "Pembuatan sistem rekapitulasi absensi dan kalkulasi penggajian karyawan bulanan yang terintegrasi. Menggunakan formula dinamis dan logika perhitungan bersyarat untuk melacak kehadiran, cuti, serta menghitung gaji bersih (Take-Home Pay) secara otomatis dan akurat.",
      features: [
        "Otomatisasi Kalkulasi Penggajian: Perhitungan gaji pokok, tunjangan, dan potongan kehadiran secara real-time.", 
        "Rekapitulasi Data Bersyarat: Penggunaan COUNTIF dengan wildcard untuk melacak berbagai kode status cuti karyawan.", 
        "Keamanan Data (Data Protection): Implementasi penguncian sel (Locked Cells) untuk melindungi integritas formula.", 
        "Manajemen Tanggal & Teks Dinamis: Ekstraksi hari dan tanggal menggunakan kombinasi formula LEFT, TEXT, dan DATE."
      ],
      tech: ["Microsoft Excel", "HR Analytics", "Payroll Automation", "Formula & Logic"],
    },
    {
      images: ["/excel/3/image1.png", "/excel/3/image2.png"],
      pdfUrl: "/excel/3/Slip_Gaji_Karyawan_By_RIFARA.pdf",
      excelUrl: "/excel/3/Slip_Gaji_Karyawan_By_RIFARA.xlsx",
      videoUrl: "",
      title: "Generator Slip Gaji Karyawan Interaktif (Interactive Employee Payslip Generator)",
      desc: "Pembuatan template slip gaji karyawan dinamis yang dirancang untuk mempercepat proses pencetakan dokumen penggajian bulanan. Sistem ini memanfaatkan fitur kontrol interaktif untuk navigasi data secara cepat tanpa perlu mengubah formula secara manual.",
      features: [
        "Navigasi Data Interaktif (Spin Button & List Box).", 
        "Integrasi Data Otomatis menggunakan VLOOKUP/INDEX-MATCH.", 
        "Kalkulasi Penggajian Akurat untuk pendapatan bersih setelah pemotongan pajak.",
        "Format Dokumen Siap Cetak (Print Area Terkalibrasi)."
      ],
      tech: ["Microsoft Excel", "Payroll Automation", "Form Controls", "Interactive Dashboard"],
    },
    {
      images: ["/excel/6/image.png"],
      pdfUrl: "/excel/6/Laporan_Admin_Affiliate_By_RIFARA.pdf",
      excelUrl: "/excel/6/Laporan_Admin_Affiliate_By_RIFARA.xlsx",
      videoUrl: "",
      title: "Laporan Performa Afiliasi (Monthly Recap) Otomatis",
      desc: "Pembuatan template Laporan Performa Afiliasi bulanan yang dirancang untuk mempercepat rekapitulasi kinerja kreator (KOL). Sistem ini menggunakan formula terintegrasi untuk menghitung Gross Merchandise Value (GMV), Conversion Rate, dan estimasi komisi secara instan. Template ini meminimalisir kesalahan perhitungan manual dan menyajikan rangkuman data yang terstruktur untuk kebutuhan evaluasi manajemen.",
      features: [
        "Kalkulasi Finansial Otomatis: Implementasi formula untuk menghitung GMV dan Total Payout Komisi berdasarkan persentase (rate) masing-masing kreator secara dinamis.", 
        "Pelacakan Metrik Kinerja (KPI): Memantau efektivitas kampanye tiap afiliator melalui rasio konversi (Conversion Rate) dari jumlah klik menjadi pesanan selesai.", 
        "Executive Summary & Print-Ready Layout: Desain tata letak profesional dengan ringkasan metrik utama di bagian atas dan indikator warna untuk status pembayaran, siap diekspor ke format PDF."
      ],
      tech: ["Microsoft Excel", "Data Reporting", "Performance Tracking", "Financial Calculation"],
    },
    {
      images: ["/excel/7/image.jpg"],
      pdfUrl: "/excel/7/Laporan_Stok_Opname_Gudang_By_RIFARA.pdf",
      excelUrl: "/excel/7/Laporan_Stok_Opname_Gudang_By_RIFARA.xlsx",
      videoUrl: "",
      title: "Laporan Stok Opname Gudang",
      desc: "Pembuatan template Laporan Stok Opname Gudang yang dirancang untuk mempercepat proses pencatatan dan evaluasi persediaan. Sistem ini mengintegrasikan riwayat mutasi barang dengan hasil audit fisik untuk menghasilkan data inventaris yang akurat dan dapat dipertanggungjawabkan.",
      features: [
        "Kalkulasi Selisih (Variance) Otomatis: Implementasi formula matematis untuk membandingkan saldo akhir sistem dengan hasil perhitungan fisik di lapangan, sehingga anomali stok (+/-) terdeteksi secara instan.", 
        "Pemantauan Mutasi Terstruktur: Pencatatan alur masuk (inbound) dan keluar (outbound) barang yang sistematis berdasarkan Kode SKU untuk memastikan integritas data persediaan.", 
        "Audit-Ready & Print Layout: Desain tata letak profesional yang dilengkapi kolom keterangan untuk analisis selisih (rusak/hilang), serta diformat khusus agar rapi saat dicetak atau diekspor ke PDF untuk pelaporan manajemen."
      ],
      tech: ["Microsoft Excel", "Inventory Management", "Logical Formulas", "Data Administration"],
    },
    {
      images: ["/excel/8/image.jpg"],
      pdfUrl: "/excel/8/Cheat_Sheet_Shortcut_Excel_By_Rizky_Faisal_Rafi.pdf",
      excelUrl: "",
      videoUrl: "",
      title: "Cheat Sheet & Panduan Shortcut Microsoft Excel",
      desc: "Pembuatan dokumen panduan komprehensif (Cheat Sheet) yang merangkum 50+ shortcut esensial Microsoft Excel. Panduan ini dirancang untuk meningkatkan produktivitas, efisiensi waktu, dan mempercepat alur kerja dengan mengurangi ketergantungan pada navigasi mouse dalam pengolahan data harian.",
      features: [
        "Kategorisasi Fungsional Terstruktur: Pengelompokan shortcut secara logis (Navigasi Data, Pemformatan Sel, Manajemen Sheet, dll) yang memudahkan pengguna dalam mencari, mengingat, dan mempraktikkan kombinasi tombol dengan cepat.",
        "Optimalisasi Alur Kerja (Workflow): Memuat shortcut krusial untuk analisis dan administrasi data tingkat lanjut, seperti penguncian referensi absolut (F4), Flash Fill, AutoFit, hingga manajemen tabel dan sel.",
        "Print-Ready & Ergonomic Design: Desain tata letak visual berukuran A4 yang profesional dan bersih, dirancang khusus untuk dicetak sebagai lembar referensi (desk reference) guna menemani proses belajar dan bekerja."
      ],
      tech: ["Microsoft Excel", "Productivity", "Workflow Optimization", "Data Administration"],
    }
  ];

  const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm font-medium">{children}</div>
  );

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadPhone.trim().length < 10) return alert("Nomor WhatsApp tidak valid. Minimal 10 angka.");

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAcmWg0qoULx8jV6LVpk2JWOV7Hfo1K81nG4DVixsvrsqTazO0aO_ZPTYL1Xgrw1-Liw/exec";
    
    const newEntry = {
      name: downloadName.trim(),
      phone: downloadPhone.trim(),
      timestamp: new Date().toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
    } catch (error) {
      console.error("Gagal mengirim data ke Google Sheets:", error);
    }

    const link = document.createElement("a");
    link.href = selectedExcelUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadName("");
    setDownloadPhone("");
    setIsDownloadModalOpen(false);
    alert("Terima kasih! File Excel sedang diunduh.");
  };

  return (
    <section id="microsoft-365" className="mx-auto mt-12 max-w-6xl px-4 py-12 relative">
      <Reveal>
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Administrasi & Analisis Data</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Proyek Microsoft 365</h2>
        </div>
      </Reveal>

      <div className="space-y-16 mt-8">
        {ms365List.map((project, idx) => (
          <Reveal key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 p-6 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-xl overflow-hidden ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
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

              <div className="mt-4 border-t border-gray-700 pt-6 flex flex-wrap gap-3">
                {project.isCaseStudy && (
                  <Link
                    to={project.caseStudyLink!}
                    className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 font-bold text-white bg-gradient-to-r from-[#3498db] to-[#2980b9] rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-cyan-500/25"
                  >
                    Lihat Studi Kasus Lengkap
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                )}

                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 font-bold text-white bg-indigo-600 rounded-lg shadow-lg shadow-indigo-600/30 transition-transform transform hover:scale-105 hover:bg-indigo-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                    Lihat Video Demo / Dokumentasi
                  </a>
                )}

                {!project.isCaseStudy && project.pdfUrl && (
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

                {!project.isCaseStudy && project.excelUrl && (
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
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative animate-fade-in-up">
            <button onClick={() => setIsDownloadModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Unduh Template Excel</h3>
              <p className="text-gray-400 text-sm">Isi formulir di bawah ini untuk mengunduh file secara gratis.</p>
            </div>
            <form onSubmit={handleDownloadSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input type="text" id="name" required value={downloadName} onChange={(e) => setDownloadName(e.target.value)} placeholder="Masukkan nama Anda" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Nomor WhatsApp <span className="text-red-500">*</span></label>
                <input type="tel" id="phone" required minLength={10} value={downloadPhone} onChange={(e) => setDownloadPhone(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Contoh: 081234567890" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsDownloadModalOpen(false)} className="flex-1 px-4 py-3 font-semibold text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">Batal</button>
                <button type="submit" className="flex-1 px-4 py-3 font-bold text-white bg-[#3498db] rounded-lg shadow-lg hover:bg-[#2980b9] transition-colors">Unduh</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};


// --- [HALAMAN BARU: MINI ERP CASE STUDY PAGE DENGAN SCROLL ANIMATION] ---
const MiniERPPage: React.FC = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadName, setDownloadName] = useState("");
  const [downloadPhone, setDownloadPhone] = useState("");

  const erpSteps = [
    {
      title: "Pemesanan Barang (Purchase Order)",
      desc: "Siklus pengadaan dimulai ketika pihak pembeli menerbitkan Purchase Order (PO). Dokumen ini mengikat pesanan secara resmi antar perusahaan (B2B). Pada sistem Excel ini, PO dilengkapi fitur kalkulasi dinamis untuk Sub Total, Pajak (PPN), dan Grand Total.",
      // image: "/excel/erp/po_modern.png",
      image: "/excel/5/image.png",
      tag: "Tahap 1 - Inisiasi Transaksi",
      color: "text-blue-400"
    },
    {
      title: "Instruksi Pengeluaran (Delivery Order)", // [BARU] Tambahan DO Internal Gudang
      desc: "Sebagai jembatan antara tim Sales/Admin dan tim Logistik, sistem menerbitkan Delivery Order (DO). Dokumen ini murni berfungsi sebagai Surat Perintah Kerja (SPK) internal bagi staf gudang untuk menyiapkan, mengepak (packing), dan mengeluarkan barang sesuai daftar pesanan sebelum dikirim ke pelanggan.",
      // image: "/excel/erp/delivery_order.png", 
      image: "/excel/5/image.png",
      tag: "Tahap 2 - Instruksi Gudang",
      color: "text-yellow-400"
    },
    {
      title: "Pengiriman Barang (Surat Jalan)",
      desc: "Setelah barang siap dan dimuat ke kendaraan (berdasarkan instruksi DO), vendor mengirimkan barang menggunakan Surat Jalan (Delivery Note). Dokumen eksternal ini dibawa oleh kurir/supir dan berfungsi sebagai tanda terima sah di lokasi pelanggan.",
      // image: "/excel/erp/surat_jalan.png",
      image: "/excel/5/image.png",
      tag: "Tahap 3 - Logistik & Pengiriman", // Ubah tag menjadi Tahap 3
      color: "text-orange-400"
    },
    {
      title: "Serah Terima (BAST)",
      desc: "Saat barang tiba, pihak pembeli melakukan pengecekan kualitas (Quality Control). Jika seluruh pesanan sesuai dan dalam kondisi baik, kedua belah pihak menandatangani Berita Acara Serah Terima (BAST) sebagai bukti hukum perpindahan kepemilikan dan tanggung jawab.",
      // image: "/excel/erp/bast.png",
      image: "/excel/5/image.png",
      tag: "Tahap 4 - Validasi Kualitas", // Ubah tag menjadi Tahap 4
      color: "text-green-400"
    },
    {
      title: "Penanganan Anomali (Surat Retur)",
      desc: "Proyek ERP ini juga dirancang untuk menangani edge cases. Jika ditemukan barang rusak atau cacat produksi saat serah terima, sistem menyediakan Surat Retur (Return Note) untuk mencatat pengembalian barang secara rapi dan profesional.",
      // image: "/excel/erp/retur.png",
      image: "/excel/5/image.png",
      tag: "Tahap 5 - Penanganan Retur", // Ubah tag menjadi Tahap 5
      color: "text-red-400"
    },
    {
      title: "Penagihan Uang (Invoice)",
      desc: "Berdasarkan kuantitas barang aktual yang diterima di BAST, pihak vendor berhak menerbitkan Faktur Penagihan (Invoice). Tagihan ini telah diatur dengan format yang menonjolkan metode dan tenggat waktu pembayaran (Net Term).",
      // image: "/excel/erp/invoice.png",
      image: "/excel/5/image.png",
      tag: "Tahap 6 - Administrasi Keuangan", // Ubah tag menjadi Tahap 6
      color: "text-purple-400"
    },
    {
      title: "Penyelesaian Transaksi (Kwitansi)",
      desc: "Siklus pengadaan ditutup ketika pihak Keuangan (Finance) pembeli telah mentransfer dana pembayaran. Vendor kemudian menerbitkan dokumen Kwitansi berdesain modern lengkap dengan kolom meterai sebagai bukti pelunasan sah.",
      // image: "/excel/erp/kwitansi.png",
      image: "/excel/5/image.png",
      tag: "Tahap 7 - Finalisasi", // Ubah tag menjadi Tahap 7
      color: "text-teal-400"
    }
];

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadPhone.trim().length < 10) return alert("Nomor WhatsApp tidak valid. Minimal 10 angka.");

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAcmWg0qoULx8jV6LVpk2JWOV7Hfo1K81nG4DVixsvrsqTazO0aO_ZPTYL1Xgrw1-Liw/exec";
    
    const newEntry = {
      name: downloadName.trim(),
      phone: downloadPhone.trim(),
      timestamp: new Date().toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
    } catch (error) {
      console.error("Gagal mengirim data ke Google Sheets:", error);
    }

    const link = document.createElement("a");
    // link.href = "/excel/5/Mini_ERP_Procurement_By_RIFARA.xlsx";
    link.href = "/excel/5/Mini_ERP_Procurement_By_RIFARA_Update.xlsx";
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadName("");
    setDownloadPhone("");
    setIsDownloadModalOpen(false);
    alert("Terima kasih! Data Anda telah tersimpan dan file Excel sedang diunduh.");
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
      <Reveal>
        <div className="text-center mb-16">
          <Link to="/#microsoft-365" className="inline-flex items-center text-gray-400 hover:text-[#3498db] transition-colors mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
            Kembali ke Portofolio
          </Link>
          <h3 className="text-xl font-bold uppercase text-[#3498db] tracking-widest mb-3">Case Study</h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Mini-ERP System: Automated B2B Procurement Cycle</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Studi kasus perancangan purwarupa (prototype) sistem Enterprise Resource Planning skala kecil menggunakan Microsoft Excel. Proyek ini memetakan alur kerja dunia nyata ke dalam dokumen yang terintegrasi secara cerdas untuk meminimalisir human error.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsDownloadModalOpen(true);
              }}
              className="bg-[#217346] text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-[#1e603b] transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              Unduh Excel Master
            </button>

            <a 
              // href="/excel/5/Mini_ERP_Procurement_By_RIFARA.pdf" 
              href="/excel/5/Mini_ERP_Procurement_By_RIFARA_Update.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Lihat / Unduh PDF Master
            </a>
          </div>
        </div>
      </Reveal>

      <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
        {erpSteps.map((step, idx) => (
          <Reveal key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900 bg-gray-800 text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-125">
              {idx + 1}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-800/80 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <span className={`text-sm font-bold uppercase tracking-wider mb-2 block ${step.color}`}>{step.tag}</span>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{step.desc}</p>
              <div className="w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-900 aspect-[4/3] group-hover:shadow-lg transition-all cursor-pointer">
                <img src={step.image} alt={step.title} className="w-full h-full object-cover object-top opacity-80 transition-all duration-500 hover:scale-105 hover:opacity-100" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative animate-fade-in-up">
            <button onClick={() => setIsDownloadModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Unduh Excel Master Mini-ERP</h3>
              <p className="text-gray-400 text-sm">Isi formulir di bawah ini untuk mengunduh file secara gratis.</p>
            </div>
            <form onSubmit={handleDownloadSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input type="text" id="name" required value={downloadName} onChange={(e) => setDownloadName(e.target.value)} placeholder="Masukkan nama Anda" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Nomor WhatsApp <span className="text-red-500">*</span></label>
                <input type="tel" id="phone" required minLength={10} value={downloadPhone} onChange={(e) => setDownloadPhone(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Contoh: 081234567890" className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsDownloadModalOpen(false)} className="flex-1 px-4 py-3 font-semibold text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">Batal</button>
                <button type="submit" className="flex-1 px-4 py-3 font-bold text-white bg-[#3498db] rounded-lg shadow-lg hover:bg-[#2980b9] transition-colors">Unduh</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- [HALAMAN BARU: ACCURATE HUB PAGE (Katalog Modul)] ---
const AccurateHubPage: React.FC = () => {
const modules = [
    { 
      id: "info-perusahaan",
      title: "1. Profil & Info Perusahaan", 
      desc: "Latar belakang, informasi dasar, dan kebijakan operasional studi kasus Toko Mebel Maju.", 
      path: "/accurate/info-perusahaan", 
      status: "Available",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-orange-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      )
    },

   { 
      id: "kelola-fitur",
      title: "2. Setup Preferensi & Fitur", 
      desc: "Panduan aktivasi modul spesifik (Penjualan, Pembelian, Persediaan) untuk menyesuaikan operasional sistem dengan skala bisnis.", 
      // path: "/accurate/kelola-fitur", 
      // status: "Available",
      path: "#", 
      status: "Coming Soon",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-orange-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      )
    },

    { 
      id: "akun-perkiraan",
      title: "3. Setup Akun Perkiraan", 
      desc: "Materi dan video panduan lengkap mengenai Chart of Accounts, saldo awal, klasifikasi, dan pemetaan akun default.", 
      // path: "/accurate/akun-perkiraan", 
      // status: "Available",
      path: "#", 
      status: "Coming Soon",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-orange-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    },

   { 
      id: "barang-jasa",
      title: "4. Setup Barang & Jasa", 
      desc: "Pengelolaan database inventory, pendaftaran kategori barang, satuan ukuran, dan penentuan harga jual/beli standar.", 
      path: "#", 
      status: "Coming Soon",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      )
    },

    { 
      id: "pelanggan",
      title: "5. Setup Pelanggan & Pemasok", 
      desc: "Pendaftaran customer dan supplier baru, pengaturan termin pembayaran, pajak, serta pencatatan piutang dan hutang awal.", 
      path: "#", 
      status: "Coming Soon",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <Reveal>
        <div className="text-center mb-12">
          <h3 className="text-xl font-bold uppercase text-orange-500 tracking-widest mb-3">Katalog Pembelajaran</h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">Portofolio Accurate Online</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pilih modul di bawah ini untuk melihat materi, dokumentasi, dan video demo mengenai setup awal database perusahaan di sistem akuntansi Accurate.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {modules.map((mod, idx) => (
          <Reveal key={idx}>
            <Link 
              to={mod.status === "Available" ? mod.path : "#"}
              className={`block h-full bg-gray-800/60 border rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                mod.status === "Available" 
                  ? "border-gray-700 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 cursor-pointer group" 
                  : "border-gray-800 opacity-60 cursor-not-allowed"
              }`}
              onClick={(e) => {
                if (mod.status !== "Available") e.preventDefault();
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${mod.status === "Available" ? "bg-orange-500/20" : "bg-gray-700/50"}`}>
                  {mod.icon}
                </div>
                {mod.status === "Available" ? (
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">
                    Tersedia
                  </span>
                ) : (
                  <span className="bg-gray-700 text-gray-400 text-xs font-bold px-3 py-1 rounded-full border border-gray-600">
                    Coming Soon
                  </span>
                )}
              </div>
              
              <h3 className={`text-2xl font-bold mb-3 ${mod.status === "Available" ? "text-white group-hover:text-orange-500 transition-colors" : "text-gray-400"}`}>
                {mod.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {mod.desc}
              </p>

              {mod.status === "Available" && (
                <div className="flex items-center text-orange-500 font-bold text-sm">
                  Lihat Modul & Demo Video
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

const Publications: React.FC = () => {
  const publicationList = [
    { title: "PENGEMBANGAN WEB DINAS PERPUSTAKAAN DAN ARSIP BERBASIS LARAVEL FRAMEWORK PADA DPAD Kota TANGERANG", journal: "Jurnal Mahasiswa Teknik Informatika (Jurnal Teknologi Informasi)", date: "Desember 2023", desc: "Penelitian ini membahas pengembangan web Dinas Perpustakaan dan Arsip berbasis Laravel Framework pada DPAD Kota Tangerang untuk meningkatkan layanan perpustakaan dan Arsip digital.", link: "https://ejournal.itn.ac.id/index.php/jati/article/view/7840", authors: ["Agam Adensa", "Kamilah Raihan", "Rizky Faisal Rafi", "Irwan Richwandi Putra", " Firda Azizah"] },
  ];
  const DocumentIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);

  return (
    <section id="publications" className="mx-auto mt-12 max-w-6xl px-4 py-12">
      <Reveal>
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Riset & Akademik</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Publikasi Jurnal</h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publicationList.map((pub, idx) => (
          <Reveal key={idx} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 shadow-xl flex flex-col transition-transform transform hover:-translate-y-2">
            <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
            <p className="text-sm text-cyan-400 font-semibold mb-1">{pub.journal}</p>
            <p className="text-xs text-gray-400 mb-4">{pub.authors.join(", ")} - {pub.date}</p>
            <p className="text-gray-300 flex-grow mb-6">{pub.desc}</p>
            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-700 rounded-lg transition-colors hover:bg-[#3498db] self-start">
              <DocumentIcon /> Baca Publikasi
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// --- [KOMPONEN BARU: FORM INPUT DATA HRD DENGAN LOCK SCREEN KODE AKSES] ---
const HRDDataForm: React.FC = () => {
  // PENTING: Ganti URL di bawah ini dengan URL Web App dari Google Apps Script yang Anda deploy
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby3BRL50OdjvJYzOJAYng_SnCEOsJw88kYBEEH0H0J6Oft7BgFC5Zp86aBRsw_62QF9/exec";

  // State untuk Keamanan (Lock Screen)
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authStatus, setAuthStatus] = useState<{ type: "idle" | "loading" | "error"; message: string }>({ type: "idle", message: "" });

  // State untuk CRUD Data
  const [formData, setFormData] = useState({
    companyName: "",
    newCompanyName: "",
    emailLink: "",
    subjectFormat: "",
    source: "",
    sendDate: ""
  });
  const [formMode, setFormMode] = useState<"add" | "update" | "delete">("add");
  const [companyList, setCompanyList] = useState<string[]>([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: ""
  });

  // Mengecek apakah sebelumnya sudah login di sesi ini
  useEffect(() => {
    if (sessionStorage.getItem("hrd_authorized") === "true") {
      setIsAuthorized(true);
    }
  }, []);

  // --- Fungsi Verifikasi Kode ---
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus({ type: "loading", message: "Memverifikasi kode..." });

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "verify_code", passcode })
      });
      const result = await response.json();

      if (result.status === "success") {
        setIsAuthorized(true);
        sessionStorage.setItem("hrd_authorized", "true");
        setAuthStatus({ type: "idle", message: "" });
      } else {
        setAuthStatus({ type: "error", message: result.message });
        setPasscode(""); // Reset input jika salah
      }
    } catch (error) {
      setAuthStatus({ type: "error", message: "Gagal terhubung ke server." });
    }
  };

  // --- Fungsi Keluar/Logout ---
  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem("hrd_authorized");
    setPasscode("");
    setCompanyList([]);
  };

  // --- Fungsi CRUD ---
  const fetchCompanies = async () => {
    setIsLoadingCompanies(true);
    setStatus({ type: "loading", message: "Memuat daftar perusahaan..." });
    
    try {
      const response = await fetch(SCRIPT_URL);
      const result = await response.json();
      
      if (result.status === "success") {
        setCompanyList(result.data);
        setStatus({ type: "idle", message: "" });
      } else {
        setStatus({ type: "error", message: "Gagal memuat daftar perusahaan." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Terjadi kesalahan koneksi saat memuat data." });
    } finally {
      setIsLoadingCompanies(false);
    }
  };

  const handleModeSwitch = (mode: "add" | "update" | "delete") => {
    setFormMode(mode);
    setStatus({ type: "idle", message: "" });
    setFormData({ companyName: "", newCompanyName: "", emailLink: "", subjectFormat: "", source: "", sendDate: "" });
    
    if (mode === "update" || mode === "delete") {
      fetchCompanies(); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formMode === "delete") {
      const confirmDelete = window.confirm(`Apakah Anda yakin ingin mengosongkan data "${formData.companyName}"?`);
      if (!confirmDelete) return;
    }

    setStatus({ 
      type: "loading", 
      message: formMode === "add" ? "Sedang menyimpan data baru..." : formMode === "update" ? "Sedang memperbarui data..." : "Sedang mengosongkan sel data..." 
    });

    try {
      const payload = { ...formData, action: formMode };

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === "error") {
        setStatus({ type: "error", message: result.message });
      } else {
        setStatus({ type: "success", message: result.message });
        setFormData({ companyName: "", newCompanyName: "", emailLink: "", subjectFormat: "", source: "", sendDate: "" });
        
        if (formMode === "add") {
           setCompanyList([]);
        } else {
           fetchCompanies();
        }
      }
    } catch (error) {
      setStatus({ type: "error", message: "Terjadi kesalahan koneksi. Gagal memproses permintaan." });
    }
  };

  const isAdd = formMode === "add";
  const isUpdate = formMode === "update";
  const isDelete = formMode === "delete";

  // --- TAMPILAN JIKA BELUM LOGIN (LOCK SCREEN) ---
  if (!isAuthorized) {
    return (
      <section id="hrd-data-form" className="max-w-md mx-auto py-12 px-4">
        <Reveal className="bg-gray-800/80 rounded-2xl p-8 border border-gray-700 shadow-2xl text-center backdrop-blur-sm relative overflow-hidden">
          {/* Ikon Gembok */}
          <div className="mx-auto w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700 shadow-inner mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#3498db]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Area Terbatas</h2>
          <p className="text-gray-400 text-sm mb-8">Silakan masukkan kode akses untuk membuka fitur Internal Tools.</p>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <input 
              type="password" 
              required 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)} 
              placeholder="Masukkan Kode Akses" 
              className="w-full px-4 py-3 bg-gray-900 text-center tracking-widest border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3498db]" 
            />
            
            {authStatus.type === "error" && <p className="text-red-400 text-xs font-semibold">{authStatus.message}</p>}
            
            <button
              type="submit"
              disabled={authStatus.type === "loading"}
              className="w-full py-3 bg-[#3498db] hover:bg-[#2980b9] text-white font-bold rounded-lg shadow-lg transition-colors disabled:opacity-50"
            >
              {authStatus.type === "loading" ? "Memverifikasi..." : "Buka Akses"}
            </button>
          </form>
        </Reveal>
      </section>
    );
  }

  // --- TAMPILAN FORM UTAMA JIKA SUDAH LOGIN ---
  return (
    <section id="hrd-data-form" className="max-w-4xl mx-auto py-12 px-4 relative">
      <Reveal className="bg-gray-800/50 rounded-2xl p-8 md:p-10 border border-gray-700 shadow-xl">
        
        {/* Tombol Logout (Kunci Kembali) di pojok kanan atas form */}
        <button 
          onClick={handleLogout}
          className="absolute top-10 right-8 md:top-12 md:right-12 flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors bg-gray-900 px-3 py-1.5 rounded-md border border-gray-700"
          title="Kunci Akses Kembali"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span className="hidden sm:inline">Kunci</span>
        </button>

        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Internal Tools</h3>
          <h2 className="text-3xl font-bold text-white mb-5">HRD Data Entry Form</h2>
          
          {/* --- [TAMBAHAN: TOMBOL MENUJU SPREADSHEET] --- */}
          <a 
            href="https://docs.google.com/spreadsheets/d/1iq77FQCvdpYAZykEjcARzMk0drzpSethHKG6qCsw_-Y/edit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-[#217346] bg-[#217346]/10 border border-[#217346]/30 rounded-lg hover:bg-[#217346]/20 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Buka File Spreadsheet
          </a>
        </div>

        {/* --- [INFORMATION RULES BOX] --- */}
        <div className="mb-8 p-5 bg-[#3498db]/10 border border-[#3498db]/30 rounded-xl text-left shadow-inner">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#3498db]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Aturan Sistem (System Rules)
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-[#3498db] mt-0.5">▪</span>
              <span><strong className="text-white">Anti-Duplikasi:</strong> Sistem akan mendeteksi dan menolak data baru jika <b>Nama Perusahaan</b> sudah terdaftar.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3498db] mt-0.5">▪</span>
              <span><strong className="text-white">Update Parsial:</strong> Pada mode Update, kolom yang dibiarkan <b>KOSONG</b> tidak akan menghapus atau menimpa data lama Anda.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#3498db] mt-0.5">▪</span>
              <span><strong className="text-white">Kosongkan Data:</strong> Mode Hapus Data hanya akan menghapus isi teks (Kolom B - F), <b>tanpa merusak</b> urutan baris atau format kolom status.</span>
            </li>
          </ul>
        </div>

        {/* TOGGLE MODE */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-8 bg-gray-900 p-1.5 rounded-lg w-full max-w-lg mx-auto border border-gray-700">
          <button 
            type="button"
            onClick={() => handleModeSwitch("add")}
            className={`flex-1 py-2 px-3 text-sm font-bold rounded-md transition-all duration-300 ${isAdd ? "bg-[#3498db] text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            ➕ Tambah Data
          </button>
          <button 
            type="button"
            onClick={() => handleModeSwitch("update")}
            className={`flex-1 py-2 px-3 text-sm font-bold rounded-md transition-all duration-300 ${isUpdate ? "bg-[#f39c12] text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            ✏️ Update Data
          </button>
          <button 
            type="button"
            onClick={() => handleModeSwitch("delete")}
            className={`flex-1 py-2 px-3 text-sm font-bold rounded-md transition-all duration-300 ${isDelete ? "bg-[#e74c3c] text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            🗑️ Hapus Data
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-1 ${isDelete ? "text-[#e74c3c]" : "text-gray-300"}`}>
                {isAdd ? "Nama Perusahaan *" : "Pilih Perusahaan (Target) *"}
              </label>
              {isAdd ? (
                <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} placeholder="Contoh: PT ABC Terang" className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#3498db]" />
              ) : (
                <select 
                  name="companyName" required value={formData.companyName} onChange={handleChange} disabled={isLoadingCompanies}
                  className={`w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 disabled:opacity-50 ${isDelete ? "focus:ring-[#e74c3c]" : "focus:ring-[#f39c12]"}`}
                >
                  <option value="" disabled>{isLoadingCompanies ? "Memuat data..." : "-- Pilih Perusahaan --"}</option>
                  {companyList.map((comp, idx) => (
                    <option key={idx} value={comp}>{comp}</option>
                  ))}
                </select>
              )}
            </div>

            {!isDelete && (
              <>
                {isUpdate && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#f39c12] mb-1">Ubah Nama Perusahaan Menjadi</label>
                    <input type="text" name="newCompanyName" value={formData.newCompanyName} onChange={handleChange} placeholder="Kosongkan jika tidak diubah" className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f39c12]" />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email / Link Form / Job Link {isAdd && "*"}</label>
                  <input type="text" name="emailLink" required={isAdd} value={formData.emailLink} onChange={handleChange} placeholder={isAdd ? "Contoh: hrd@abc.com" : "Kosongkan jika tidak diubah"} className={`w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 ${isAdd ? "focus:ring-[#3498db]" : "focus:ring-[#f39c12]"}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Format Subject Email {isAdd && "*"}</label>
                  <input type="text" name="subjectFormat" required={isAdd} value={formData.subjectFormat} onChange={handleChange} placeholder={isAdd ? "Contoh: Posisi_Nama" : "Kosongkan jika tidak diubah"} className={`w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 ${isAdd ? "focus:ring-[#3498db]" : "focus:ring-[#f39c12]"}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Sumber {isAdd && "*"}</label>
                  <input type="text" name="source" required={isAdd} value={formData.source} onChange={handleChange} placeholder={isAdd ? "Contoh: IG: lokerjakarta" : "Kosongkan jika tidak diubah"} className={`w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 ${isAdd ? "focus:ring-[#3498db]" : "focus:ring-[#f39c12]"}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tgl Kirim {isAdd && "*"}</label>
                  <input type="date" name="sendDate" required={isAdd} value={formData.sendDate} onChange={handleChange} className={`w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 ${isAdd ? "focus:ring-[#3498db]" : "focus:ring-[#f39c12]"}`} />
                </div>
              </>
            )}
          </div>

          {/* Menampilkan Status Notifikasi */}
          {status.type !== "idle" && (
            <div className={`p-4 rounded-lg font-medium text-sm flex items-center gap-2 ${
              status.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50" :
              status.type === "error" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
              "bg-gray-800 text-gray-300 border border-gray-600"
            }`}>
              {status.type === "success" && <span>✅</span>}
              {status.type === "error" && <span>❌</span>}
              {status.type === "loading" && <span className="animate-spin">⏳</span>}
              {status.message}
            </div>
          )}

          <div className="pt-2 text-center md:text-left">
            <button
              type="submit"
              disabled={status.type === "loading" || isLoadingCompanies}
              className={`w-full md:w-auto px-8 py-3 text-white font-bold rounded-lg shadow-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed ${
                isAdd ? "bg-[#3498db] hover:bg-[#2980b9]" : isUpdate ? "bg-[#f39c12] hover:bg-[#d68910]" : "bg-[#e74c3c] hover:bg-[#c0392b]"
              }`}
            >
              {status.type === "loading" 
                ? (isAdd ? "Menyimpan Data..." : isUpdate ? "Memperbarui Data..." : "Memproses Data...") 
                : (isAdd ? "Tambahkan ke Spreadsheet" : isUpdate ? "Simpan Perubahan (Update)" : "Kosongkan Data Ini")
              }
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
};


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
      <Reveal className="bg-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-800 shadow-2xl text-center">
        <h2 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">Kontak & Keahlian</h2>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Mari Berkolaborasi!</h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Punya proyek menarik? Saya selalu terbuka untuk diskusi, peluang, dan ide-ide baru. Jangan ragu menghubungi saya.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold text-white bg-[#3498db] rounded-lg shadow-lg transition-transform transform hover:scale-105">Hubungi di LinkedIn</a>
          <a href="https://wa.me/6285179730587" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold text-white bg-green-500 rounded-lg shadow-lg transition-transform transform hover:scale-105">Chat di WhatsApp</a>
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
      </Reveal>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-16 relative z-10">
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
          <Link className="text-gray-300 hover:text-[#3498db]" to="/accurate">Accurate</Link>
          <Link className="text-gray-300 hover:text-[#3498db]" to="/#contact">Contact</Link>
        </nav>
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rizky Faisal Rafi. All rights reserved.
        </div>
        {/* --- [TAMBAHAN: Tampilan Terakhir Diperbarui] --- */}
        <div className="text-gray-500/80 text-xs mt-3">
          Terakhir diperbarui: 5 Oktober 2026
        </div>
      </div>
    </footer>
  );
};

// --- [BAGIAN 8: HALAMAN HOME] ---
const HomePage = () => (
  <>
    <Hero />
    <WorkExperience />
    <Bootcamp />
    <Education />
    <Projects />
    <Microsoft365Projects />
    <Publications />
    {/* [TAMBAHAN BARU]: KOMPONEN FORM ENTRY DATA HRD */}
    <HRDDataForm />
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

  const handleBackToTop = () => slowScrollTo(0, 1500);

  return (
    <div className="min-h-screen m-0 p-0 bg-gray-900 text-white relative font-sans">
      <ScrollHandler />
      
      {/* [TAMBAHAN]: Panggil Komponen WelcomeModal di Sini */}
      <WelcomeModal />
      
      {/* Background Ornamen dan Komponen Burung Terbang */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#3498db]/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: '-5s' }}></div>
        <FlyingBird />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mini-erp" element={<MiniERPPage />} />
            <Route path="/accurate" element={<AccurateHubPage />} />

            <Route path="/accurate/info-perusahaan" element={<AccurateInfoPerusahaanPage />} />
            <Route path="/accurate/kelola-fitur" element={<AccurateKelolaFiturPage />} />
            {/* Menggunakan Route ke Komponen yang sudah dipisah ke file lain */}
            <Route path="/accurate/akun-perkiraan" element={<AccurateAkunPerkiraanPage />} />
            {/* <Route path="/accurate/barang-dan-jasa" element={<AccurateBarangDanJasaPage />} /> */}
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
        /* CSS Animasi Dasar */
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
        
        /* CSS Animasi Scroll Menggunakan Komponen <Reveal> */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.5, 0, 0, 1), transform 0.8s cubic-bezier(0.5, 0, 0, 1);
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* --- CSS ANIMASI BURUNG TERBANG --- */
        .bird-container {
          position: absolute;
          top: 20%;
          left: -10%;
          transform: scale(0) translateX(-10vw);
          will-change: transform;
          animation: flyAcross 20s linear infinite;
        }

        .bird {
          animation: flap 0.8s ease-in-out infinite alternate;
        }

        @keyframes flyAcross {
          0% {
            transform: scale(0.5) translateX(-10vw) translateY(0vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: scale(0.8) translateX(50vw) translateY(-10vh);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: scale(0.5) translateX(110vw) translateY(-20vh);
            opacity: 0;
          }
        }

        @keyframes flap {
          0% {
            transform: translateY(0px) rotate(-10deg);
          }
          100% {
            transform: translateY(15px) rotate(10deg);
          }
        }
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