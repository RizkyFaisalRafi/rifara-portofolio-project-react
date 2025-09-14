import React from "react";

interface SectionTitleProps {
  subtitle: string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title }) => (
  <div className="mb-4">
    <h2 className="text-[#3498db] md:text-2xl text-xl font-normal mb-0 max-w-full text-center">{subtitle}</h2>
    <h1 className="md:text-3xl text-2xl font-bold m-0 max-w-full text-center text-[#fff]">{title}</h1>
    <div className="w-[120px] h-1 bg-[#3498db] my-4 mx-auto rounded"></div>
  </div>
);

export default SectionTitle;
