import Image from "next/image";
import React, { useState } from "react";
import { IMenu } from "@/app/utils/type";
import useCartHook from "@/app/utils/useHooks/useCartHook";
import toast from "react-hot-toast";

const Cart = ({ data }: { data: IMenu }) => {
  const { addCartHandler } = useCartHook();

  const initialText = data.description;

  const [showMore, setShowMore] = useState(false);
  const [displayText, setDisplayText] = useState(initialText.slice(0, 80));

  const handleShowMore = () => {
    if (showMore) {
      setDisplayText(initialText.slice(0, 80));
    } else {
      setDisplayText(initialText);
    }
    setShowMore(!showMore);
  };

  return (
    <div className="bg-main max-w-[18rem] overflow-hidden rounded">
      <div>
        <Image
          src={data.coverImage}
          alt="card-image"
          width={"300"}
          height={300}
        />
      </div>
      <div className="px-2">
        <h2 className="text-2xl mt-2 font-semibold">{data.name}</h2>
        <div className="mt-1 text-md">
          {displayText}{" "}
          <p className="text-blue" onClick={handleShowMore}>
            {showMore ? "Show Less" : "Show More"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2 mb-2">
          <button
            className="bg-gray px-4 py-1 rounded"
            onClick={() => {
              toast.success(`${data.name} has been added to cart.`);
              addCartHandler({ ...data, quantity: 1 });
            }}
          >
            Order now
          </button>
          <b className="text-green text-xl">{data.price}$</b>
        </div>
      </div>
    </div>
  );
};

export default Cart;
