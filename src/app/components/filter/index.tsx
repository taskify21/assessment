import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Filters = ({
  mobile,
  close,
}: {
  mobile?: boolean;
  close?: () => void;
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterSelection = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div
      className={`min-w-[15rem] w-[15rem] ${
        mobile ? "bg-lightGrey/90 relative" : "bg-lightGrey/75"
      } text-black py-3 flex flex-col`}
    >
      {mobile && (
        <div
          className="text-xl absolute top-2 right-2 cursor-pointer"
          onClick={close}
        >
          <IoMdClose />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl text-center">Filters</h2>
      <ul className="mt-4 mb-4 flex flex-col gap-2">
        <li
          className={`text-xl flex px-4 items-center font-medium py-2 justify-between bg-white cursor-pointer`}
          onClick={() => handleFilterSelection("top5")}
        >
          Top 5 items{" "}
          <input
            onChange={() => {}}
            type="checkbox"
            className="h-4 w-4"
            checked={selectedFilter === "top5"}
          />
        </li>
        <li
          className={`text-xl flex px-4 items-center font-medium py-2 justify-between bg-white cursor-pointer`}
          onClick={() => handleFilterSelection("lessThan50$")}
        >
          Less than 50${" "}
          <input
            onChange={() => {}}
            type="checkbox"
            className="h-4 w-4"
            checked={selectedFilter === "lessThan50$"}
          />
        </li>
        <li
          className={`text-xl flex px-4 items-center font-medium py-2 justify-between bg-white cursor-pointer`}
          onClick={() => handleFilterSelection("moreThan50$")}
        >
          More than 50${" "}
          <input
            onChange={() => {}}
            type="checkbox"
            className="h-4 w-4"
            checked={selectedFilter === "moreThan50$"}
          />
        </li>
        <li
          className={`text-xl flex px-4 items-center font-medium py-2 justify-between bg-white cursor-pointer`}
          onClick={() => handleFilterSelection("fastfood")}
        >
          Fast food
          <input
            onChange={() => {}}
            type="checkbox"
            className="h-4 w-4"
            checked={selectedFilter === "fastfood"}
          />
        </li>
      </ul>
      <div className="flex items-center mt-auto">
        <button
          className="w-[80%] text-xl m-auto bg-gray py-1 text-center text-white rounded-lg"
          onClick={() => setSelectedFilter(null)}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
