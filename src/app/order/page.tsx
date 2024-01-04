"use client";
import React, { useEffect, useState } from "react";
import AppWrapper from "../components/appWrapper";
import { useSession } from "next-auth/react";
import useOrderHook from "../utils/useHooks/userOrders";
import { TabContent } from "../components/listedOrders";
import { IOrder } from "../utils/type";
import { redirect } from "next/navigation";
import { Tabs } from "@/app/components/Tabs/Tab";
const Page = () => {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const { ordersList, getAllOrderList, setOrdersList } = useOrderHook();
  const [orders, setOrders] = useState({
    pending: [],
    received: [],
    ready: [],
    pickup: [],
    delivered: [],
  });

  if (data) {
    if (data.user.role !== "user") {
      redirect("/");
    }
  } else {
    redirect("/");
  }

  useEffect(() => {
    setLoading(true);

    getAllOrderList(
      {},
      (res: any) => {
        setLoading(false);
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
  }, []);

  useEffect(() => {
    if (ordersList.length) {
      const pendingOrders = ordersList.filter(
        (order) => order.status === "Pending"
      );
      const receivedOrders = ordersList.filter(
        (order) => order.status === "Received"
      );
      const readyOrders = ordersList.filter(
        (order) => order.status === "Ready"
      );
      const pickupOrders = ordersList.filter(
        (order) => order.status === "Pickup"
      );
      const deliveredOrders = ordersList.filter(
        (order) => order.status === "Deliverd"
      );

      // Update state
      setOrders({
        pending: pendingOrders as any,
        received: receivedOrders as any,
        ready: readyOrders as any,
        pickup: pickupOrders as any,
        delivered: deliveredOrders as any,
      });
    }
  }, [ordersList]);

  const tabsData = [
    {
      length: orders.pending.length,
      label: "Pending",
      content: (
        <div>
          {orders.pending.length > 0 ? (
            <TabContent orderData={orders.pending as IOrder[]} />
          ) : (
            <p className="text-center w-full">No pending orders currently.</p>
          )}
        </div>
      ),
    },
    {
      length: orders.received.length,
      label: "Received",
      content: (
        <div>
          {orders.received.length > 0 ? (
            <TabContent orderData={orders.received as IOrder[]} />
          ) : (
            <p className="text-center w-full">
              No orders received by the restaurant yet.
            </p>
          )}
        </div>
      ),
    },
    {
      length: orders.ready.length,
      label: "Ready",
      content: (
        <div>
          {orders.ready.length > 0 ? (
            <TabContent orderData={orders.ready as IOrder[]} />
          ) : (
            <p className="text-center w-full">
              Your food is not prepared yet by the restaurant.
            </p>
          )}
        </div>
      ),
    },
    {
      label: "Pickup",
      length: orders.pickup.length,
      content: (
        <div>
          {orders.pickup.length > 0 ? (
            <TabContent orderData={orders.pickup as IOrder[]} />
          ) : (
            <p className="text-center w-full">
              No orders available for pickup.
            </p>
          )}
        </div>
      ),
    },
    {
      label: "Delivered",
      length: orders.delivered.length,
      content: (
        <div>
          {orders.delivered.length > 0 ? (
            <TabContent orderData={orders.delivered as IOrder[]} />
          ) : (
            <p className="text-center w-full">No delivered orders yet.</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <AppWrapper>
      <div className=" bg-lightGrey/50 mx-4 my-4 sm:mx-8 pb-8 rounded">
        <div className="text-black overflow-hidden flex flex-col relative w-full py-6">
          <h1 className="text-center text-3xl font-semibold w-full mt-3 mb-10">
            Your Orders
          </h1>
          <div className="w-[80%] m-auto">
            <Tabs tabs={tabsData} />
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default Page;
