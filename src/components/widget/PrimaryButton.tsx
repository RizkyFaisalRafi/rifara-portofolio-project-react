import React from "react";
import { Button, Link } from "@heroui/react";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ href, children, size = "lg", className = "" }) => {
  const sizeClasses = {
    sm: "text-[14px] px-3 py-2",
    md: "text-[16px] px-4 py-3",
    lg: "text-[20px] p-4"
  };

  return (
    <Button
      color="primary"
      variant="solid"
      className={`bg-[#3498db] hover:bg-[#2176bd] transition-colors duration-500 rounded-[4px] ${className}`}
    >
      <Link color="foreground" href={href} className={sizeClasses[size]}>
        {children}
      </Link>
    </Button>
  );
};

export default PrimaryButton;
