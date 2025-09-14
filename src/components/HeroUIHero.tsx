import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faNodeJs,
  faGoogle,
  faDocker,
  faJs,
  faGolang,
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { SkillProps } from "../models/SkillProps";
import PrimaryButton from "./widget/PrimaryButton";
import SecondaryButton from "./widget/SecondaryButton";
import SkillsMarquee from "./widget/SkillsMarquee";
import SocialLinks from "../components/moleculs/SocialLinks";
import HeroIntro from "../components/moleculs/HeroIntro";

const skillList: SkillProps[] = [
  { name: "Kotlin", logo: "/kotlin-original.svg" },
  { name: "Dart", logo: "/dart-original.svg" },
  { name: "Java", logo: "/java-original.svg" },
  { name: "Go", icon: <FontAwesomeIcon icon={faGolang} /> },
  { name: "JavaScript", icon: <FontAwesomeIcon icon={faJs} /> },
  { name: "TypeScript", logo: "/typescript-plain.svg" },
  { name: "React", icon: <FontAwesomeIcon icon={faReact} /> },
  { name: "Jetpack Compose", logo: "/jetpack-compose.webp" },
  { name: "Flutter", logo: "/flutter-original.svg" },
  {
    name: "Node.js",
    icon: (
      <FontAwesomeIcon
        icon={faNodeJs}
        className="text-green-400 text-4xl mr-3"
      />
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <FontAwesomeIcon
        icon={faDatabase}
        className="text-blue-400 text-4xl mr-3"
      />
    ),
  },
  {
    name: "Firebase",
    icon: (
      <FontAwesomeIcon
        icon={faGoogle}
        className="text-yellow-400 text-4xl mr-3"
      />
    ),
  },
  { name: "REST API" },
  {
    name: "Docker",
    icon: (
      <FontAwesomeIcon
        icon={faDocker}
        className="text-blue-400 text-4xl mr-3"
      />
    ),
  },
  { name: "CI/CD" },
  { name: "Agile" },
  { name: "Android Studio", logo: "/androidstudio-original.svg" },
  { name: "Github", logo: "/github-original.svg" },
];

const HeroUIHero: React.FC = () => {
  return (
    <div
      id="home"
      className="flex flex-col min-h-screen text-white px-4 sm:px-6 lg:px-8"
    >
      {/* Main Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center mx-auto mt-8 sm:mt-12 lg:mt-16 gap-4 lg:gap-8 max-w-7xl w-full">
        {/* Social Links - Hidden on mobile, shown on desktop in vertical layout */}
        <div className="hidden lg:block order-1 lg:order-none">
          <SocialLinks orientation="vertical" size="2x" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center text-center order-2 lg:order-none">
          <HeroIntro
            location="Tangerang, Banten, Indonesia"
            name="Rizky Faisal Rafi"
            roles={[
              "Software Engineer",
              "Flutter Developer",
              "Mobile Developer",
              // 'Full Stack Developer',
            ]}
            greeting="Hello"
            highlightColor="#3498db"
          />

          {/* Buttons - Responsive layout */}
          <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-6 lg:mt-8 gap-4 w-full max-w-md">
            <PrimaryButton
              href="#contact"
              className="w-full sm:w-auto min-w-[140px]"
            >
              Got Project?
            </PrimaryButton>
            <SecondaryButton
              href="https://drive.google.com/file/d/1Viw-9ev64CIISVf0tMWZJwRf0SCtzkXK/view?usp=sharing"
              className="w-full sm:w-auto min-w-[140px]"
            >
              My Resume
            </SecondaryButton>
          </div>

          {/* Social Links - Shown on mobile in horizontal layout */}
          <div className="lg:hidden mt-4 sm:mt-6 order-3 lg:order-none">
            <SocialLinks orientation="horizontal" size="2x" />
          </div>
        </div>
      </div>

      {/* Skills Marquee - Responsive spacing */}
      <div className="mt-8 sm:mt-12 lg:mt-16">
        <SkillsMarquee skills={skillList} />
      </div>
    </div>
  );
};

export default HeroUIHero;
