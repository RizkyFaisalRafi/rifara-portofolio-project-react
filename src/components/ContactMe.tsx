import React from "react";

const ContactMe: React.FC = () => (
  <section id="contact" className="py-[60px] pb-[80px] flex justify-center">
    <div className="max-w-[900px] mx-auto text-center">
      <img
        src="/profile.jpg"
        alt="Profile"
        className="w-[150px] h-[150px] rounded-full object-cover mb-6 items-center justify-center mx-auto"
      />
      <p className="text-[1.2rem] mb-9 text-[#fff] leading-[1.6]">
        Android Developer with 3+ years of experience in mobile app development,
        specializing in building high-quality, scalable applications. Currently
        working at Salt Indonesia as an Android Developer, where I contributed
        to the development of the Dunia Games Android application by Telkomsel.
        Passionate about mobile development, with expertise in native Android
        development (Kotlin, Jetpack Compose) and experience in hybrid app
        development using Flutter. Dedicated to delivering seamless user
        experiences and writing clean, maintainable code.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-8">
        <a
          href="https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225/"
          className="flex items-center gap-2 px-7 py-3 rounded-[32px] border border-[#888] bg-[#181818] text-white text-[1.1rem] font-medium no-underline transition-colors duration-200 hover:bg-[#3498db] hover:text-white"
        >
          Let&apos;s Connect <span className="text-[1.3em] ml-1.5">→</span>
        </a>
        <a
          href="https://wa.me/6282217106768"
          className="flex items-center gap-2 px-7 py-3 rounded-[32px] border border-[#888] bg-[#181818] text-white text-[1.1rem] font-medium no-underline transition-colors duration-200 hover:bg-[#3498db] hover:text-white"
        >
          Let&apos;s Chat <span className="text-[1.3em] ml-1.5">→</span>
        </a>
      </div>
    </div>
  </section>
);

export default ContactMe;
