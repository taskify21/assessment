"use client";
import React, { useEffect, useState } from "react";
import AppWrapper from "../components/appWrapper";
import Filters from "../components/filter";
import Cart from "../components/cart";
import { BiMenuAltLeft } from "react-icons/bi";
import Pagination from "../components/pagination";
import useMenuHook from "../utils/useHooks/useMenuHook";
import toast from "react-hot-toast";

const Page = () => {
  const { getAllMenuList, setMenuList } = useMenuHook();
  const [showFilters, setShowFilters] = useState(false);

  const [mainMenuList, setMainMenuList] = useState({
    data: [],
  });
  const [menuList, setMenusList] = useState({
    data: [],
  });

  useEffect(() => {
    getAllMenuList(
      {},
      (res: any) => {
        setMainMenuList(res.data);
        setMenuList(res.data);
        setMenusList(res.data);
      },
      (err: any) => {
        toast.error("Error 404 - Product fetching");
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMainMenuListItems = (result: any) =>
    setMainMenuList({ data: result });

  return (
    <AppWrapper>
      <div className=" bg-lightGrey/50 mx-4 my-4 sm:mx-8 pb-8 rounded">
        <div className="text-white overflow-hidden flex relative">
          {/* filter for desktop  */}
          <div className="hidden md:flex h-[22rem]">
            <Filters />
          </div>

          {/* filter for mobile  */}
          <div
            className="absolute top-0 left-0 cursor-pointer md:hidden text-5xl"
            onClick={() => setShowFilters(true)}
          >
            <BiMenuAltLeft />
          </div>
          {showFilters && (
            <div className="fixed top-[15vh] left-[3.5%] md:hidden text-5xl">
              <Filters mobile={true} close={() => setShowFilters(false)} />
            </div>
          )}

          {/* cart menu items */}
          <div className="w-full px-4 py-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {mainMenuList?.data.length &&
              mainMenuList?.data.map((menu, i) => (
                <div className="flex items-center justify-center" key={i}>
                  <Cart data={menu} />
                </div>
              ))}
          </div>
        </div>
        <Pagination
          mainMenuList={mainMenuList}
          menuList={menuList}
          setMainMenuListItems={setMainMenuListItems}
        />
      </div>
    </AppWrapper>
  );
};

export default Page;
