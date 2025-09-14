import React from "react";

// --- Komponen Pengganti & SVG Ikon ---
// Untuk membuat komponen ini mandiri dan lebih optimal, kita definisikan semuanya di sini.

// Komponen untuk setiap kotak skill dengan efek hover
const SkillBox: React.FC<{ name: string; icon: React.ReactNode }> = ({
  name,
  icon,
}) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:bg-[#3498db]/20 hover:border-[#3498db] hover:scale-105 shadow-lg">
    <div className="text-4xl text-gray-300">{icon}</div>
    <p className="font-semibold text-white text-sm">{name}</p>
  </div>
);

// Komponen untuk tombol utama dengan efek hover
const PrimaryButton: React.FC<{
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ href, children, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-3 px-6 py-3 font-semibold text-white bg-[#3498db] rounded-lg shadow-lg shadow-[#3498db]/30 transition-all duration-300 hover:bg-[#2980b9] hover:shadow-xl hover:-translate-y-1"
  >
    {icon}
    {children}
  </a>
);

// --- Ikon SVG untuk menggantikan FontAwesome ---
const SvgIcon = ({
  path,
  className = "w-8 h-8",
}: {
  path: string;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d={path} />
  </svg>
);

const ICONS = {
  linkedin: (
    <SvgIcon path="M19.7,3H4.3C3.5,3,3,3.5,3,4.3v15.4C3,20.5,3.5,21,4.3,21h15.4c0.8,0,1.3-0.5,1.3-1.3V4.3C21,3.5,20.5,3,19.7,3z M8.4,18.4H5.4V9.7h3V18.4z M6.9,8.4C5.9,8.4,5,7.5,5,6.5c0-1,0.9-1.9,1.9-1.9c1,0,1.9,0.9,1.9,1.9C8.8,7.5,7.9,8.4,6.9,8.4z M18.4,18.4h-3v-4.6c0-1.1-0.4-1.9-1.4-1.9c-0.8,0-1.2,0.5-1.4,1v5.5H9.6V9.7h3v1.3c0.4-0.7,1.1-1.4,2.5-1.4c1.8,0,3.3,1.2,3.3,3.7V18.4z" />
  ),
  whatsapp: (
    <SvgIcon path="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2z M16.3,14.6c-0.2,0.4-0.8,0.7-1.4,0.7c-0.5,0-1-0.2-2.8-1.1C10.1,13,9,11.5,8.8,11.2c-0.2-0.3-0.9-1.1-0.9-2.1c0-1,0.6-1.5,0.8-1.7c0.2-0.2,0.5-0.3,0.7-0.3c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.3,0.2,0.5,0.6c0.1,0.4,0.4,1,0.5,1.1c0.1,0.1,0.1,0.2,0-0.1c-0.1-0.2-0.2-0.4-0.4-0.5c-0.2-0.1-0.4-0.2-0.5-0.2c-0.2,0-0.4,0-0.5,0.1c-0.2,0.1-0.5,0.3-0.7,0.5c-0.2,0.3-0.3,0.5-0.4,0.7c-0.1,0.2-0.1,0.5,0,0.7c0.1,0.2,0.2,0.4,0.4,0.6c0.4,0.5,0.8,0.9,1.3,1.3c0.8,0.5,1.6,0.8,2.4,1c0.2,0,0.4,0.1,0.6,0c0.2-0.1,0.5-0.3,0.6-0.6c0.1-0.3,0.1-0.6,0.1-0.8c0-0.2-0.1-0.5-0.2-0.6c-0.1-0.2-0.3-0.3-0.5-0.4C14.1,12.3,14,12.2,14,12c0-0.1,0-0.2,0.1-0.3c0.1-0.1,0.1-0.1,0.2-0.2c0.4-0.2,0.7-0.4,0.9-0.7c0.2-0.2,0.3-0.5,0.4-0.8c0.1-0.3,0-0.6-0.1-0.8C15.3,9,15.1,8.8,14.8,8.7c-0.3-0.1-0.6-0.1-0.8,0c-0.2,0.1-0.4,0.2-0.6,0.4c-0.2,0.1-0.3,0.3-0.5,0.4c-0.1,0.1-0.3,0.3-0.4,0.4c-0.1,0.1-0.2,0.1-0.3,0.1s-0.2-0.1-0.2-0.2c0-0.1-0.1-0.6-0.1-0.8c0-0.3,0-0.7,0.1-1c0.1-0.4,0.3-0.8,0.6-1.1c0.3-0.3,0.7-0.5,1.1-0.6c0.4-0.1,0.8-0.1,1.2,0c0.4,0.1,0.8,0.3,1.1,0.6s0.5,0.7,0.6,1.1c0.1,0.4,0.1,0.8,0,1.2c-0.1,0.4-0.3,0.8-0.6,1.1C16.9,14.1,16.6,14.4,16.3,14.6z" />
  ),
};

const Contact: React.FC = () => {
  // Daftar skill dengan path gambar atau komponen ikon SVG
  const skills = [
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
      name: "TypeScript",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg"
          alt="TypeScript"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Golang",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg"
          alt="Golang"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "React",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
          alt="React"
          className="w-10 h-10"
        />
      ),
    },
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
      name: "Node.js",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
          alt="Node.js"
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
      name: "PostgreSQL",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg"
          alt="PostgreSQL"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Docker",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"
          alt="Docker"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Git",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg"
          alt="Git"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "GitHub",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg"
          alt="GitHub"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Jetpack Compose",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jetpackcompose/jetpackcompose-original.svg"
          alt="Jetpack Compose"
          className="w-10 h-10"
        />
      ),
    },
    {
      name: "Android Studio",
      icon: (
        <img
          src="https://raw.githubusercontent.com/devicons/devicon/master/icons/androidstudio/androidstudio-original.svg"
          alt="Android Studio"
          className="w-10 h-10"
        />
      ),
    },
  ];

  return (
    <section id="contact" className="max-w-6xl mx-auto py-12 px-4">
      <div className="bg-gray-900/50 rounded-2xl p-8 md:p-12 border border-gray-800 shadow-2xl">
        <div className="text-center">
          <h2 className="text-lg font-semibold uppercase text-[#3498db] tracking-wider mb-2">
            Kontak & Keahlian
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Mari Berkolaborasi!
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Punya proyek menarik atau sekadar ingin menyapa? Saya selalu terbuka
            untuk diskusi, peluang, dan ide-ide baru. Jangan ragu untuk
            menghubungi saya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton
              href="https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225/"
              icon={ICONS.linkedin}
            >
              Hubungi di LinkedIn
            </PrimaryButton>
            <PrimaryButton
              href="https://wa.me/62895412892094"
              icon={ICONS.whatsapp}
            >
              Chat di WhatsApp
            </PrimaryButton>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Teknologi yang Saya Kuasai
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {skills.map((skill) => (
              <SkillBox key={skill.name} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
