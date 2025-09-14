import React from "react";
import Marquee from "react-fast-marquee";
import Skill from "./Skill";
import { SkillProps } from "../../models/SkillProps";

interface SkillsMarqueeProps {
  skills: SkillProps[];
  speed?: number;
  direction?: "left" | "right";
  fadeColor?: string;
  fadeWidth?: string;
  lineColor?: string;
  className?: string;
}

const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({
  skills,
  speed = 50,
  direction = "right",
  fadeColor = "#222",
  fadeWidth = "400px",
  lineColor = "#666",
  className = ""
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex flex-col mt-34 gap-5">
          <div className="w-full h-1" style={{ backgroundColor: lineColor }}></div>
          <Marquee className="h-12 z-0" speed={speed} direction={direction}>
            {skills.map((skill, index) => (
              <Skill key={index} name={skill.name} logo={skill.logo} icon={skill.icon} />
            ))}
          </Marquee>            
          <div className="w-full h-1" style={{ backgroundColor: lineColor }}></div>
        </div>
      </div>
      {/* Fade left */}
      <div 
        className="pointer-events-none absolute left-0 top-0 h-full z-10 bg-gradient-to-r to-transparent"
        style={{ 
          width: fadeWidth,
          background: `linear-gradient(to right, ${fadeColor}, transparent)`
        }}
      ></div>
      {/* Fade right */}
      <div 
        className="pointer-events-none absolute right-0 top-0 h-full z-10 bg-gradient-to-l to-transparent"
        style={{ 
          width: fadeWidth,
          background: `linear-gradient(to left, ${fadeColor}, transparent)`
        }}
      ></div>
    </div>
  );
};

export default SkillsMarquee;
