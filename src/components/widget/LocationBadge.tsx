import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface LocationBadgeProps {
  location: string;
}

const LocationBadge: React.FC<LocationBadgeProps> = ({ location }) => (
  <div className="py-2 px-3 sm:px-4 rounded-full border-2 border-[#999] flex flex-row items-center justify-center mb-4 max-w-max">
    <FontAwesomeIcon icon={faLocationDot} className="text-[#3498db] mr-2 text-xs sm:text-sm" />
    <h1 className="font-sans text-white text-xs sm:text-sm whitespace-nowrap">{location}</h1>
  </div>
);

export default LocationBadge;
