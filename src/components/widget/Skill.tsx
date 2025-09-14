import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { SkillProps } from "../../models/SkillProps";

const Skill: React.FC<SkillProps> = ({ name, logo, icon }) => (
  <div className="flex items-center mr-8">
    {icon ? (
      <span
        className="text-4xl mr-3"
        style={{ color: "#666666", filter: "grayscale(1)" }}
      >
        {icon}
      </span>
    ) : logo ? (
      <img
        src={logo}
        alt={name + " logo"}
        className="w-8 h-8 mr-3"
        style={{ filter: "grayscale(1)", opacity: 0.8 }}
      />
    ) : null}
    <h1 className="text-white text-4xl font-semibold">{name}</h1>
  </div>
);

export default Skill;
export const SkillJS = () => (
  <Skill name="JavaScript" icon={<FontAwesomeIcon icon={faJs} />} />
);

export const SkillKotlin = () => (
  <Skill name="Kotlin" logo="./kotlin-original.svg" />
)
