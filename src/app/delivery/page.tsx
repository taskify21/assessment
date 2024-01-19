"use client";

import React, { useEffect, useState } from "react";
import AppWrapper from "../components/appWrapper";
import useOrderHook from "../utils/useHooks/userOrders";
import { OrderTabListing } from "./utils";
import { useSession } from "next-auth/react";

const Page = () => {
  // for orders
  const { data } = useSession();
  const { ordersList, getAllOrderList, setOrdersList } = useOrderHook();
  const [orders, setOrders] = useState<any>({
    pending: [],
    received: [],
    ready: [],
    pickup: [],
    delivered: [],
  });

  // fetching orders
  useEffect(() => {
    getAllOrderList(
      {},
      (res: any) => {
        setOrdersList(res?.data?.data);
      },
      (err: any) => {
        console.log({ err });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // modifying format of the orders
  useEffect(() => {
    if (ordersList.length) {
      const readyOrders = ordersList.filter(
        (order) => order.status === "Ready"
      );
      const pickupOrders = ordersList.filter(
        (order) =>
          order.status === "Pickup" && data?.user._id == order?.deliveryId._id
      );
      const deliveredOrders = ordersList.filter(
        (order) =>
          order.status === "Deliverd" && data?.user._id == order?.deliveryId._id
      );

      // Update state
      setOrders({
        ready: readyOrders as any,
        pickup: pickupOrders as any,
        delivered: deliveredOrders as any,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersList]);

  return (
    <AppWrapper>
      <div className="p-4 rounded-[10px] w-full h-fit justify-center min-[70vh] flex">
        <OrderTabListing orders={orders} />
      </div>
    </AppWrapper>
  );
};

export default Page;
