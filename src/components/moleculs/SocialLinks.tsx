import React from "react";
import { Link } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

interface SocialLinksProps {
  githubUrl?: string;
  linkedinUrl?: string;
  orientation?: "vertical" | "horizontal";
  size?: "1x" | "2x" | "3x";
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  githubUrl = "https://github.com/RizkyFaisalRafi",
  linkedinUrl = "https://www.linkedin.com/in/rizky-faisal-rafi-8691a7225",
  orientation = "vertical",
  size = "2x",
}) => {
  const containerClass =
    orientation === "horizontal"
      ? "flex flex-row items-center gap-4 justify-center"
      : "flex flex-col items-center gap-4 my-auto";

  return (
    <div className={containerClass}>
      <Link
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#ccc] hover:text-[#010409] transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faGithub} size={size} />
      </Link>
      <Link
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#ccc] hover:text-[#3498db] transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faLinkedin} size={size} />
      </Link>
    </div>
  );
};

export default SocialLinks;
