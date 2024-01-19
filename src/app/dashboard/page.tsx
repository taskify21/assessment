"use client";
import React, { useEffect, useState } from "react";
import AppWrapper from "../components/appWrapper";
import AdminMenu from "../components/dashboard/AdminMenu";
import TableList from "../components/dashboard/TableList";
import useUser from "../utils/useHooks/userHook";
import useMenuHook from "../utils/useHooks/useMenuHook";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import AddMenuModalView from "../components/modal/allReuseableModal/AddMenu";
import { useModal } from "../components/modal/useModal";
import toast from "react-hot-toast";
import useOrderHook from "../utils/useHooks/userOrders";
import { IOrder } from "../utils/type";

const Page = () => {
  const { getAllMenuList, deleteMenuHandler } = useMenuHook();
  const { openModal } = useModal();
  const { data: session } = useSession();

  const [screen, setScreen] = useState(0);
  const { getAllUserList } = useUser();
  const [pageState, setPageState] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allMenu, setAllMenu] = useState([]);
  const updateState = () => setPageState(!pageState);
  const updatedScreen = (no: number) => setScreen(no);

  // for orders
  const { ordersList, getAllOrderList, setOrdersList } = useOrderHook();
  const [orders, setOrders] = useState<any>({
    pending: [],
    received: [],
    ready: [],
    pickup: [],
    delivered: [],
  });

  if (!session) {
    redirect("/login");
  } else {
    if (session.user.role == "user") redirect("/");
    if (session.user.role == "delivery") redirect("/delivery");
  }

  useEffect(() => {
    getAllUserList(
      {},
      (res: any) => {
        console.log({ res });

        setAllUsers(res.data.data);
      },
      (err: any) => {
        console.log({ err });
      }
    );
    getAllMenuList(
      {},
      (res: any) => {
        setAllMenu(res.data.data);
      },
      (err: any) => {
        console.log({ err });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState]);

  const deleteMenu = (row: any) => {
    deleteMenuHandler(
      { _id: row._id },
      (res: any) => {
        toast.success(res?.data?.message);
        updateState();
      },
      (err: any) => {
        console.log({ err });
      }
    );
  };
  const editMenu = (row: any) => {
    openModal({
      view: <AddMenuModalView row={row} updateTableState={updateState} />,
      customSize: "720px",
    });
  };

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

  return (
    <AppWrapper>
      <div className="min-h-[80vh] bg-white shadow-lg my-4 w-[96%] xl:w-[70%] m-auto rounded flex">
        <AdminMenu
          updatedScreen={updatedScreen}
          screen={screen}
          updateState={updateState}
        />
        <TableList
          deleteMenu={deleteMenu}
          editMenu={editMenu}
          users={allUsers}
          menus={allMenu}
          screen={screen}
          orders={orders}
        />
      </div>
    </AppWrapper>
  );
};

export default Page;
