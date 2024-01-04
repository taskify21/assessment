"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useAppCustomContext } from "@/app/utils/context";
import useOrderHook from "@/app/utils/useHooks/userOrders";
const Header = () => {
  const [open, setOpen] = useState(false);
  const { data, status } = useSession();
  const { state } = useAppCustomContext();
  const { ordersList } = useOrderHook();
  const signOutHandler = () => {
    signOut({ callbackUrl: "/login", redirect: true });
  };

  return (
    <div className="bg-main w-full">
      <div className="flex items-center justify-between py-6 px-8">
        <h2 className="font-bold text-2xl md:text-3xl">
          <Link href={"/"}>Food App</Link>
        </h2>
        <ul className="items-center gap-10 hidden md:flex">
          {data?.user?.role == "user" && (
            <>
              <li className="font-semibold">
                <Link href="/menu">Menu</Link>
              </li>
              <li className="font-semibold">
                <Link href="/cart" className=" relative">
                  Cart
                  {state.cart.length > 0 && (
                    <b className="absolute -top-[75%] left-[100%] border-green text-center w-[1.6rem] h-[1.6rem] rounded-full border">
                      {state.cart.length}
                    </b>
                  )}
                </Link>
              </li>
            </>
          )}
          {data?.user?.role == "user" && ordersList.length > 0 && (
            <>
              <li className="font-semibold">
                <Link href="/order" className=" relative">
                  Orders
                  {ordersList.length > 0 && (
                    <b className="absolute -top-[75%] left-[100%] border-green text-center w-[1.6rem] h-[1.6rem] rounded-full border">
                      {ordersList.length}
                    </b>
                  )}
                </Link>
              </li>
            </>
          )}
          {status == "authenticated" ? (
            <div className="flex gap-4 items-center ">
              <b className="flex items-center gap-2 text-xl">
                <FaUser />
                {data.user.name}
              </b>
              <li className="font-semibold text-white text-2xl px-3 py-1 rounded  ">
                <button onClick={signOutHandler} className="mt-2">
                  <AiOutlineLogout />
                </button>
              </li>
            </div>
          ) : (
            <li className="font-semibold bg-gray px-3 py-1 rounded  ">
              <Link href={"/login"}>Login</Link>
            </li>
          )}
        </ul>
        <li
          className=" md:hidden list-none text-2xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <RxHamburgerMenu />
        </li>
        {open && (
          <MenuMobile logout={signOutHandler} close={() => setOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Header;

const MenuMobile = ({
  close,
  logout,
}: {
  close: () => void;
  logout: () => void;
}) => {
  const { data, status } = useSession();
  const { state } = useAppCustomContext();

  return (
    <div className="bg-main p-4 absolute w-full h-screen z-10 top-0 left-0 flex items-center justify-center flex-col">
      <div className="absolute top-4 left-4 cursor-pointer" onClick={close}>
        <IoMdClose />
      </div>
      <h2 className="font-bold text-3xl text-center -mt-20">
        <Link href={"/"}>Food App</Link>
      </h2>

      <ul className="items-center gap-2 flex flex-col mt-10 justify-center text-center">
        {data?.user.role == "user" && (
          <>
            <li className="font-semibold">
              <Link href="/menu">Menu</Link>
            </li>
            <li className="font-semibold mt-3">
              <Link href="/cart" className="relative">
                Cart
                {state.cart.length > 0 && (
                  <b className="absolute -top-[60%] left-[120%] border-green text-center w-[1.6rem] h-[1.6rem] rounded-full border">
                    {state.cart.length}
                  </b>
                )}
              </Link>
            </li>
          </>
        )}
        {status == "authenticated" ? (
          <div className="flex gap-2 flex-col mt-4 items-center ">
            <b className="flex items-center gap-2 text-xl">
              <FaUser />
              {data.user.name}
            </b>
            <li className="font-semibold text-white text-2xl px-3 py-1 rounded  ">
              <button onClick={logout}>
                <AiOutlineLogout />
              </button>
            </li>
          </div>
        ) : (
          <li className="font-semibold bg-gray px-3 py-1 rounded  ">
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
