import React from "react";

interface SkillBoxProps {
  name: string;
  logo?: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SkillBox: React.FC<SkillBoxProps> = ({
  name,
  logo,
  icon,
  backgroundColor = "#181818",
  textColor = "#fff",
  borderColor = "#333",
  size = "md",
  className = ""
}) => {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div 
      className={`flex items-center gap-2 rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-lg ${sizeClasses[size]} ${className}`}
      style={{ 
        backgroundColor, 
        color: textColor, 
        borderColor 
      }}
    >
      {logo && (
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className={`${iconSizes[size]} object-contain flex-shrink-0`}
        />
      )}
      {icon && !logo && (
        <div className={`${iconSizes[size]} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      )}
      <span className="font-medium text-ellipsis overflow-hidden min-w-0 flex-1">{name}</span>
    </div>
  );
};

export default SkillBox;
