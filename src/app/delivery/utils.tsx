import { Tabs } from "../components/Tabs/Tab";
import { TabContent } from "../components/listedOrders";
import { IOrder } from "../utils/type";

export const OrderTabListing = ({
  orders,
}: {
  orders: {
    ready: [];
    pickup: [];
    delivered: [];
  };
}) => {
  const tabsData = [
    {
      label: "Ready",
      length: orders.ready.length,
      content: (
        <div>
          {orders.ready.length > 0 ? (
            <TabContent orderData={orders.ready as IOrder[]} />
          ) : (
            <p className="text-center w-full text-white mt-6">
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
            <p className="text-center w-full text-white mt-6">
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
            <p className="text-center w-full text-white mt-6">
              No delivered orders yet.
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-[80%] bg-main h-fit">
      <Tabs
        labelClasses="!text-white hover:!text-black !rounded-none"
        tabClasses="!text-black"
        tabs={tabsData}
      />
    </div>
  );
};
