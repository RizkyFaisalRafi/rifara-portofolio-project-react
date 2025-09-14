import React from "react";
import { Button, Link } from "@heroui/react";

interface SecondaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ href, children, className = "" }) => (
  <Button
    color="primary"
    variant="solid"
    className={`bg-[#333] hover:bg-[#555] border-[#fff] border-2 transition-colors duration-500 rounded-[4px] ${className}`}
  >
    <Link color="foreground" href={href} className="text-[20px] p-4">
      {children}
    </Link>
  </Button>
);

export default SecondaryButton;
