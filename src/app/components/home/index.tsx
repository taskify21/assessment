"use client";
import React, { useEffect, useState } from "react";
import Cart from "../cart";
import Question from "../question";
import useMenuHook from "@/app/utils/useHooks/useMenuHook";
import useOrderHook from "@/app/utils/useHooks/userOrders";
import { useSession } from "next-auth/react";
import { IOrder } from "@/app/utils/type";
import useUser from "@/app/utils/useHooks/userHook";

const HomePage = () => {
  const { getAllMenuList, setMenuList, menuList } = useMenuHook();
  const { getAllOrderList, setOrdersList } = useOrderHook();
  const { data } = useSession();
  const { getAllUserList } = useUser();
  const [windowWidth, setWindowWidth] = useState(0);

  const [showFilters, setShowFilters] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getAllMenuList(
      {},
      (res: any) => {
        console.log({ res });
        setMenuList(res.data);
      },
      (err: any) => {
        console.log({ err });
      }
    );

    getAllOrderList(
      {},
      (res: any) => {
        const id = data?.user._id;
        const userOrders = res?.data?.data.filter(
          (order: IOrder) => order.userId._id == id
        );
        setOrdersList(userOrders);
      },
      (err: any) => {
        console.log({ err });
      }
    );
    getAllUserList(
      {},
      (res: any) => {},
      (err: any) => {
        console.log({ err });
      }
    );
  }, []);
  return (
    <div>
      <div
        className={`min-h-[90vh] flex  items-center ${
          windowWidth > 820 ? "justify-start" : "justify-center"
        }`}
        style={{
          backgroundImage: "url(/image-main.jpg)",
          backgroundSize: windowWidth > 820 ? "cover" : "",
          backgroundPosition: windowWidth > 820 ? "center" : "",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" px-2 sm:px-8 w-[45rem]">
          <h1 className="text-5xl font-bold drop-shadow-2xl">
            Its the food and groceries you love, delivered
          </h1>
          <p className="mt-4 sm:mt-8 ml-2 w-[90%] text-xl text-shado drop-shadow-2xl">
            Would you like millions of new customers to enjoy your amazing food
            and groceries?
          </p>
          <button className="ml-2 mt-4 sm:mt-8 bg-gray py-2 px-8 rounded font-bold">
            <a href="#menu">Get Started</a>
          </button>
        </div>
      </div>
      {/* cart-menu */}
      <div className="mt-12" id="menu">
        <div className=" bg-lightGrey/50 mx-4 sm:mx-8 py-8 rounded text-white">
          <h1 className="text-2xl font-bold text-center">Check Out Our Menu</h1>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {menuList.data.length &&
              menuList.data.slice(0, 3)?.map((menu, i) => {
                return (
                  <div className="flex items-center justify-center" key={i}>
                    <Cart data={menu} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* question sections */}
      <div className="mt-12 mb-12" id="questions">
        <div className=" bg-lightGrey/50 mx-4 sm:mx-8 pb-8 pt-2 px-4 sm:px-10 rounded text-white">
          <Question />
          <Question />
          <Question />
          <Question />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
