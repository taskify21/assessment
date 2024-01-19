import React from "react";
import { IOrder } from "@/app/utils/type";
import {
  StatusBadge,
  Badge,
  formatDate,
  AdminOptions,
  DeliveryOptions,
  UserOptions,
} from "./utils";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";

export const TabContent = ({ orderData }: { orderData: IOrder[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {orderData?.map((cart: IOrder, i: number) => {
        return (
          <div key={i}>
            <ListedOrder data={cart} index={i} />
          </div>
        );
      })}
    </div>
  );
};

const ListedOrder = ({ data, index }: { data: IOrder; index: number }) => {
  const { data: session } = useSession();

  const { deliveryId, status, orderData, userId, _id, updatedAt, totalAmount } =
    data;

  return (
    <div className=" flex flex-col bg-white rounded-[10px] p-4 md:w-full ">
      <div className="flex justify-between w-full items-center flex-wrap">
        <Badge name={` Order #${_id}`} classNames="bg-main text-white" />
        <Badge
          name={`${formatDate(updatedAt)}`}
          classNames="bg-gray text-white"
        />
      </div>

      <div className="flex flex-col mt-4 w-[80%] m-auto">
        <div className="flex flex-col gap-4">
          {orderData.length &&
            orderData.map((order, i) => (
              <div key={i} className="flex gap-4 items-center">
                <p>
                  {i + 1}
                  {")"} {order.name} {order.quantity}X
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src={order.coverImage}
                  className="w-[50px] rounded-[10px]"
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>

      {session?.user.role == "admin" && (
        <div className="w-full flex items-center justify-center mt-2">
          <AdminOptions data={data} />
        </div>
      )}

      {session?.user.role == "delivery" && (
        <div className="w-full flex items-center justify-center mt-2">
          <DeliveryOptions data={data} />
        </div>
      )}

      {session?.user.role == "user" && (
        <div className="w-full flex items-center justify-center mt-2">
          <UserOptions data={data} />
        </div>
      )}

      <div className="w-full flex items-center justify-center mt-4">
        <StatusBadge status={status} />
      </div>
      <div className="flex items-start justify-between">
        {session?.user.role !== "user" && (
          <div className="mt-4 flex flex-col gap-0 w-fit  bg-blue rounded">
            <div className="flex gap-x-10 rounded w-fit px-4 py-1  text-white items-center flex-wrap">
              Order by
              <b className="flex items-center gap-2">
                <FaUser />
                {data.userId.name}
              </b>
            </div>
            <div className="flex gap-x-10 rounded w-fit px-4 py-1 text-white items-center flex-wrap">
              Phone
              <b className="flex items-center gap-2">{data.userId.phone}</b>
            </div>
            <div className="flex gap-x-10 rounded w-fit px-4 py-1 text-white items-center flex-wrap">
              Address
              <b className="flex items-center gap-2">{data.userId.address}</b>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-0 w-fit h-full  bg-blue rounded">
          <div className="flex gap-x-10 rounded w-fit px-4 py-1  text-white items-center flex-wrap">
            Delivery Person
            <b className="flex items-center gap-2">
              <FaUser />
              {data?.deliveryId?.name}
            </b>
          </div>
          <div className="flex gap-x-10 rounded w-fit px-4 py-1 text-white items-center flex-wrap">
            Phone
            <b className="flex items-center gap-2">{data?.deliveryId?.phone}</b>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 w-[80%] m-auto">
        <h3 className="text-xl font-bold">Pay (while receiving food)</h3>
        <b> ${totalAmount}</b>
      </div>
      {status === "Deliverd" && (
        <Badge
          name={`Order has been completed!`}
          classNames="bg-main text-white mt-4 text-center py-2 font-bold"
        />
      )}
    </div>
  );
};

export default ListedOrder;
function usesState(): [any, any] {
  throw new Error("Function not implemented.");
}
