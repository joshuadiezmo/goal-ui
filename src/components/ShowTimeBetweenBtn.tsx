import React from "react";
import Check from "./Check";

interface ShowTimeBetweenBtnProps {
  showTimeBetween: boolean;
  onClick: () => void;
}

const ShowTimeBetweenBtn: React.FC<ShowTimeBetweenBtnProps> = ({
  showTimeBetween,
  onClick,
}) => {
  return (
    <button
      className={`
        p-2 transition-all rounded-lg border border-blue-500 flex flex-row items-center gap-2
        ${!showTimeBetween ? "hover:bg-blue-100" : "hover:bg-blue-700"}
        ${
          !showTimeBetween ? "bg-white text-blue-500" : "bg-blue-500 text-white"
        }`}
      onClick={onClick}
    >
      <Check
        className={`
  transition-all ${showTimeBetween ? "fill-white" : "fill-blue-500"}
  `}
      />
      <span className="transition-all">Show time between events</span>
    </button>
  );
};

export default ShowTimeBetweenBtn;
