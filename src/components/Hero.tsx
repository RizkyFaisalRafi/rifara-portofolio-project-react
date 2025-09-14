import React from "react";
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faUpwork,
  faMedium,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Hero: React.FC = () => {
  return (
    <section id="home">
      <div className="flex flex-row justify-center mt-32 items-center mx-auto">
        {/* Sosmed di kiri untuk sm ke atas */}
        <div className="hidden sm:flex flex-col items-center gap-4 mt-[120px] mx-10">
          <a
            href="https://github.com/RizkyFaisalRafi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccc] hover:text-[#010409] transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccc] hover:text-[#3498db] transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
        {/* Konten utama */}
        <div className="mt-16 max-w-[400px] text-left w-full">
          <h2 className="text-[#3498db] lg:text-2xl text-xl font-normal mb-3 p-0">
            Hello, I'm
          </h2>
          <h1 className="lg:text-2xl text-xl font-bold text-[#333] mt-0 mb-2">
            Hendrawan Wibowo
          </h1>
          <h3 className="lt:text-xl text-[1rem] font-bold text-[#333] mb-3 mt-0">
            <Typewriter
              options={{
                strings: [
                  "Software Engineer",
                  "Android Developer",
                  "Mobile Developer",
                  "Full Stack Developer",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>
          {/* <p className="hero-desc">
            Mobile Developer with 3+ years of experience in mobile app development. I can help you to bring your idea to reality with quality.
          </p> */}
          <div className="flex flex-col gap-3 w-full">
            <button
              className="text-lg font-medium rounded-[8px] bg-[#3498db] text-white px-8 py-3 shadow-md hover:bg-[#2176bd] transition-colors duration-1000"
              onClick={() =>
                window.open(
                  "https://fastwork.id/user/haaweejee/mobile-application-41653394?source=seller-center_my-service",
                  "_blank"
                )
              }
            >
              Hire Me
            </button>
            <button
              className="text-lg font-medium rounded-[8px] bg-[#3498db] text-white px-8 py-3 shadow-md hover:bg-[#2176bd] transition-colors duration-1000"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1eb_LOQZ-Er1baGU5aNUDku4TFMViWdFH/view?usp=sharing",
                  "_blank"
                )
              }
            >
              Download My CV
            </button>
            {/* Sosmed di bawah tombol untuk < sm */}
            <div className="flex sm:hidden flex-row justify-center gap-4 mt-4">
              <a
                href="https://github.com/RizkyFaisalRafi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ccc] hover:text-[#010409] transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
              <a
                href="https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ccc] hover:text-[#3498db] transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
