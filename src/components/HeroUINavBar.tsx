import React, { useState, useEffect } from "react";

// --- Komponen & Ikon Pendukung ---
// Didefinisikan di sini agar komponen ini mandiri dan mudah digunakan.

// Logo Perusahaan/Personal
const BrandLogo = () => (
  <a
    href="#home"
    className="text-xl font-bold text-white transition-opacity hover:opacity-80"
  >
    <span className="text-[#cf0d0d]">Rizky </span>
    <span className="text-[#3498db]">Faisal </span>
    <span className="text-[#a3e400]">Rafi </span>
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

// Komponen Navbar Utama
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Daftar item menu
  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Bootcamp & Certification", href: "#bootcamp" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Efek untuk mengunci scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  // Efek untuk mendeteksi scroll dan mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Deteksi seksi aktif
      const sections = menuItems.map((item) =>
        document.getElementById(item.href.substring(1))
      );
      let currentSection = "home";
      sections.forEach((section) => {
        if (section && window.scrollY >= section.offsetTop - 100) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

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
            <div className="flex-shrink-0">
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

      {/* Mobile Menu Overlay */}
      <div
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
      </div>
    </>
  );
};

export default Navbar;
