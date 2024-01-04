"use client";
import React, { useState } from "react";
import AppWrapper from "../components/appWrapper";
import ListedCart from "../components/listedCart";
import useCartHook from "../utils/useHooks/useCartHook";
import { useSession } from "next-auth/react";
import useOrderHook from "../utils/useHooks/userOrders";
import toast from "react-hot-toast";
import { IOrder } from "../utils/type";

const Page = () => {
  const { data } = useSession();
  const { cartListData, totalAmount, emptyCartHandler } = useCartHook();
  const [loading, setLoading] = useState(false);
  const { getAllOrderList, setOrdersList, addOrderHandler } = useOrderHook();

  const orderHandler = () => {
    if (loading) return;
    const userId = data?.user?._id;

    setLoading(true);

    addOrderHandler(
      {
        orderData: cartListData,
        totalAmount,
        userId,
      },
      (res: any) => {
        emptyCartHandler();
        toast.success(res?.data?.message);
        setLoading(false);

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
      },
      (err: any) => {
        console.log({ err });
      }
    );
  };
  return (
    <AppWrapper>
      <div className=" bg-lightGrey/50 mx-4 my-4 sm:mx-8 pb-8 rounded">
        <div className="text-black overflow-hidden flex flex-col relative w-full py-6">
          <h1 className="text-center text-3xl font-semibold w-full mt-3 mb-2">
            Your Cart
          </h1>
          <div className="my-4 flex items-center justify-center gap-4 flex-col md:mx-12">
            {!cartListData.length ? (
              <p>Please add some items to cart</p>
            ) : (
              cartListData?.map((cart, i) => {
                return <ListedCart data={cart} index={i} key={i} />;
              })
            )}
          </div>
          <div className="w-[80%] m-auto">
            <hr />
            <div className="flex items-center justify-between">
              <p className="mt-4 font-bold">Total</p>
              <b className="mt-4 font-bold">{totalAmount}$</b>
            </div>
            {cartListData.length > 0 && (
              <div className="text-center">
                <button
                  className="bg-main px-6 py-2 rounded-md text-white"
                  onClick={orderHandler}
                >
                  {loading ? "Placing your order..." : "Order Now"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default Page;
