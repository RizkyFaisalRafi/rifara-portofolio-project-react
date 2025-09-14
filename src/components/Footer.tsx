import React from "react";

// --- Komponen & Ikon SVG Pendukung ---
// Didefinisikan di sini agar komponen ini mandiri.

// Komponen Ikon Sosial Media
const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-[#3498db] transition-transform duration-300 hover:scale-110"
  >
    {children}
  </a>
);

// Ikon-ikon SVG
const ICONS = {
  linkedin: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.7,3H4.3C3.5,3,3,3.5,3,4.3v15.4C3,20.5,3.5,21,4.3,21h15.4c0.8,0,1.3-0.5,1.3-1.3V4.3C21,3.5,20.5,3,19.7,3z M8.4,18.4H5.4V9.7h3V18.4z M6.9,8.4C5.9,8.4,5,7.5,5,6.5c0-1,0.9-1.9,1.9-1.9c1,0,1.9,0.9,1.9,1.9C8.8,7.5,7.9,8.4,6.9,8.4z M18.4,18.4h-3v-4.6c0-1.1-0.4-1.9-1.4-1.9c-0.8,0-1.2,0.5-1.4,1v5.5H9.6V9.7h3v1.3c0.4-0.7,1.1-1.4,2.5-1.4c1.8,0,3.3,1.2,3.3,3.7V18.4z" />
    </svg>
  ),
  github: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,2.2C6.5,2.2,2.2,6.5,2.2,12c0,4.3,2.8,8,6.6,9.3c0.5,0.1,0.7-0.2,0.7-0.5v-1.7c-2.7,0.6-3.3-1.3-3.3-1.3c-0.4-1.1-1.1-1.4-1.1-1.4c-0.9-0.6,0.1-0.6,0.1-0.6c1,0.1,1.5,1,1.5,1c0.9,1.5,2.3,1.1,2.9,0.8c0.1-0.7,0.3-1.1,0.6-1.3c-2.2-0.3-4.5-1.1-4.5-4.9c0-1.1,0.4-2,1-2.7c-0.1-0.3-0.5-1.3,0.1-2.7c0,0,0.8-0.3,2.7,1c0.8-0.2,1.6-0.3,2.5-0.3s1.7,0.1,2.5,0.3c1.9-1.3,2.7-1,2.7-1c0.6,1.4,0.2,2.4,0.1,2.7c0.6,0.7,1,1.6,1,2.7c0,3.8-2.3,4.6-4.5,4.9c0.4,0.3,0.7,0.9,0.7,1.8v2.7c0,0.3,0.2,0.6,0.7,0.5c3.8-1.3,6.6-5,6.6-9.3C21.8,6.5,17.5,2.2,12,2.2z" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2z M16.3,14.6c-0.2,0.4-0.8,0.7-1.4,0.7c-0.5,0-1-0.2-2.8-1.1C10.1,13,9,11.5,8.8,11.2c-0.2-0.3-0.9-1.1-0.9-2.1c0-1,0.6-1.5,0.8-1.7c0.2-0.2,0.5-0.3,0.7-0.3c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.2,0.5,0.6c0.1,0.4,0.4,1,0.5,1.1c0.1,0.1,0.1,0.2,0-0.1c-0.1-0.2-0.2-0.4-0.4-0.5c-0.2-0.1-0.4-0.2-0.5-0.2c-0.2,0-0.4,0-0.5,0.1c-0.2,0.1-0.5,0.3-0.7,0.5c-0.2,0.3-0.3,0.5-0.4,0.7c-0.1,0.2-0.1,0.5,0,0.7c0.1,0.2,0.2,0.4,0.4,0.6c0.4,0.5,0.8,0.9,1.3,1.3c0.8,0.5,1.6,0.8,2.4,1c0.2,0,0.4,0.1,0.6,0c0.2-0.1,0.5-0.3,0.6-0.6c0.1-0.3,0.1-0.6,0.1-0.8c0-0.2-0.1-0.5-0.2-0.6c-0.1-0.2-0.3-0.3-0.5-0.4C14.1,12.3,14,12.2,14,12c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.1-0.1,0.2-0.2c0.4-0.2,0.7-0.4,0.9-0.7c0.2-0.2,0.3-0.5,0.4-0.8c0.1-0.3,0-0.6-0.1-0.8C15.3,9,15.1,8.8,14.8,8.7c-0.3-0.1-0.6-0.1-0.8,0c-0.2,0.1-0.4,0.2-0.6,0.4c-0.2,0.1-0.3,0.3-0.5,0.4c-0.1,0.1-0.3,0.3-0.4,0.4c-0.1,0.1-0.2,0.1-0.3,0.1s-0.2-0.1-0.2-0.2c0-0.1-0.1-0.6-0.1-0.8c0-0.3,0-0.7,0.1-1c0.1-0.4,0.3-0.8,0.6-1.1c0.3-0.3,0.7-0.5,1.1-0.6c0.4-0.1,0.8-0.1,1.2,0c0.4,0.1,0.8,0.3,1.1,0.6s0.5,0.7,0.6,1.1c0.1,0.4,0.1,0.8,0,1.2c-0.1,0.4-0.3,0.8-0.6,1.1C16.9,14.1,16.6,14.4,16.3,14.6z" />
    </svg>
  ),
};

const Footer: React.FC = () => {
  // Tombol untuk kembali ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="mb-6">
          <button
            onClick={scrollToTop}
            className="group mx-auto flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span className="mb-2 block h-8 w-8 rounded-full border-2 border-gray-600 group-hover:border-[#3498db] flex items-center justify-center transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                ></path>
              </svg>
            </span>
            Kembali ke Atas
          </button>
        </div>

        <div className="text-2xl font-bold mb-4 text-white">
          <span>Rizky </span>
          <span className="text-[#3498db]">Faisal Rafi</span>
        </div>

        <nav className="flex justify-center gap-6 sm:gap-8 mb-8 flex-wrap">
          <a
            className="text-gray-300 font-medium no-underline transition-colors duration-200 hover:text-[#3498db]"
            href="#home"
          >
            Home
          </a>
          <a
            className="text-gray-300 font-medium no-underline transition-colors duration-200 hover:text-[#3498db]"
            href="#experience"
          >
            Experience
          </a>
          <a
            className="text-gray-300 font-medium no-underline transition-colors duration-200 hover:text-[#3498db]"
            href="#projects"
          >
            Projects
          </a>
          <a
            className="text-gray-300 font-medium no-underline transition-colors duration-200 hover:text-[#3498db]"
            href="#contact"
          >
            Contact
          </a>
        </nav>

        <div className="flex justify-center gap-6 mb-8">
          <SocialIcon href="https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225/">
            {ICONS.linkedin}
          </SocialIcon>
          <SocialIcon href="https://github.com/RizkyFaisalRafi">
            {ICONS.github}
          </SocialIcon>
          <SocialIcon href="https://wa.me/62895412892094">
            {ICONS.whatsapp}
          </SocialIcon>
        </div>

        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rizky Faisal Rafi. All rights
          reserved.
          <br />
          Dibuat dengan <span className="text-red-500">&hearts;</span> dan
          React.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
