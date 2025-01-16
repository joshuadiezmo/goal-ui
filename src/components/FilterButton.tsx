import React from "react";
import FilterIcon from "./FilterIcon";
import Polygon from "./Polygon";

interface FilterButtonProps {
  showFilter: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ showFilter, onClick }) => {
  return (
    <button
      className={`
        p-2 transition-all rounded-lg border border-blue-500 flex flex-row items-center gap-2 hover:bg-blue-100
        ${!showFilter ? "hover:bg-blue-100" : "hover:bg-blue-700"}
        ${!showFilter ? "bg-white" : "bg-blue-500"}
        `}
      onClick={onClick}
    >
      <div className="border-r-2 px-2 border-gray-500">
        <FilterIcon
          className={`
            transition-all ${showFilter ? "fill-white" : "fill-blue-500"}
            `}
        />
      </div>
      <Polygon
        className={`
            transition-all ${showFilter ? "fill-white" : "fill-blue-500"}
            `}
      />
    </button>
  );
};

export default FilterButton;
