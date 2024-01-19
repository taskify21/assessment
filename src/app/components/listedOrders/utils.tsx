import React, { useEffect, useState } from "react";
import { IOrder } from "@/app/utils/type";
import { useSession } from "next-auth/react";
import { FaCheckDouble } from "react-icons/fa";
import useOrderHook from "@/app/utils/useHooks/userOrders";
import toast from "react-hot-toast";

export const Badge = ({
  name,
  classNames,
}: {
  name: string;
  classNames: string;
}) => {
  return (
    <div className={` shadow-lg rounded-[5px] border py-1 px-3 ${classNames}`}>
      <p> {name}</p>
    </div>
  );
};

export const StatusBadge = ({ status }: { status: any }) => {
  if (status === "Pending") {
    return (
      <Badge
        classNames="bg-red text-black"
        name="Waiting for the restaurant to check your food request."
      />
    );
  }
  if (status === "Received") {
    return (
      <Badge
        classNames="bg-green text-black"
        name="The restaurant has received your request. Preparing your food."
      />
    );
  }
  if (status === "Ready") {
    return (
      <Badge
        classNames="bg-green text-black"
        name="Your food is ready, waiting for the delivery person."
      />
    );
  }
  if (status === "Pickup") {
    return (
      <Badge
        classNames="bg-green text-black"
        name="Your rider has picked up your food."
      />
    );
  }
  if (status === "Delivered") {
    return (
      <Badge
        classNames="bg-green text-black"
        name="Your food has been delivered."
      />
    );
  }
};

export function formatDate(timestamp: any) {
  // Create a new Date object using the timestamp
  const date = new Date(+timestamp);

  // Get day, month, and year
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

  // Combine into the desired format
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export const AdminOptions = ({ data }: { data: IOrder }) => {
  const { status } = data;
  const { updateOrderHandler, getAllOrderList, setOrdersList } = useOrderHook();
  const [loading, setLoading] = useState(false);

  const acceptFoodRequest = () => {
    if (loading) return;
    setLoading(true);
    updateOrderHandler(
      {
        status: "Received",
        _id: data._id,
      },
      (res: any) => {
        toast.success(res.data.success);
        setLoading(false);
      },
      (err: any) => {
        console.log({ err });
        setLoading(false);
      }
    );
  };

  const markAsComplete = () => {
    if (loading) return;
    setLoading(true);
    updateOrderHandler(
      {
        status: "Ready",
        _id: data._id,
      },
      (res: any) => {
        setLoading(false);
        toast.success(res.data.success);
      },
      (err: any) => {
        console.log({ err });
        setLoading(false);
      }
    );
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
  }, [loading]);

  if (status == "Pending") {
    return (
      <div className="flex gap-3 font-bold mt-4 mb-2">
        Accept food request
        <button
          onClick={acceptFoodRequest}
          className="text-green py-0 px-4 text-xl"
        >
          <FaCheckDouble />
        </button>
      </div>
    );
  } else if (status == "Received") {
    return (
      <div className="flex gap-3 font-bold mt-4 mb-2">
        Mark as food is Ready.
        <button
          onClick={markAsComplete}
          className="text-green py-0 px-4 text-xl"
        >
          <FaCheckDouble />
        </button>
      </div>
    );
  }
  return <></>;
};

export const DeliveryOptions = ({ data }: { data: IOrder }) => {
  const { status } = data;
  const { updateOrderHandler, getAllOrderList, setOrdersList } = useOrderHook();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const acceptFoodPicking = () => {
    if (loading) return;
    setLoading(true);
    console.log({ data });

    updateOrderHandler(
      {
        status: "Pickup",
        _id: data._id,
        deliveryId: session?.user._id,
      },
      (res: any) => {
        toast.success(res.data.success);
        setLoading(false);
      },
      (err: any) => {
        console.log({ err });
        setLoading(false);
      }
    );
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
  }, [loading]);

  if (status == "Ready") {
    return (
      <div className="flex gap-3 font-bold mt-4 mb-2">
        Request for picking this order
        <button
          onClick={acceptFoodPicking}
          className="text-green py-0 px-4 text-xl"
        >
          <FaCheckDouble />
        </button>
      </div>
    );
  }
  return <></>;
};

export const UserOptions = ({ data }: { data: IOrder }) => {
  const { status } = data;
  const { updateOrderHandler, getAllOrderList, setOrdersList } = useOrderHook();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const acceptFoodPicking = () => {
    if (loading) return;
    setLoading(true);
    updateOrderHandler(
      {
        status: "Deliverd",
        _id: data._id,
      },
      (res: any) => {
        toast.success(res.data.success);
        setLoading(false);
      },
      (err: any) => {
        console.log({ err });
        setLoading(false);
      }
    );
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
  }, [loading]);

  if (status == "Pickup") {
    return (
      <div className="flex gap-3 font-bold mt-4 mb-2">
        Mark as complete order...
        <button
          onClick={acceptFoodPicking}
          className="text-green py-0 px-4 text-xl"
        >
          <FaCheckDouble />
        </button>
      </div>
    );
  }
  return <></>;
};
