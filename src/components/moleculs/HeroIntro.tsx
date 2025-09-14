import React from "react";
import Typewriter from "typewriter-effect";
import LocationBadge from "../widget/LocationBadge";

interface HeroIntroProps {
  location: string;
  name: string;
  roles: string[];
  greeting?: string;
  highlightColor?: string;
}

const HeroIntro: React.FC<HeroIntroProps> = ({
  location,
  name,
  roles,
  greeting = "Hello",
  highlightColor = "#3498db",
}) => {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <LocationBadge location={location} />
      <h1 className="font-sans text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4">
        {greeting}
        <span>.</span>
      </h1>
      <h1 className="font-sans text-white text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 sm:mb-4">
        <span style={{ color: highlightColor }}>I'am</span> {name}
      </h1>
      <h1 className="font-sans text-white text-3xl sm:text-4xl md:text-5xl font-bold min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem]">
        <Typewriter
          options={{
            strings: roles,
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
    </div>
  );
};

export default HeroIntro;
