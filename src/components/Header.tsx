import React, { useState } from "react";
// import './Header.css';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white rounded-[50px] flex items-center justify-between max-w-[1200px] mx-auto p-[12px_48px] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <div className="text-[1.4rem] font-bold text-[#333]">
        <span>Haaw</span>
        <span className="text-[#3498db]">eejee</span>
        <span className="text-[#3498db] text-[1.5rem]">.</span>
      </div>
      {/* Burger menu button for mobile */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 ml-auto z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {/* Burger icon */}
        {!menuOpen ? (
          <>
            <span className="block w-6 h-0.5 bg-[#333] mb-1 transition-all"></span>
            <span className="block w-6 h-0.5 bg-[#333] mb-1 transition-all"></span>
            <span className="block w-6 h-0.5 bg-[#333] transition-all"></span>
          </>
        ) : (
          // Close (X) icon
          <span className="block w-8 h-8 relative">
            <span className="absolute left-0 top-1/2 w-8 h-0.5 bg-[#333] rotate-45"></span>
            <span className="absolute left-0 top-1/2 w-8 h-0.5 bg-[#333] -rotate-45"></span>
          </span>
        )}
      </button>
      {/* Navigation */}
      <nav>
        <ul
          className={`lg:flex gap-[40px] list-none lg:my-0 lg:p-0 my-6 p-10 lg:static lg:flex-row lg:bg-transparent lg:shadow-none lg:rounded-none
            fixed left-0 lg:w-full md:w-3/4 w-1/2 bg-white shadow-lg  flex-col items-center z-40 transition-all duration-500
            ${
              menuOpen ? "top-[70px] flex" : "top-[-500px] hidden"
            } lg:flex lg:mb-0 lg-4
          `}
          style={{
            maxWidth: menuOpen ? "100vw" : undefined,
          }}
        >
          <li className="text-[1.2rem] font-serif cursor-pointer transition-colors duration-200 text-[#333] hover:text-[#3498db]">
            <a href="#home" className="no-underline text-inherit">
              Home
            </a>
          </li>
          <li className="text-[1.2rem] font-serif cursor-pointer transition-colors duration-200 text-[#333] hover:text-[#3498db]">
            <a href="#experience" className="no-underline text-inherit">
              Experience
            </a>
          </li>
          <li className="text-[1.2rem] font-serif cursor-pointer transition-colors duration-200 text-[#333] hover:text-[#3498db]">
            <a href="#projects" className="no-underline text-inherit">
              Projects
            </a>
          </li>
          <li className="text-[1.2rem] font-serif cursor-pointer transition-colors duration-200 text-[#333] hover:text-[#3498db]">
            <a href="#contact" className="no-underline text-inherit">
              Contact Me
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
