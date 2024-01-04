import React, { useState, useEffect } from "react";

const Pagination = ({
  mainMenuList,
  setMainMenuListItems,
  menuList,
}: {
  mainMenuList?: any;
  setMainMenuListItems?: any;
  menuList: any;
}) => {
  const showMenus = 3;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const total = Math.ceil(menuList.data.length / showMenus);
    setTotalPages(total);
  }, [showMenus, menuList.data]);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        <button
          key={i}
          className={`mx-1 px-3 py-2 rounded font-semibold text-2xl ${
            currentPage === i ? " text-green" : " text-black"
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div>
        {paginationItems}
        <button
          className="text-gray text-xl font-semibold"
          onClick={() => {
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
          }}
        >
          Next
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (mainMenuList && setMainMenuListItems) {
      const startIndex = (currentPage - 1) * showMenus;

      const endIndex = startIndex + showMenus;
      const paginatedList = menuList.data.slice(startIndex, endIndex);

      setMainMenuListItems(paginatedList);
    }
  }, [currentPage, showMenus, mainMenuList.length]);

  return (
    <div className="flex justify-center mt-4">{renderPaginationItems()}</div>
  );
};

export default Pagination;
