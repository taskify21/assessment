import useCartHook from "@/app/utils/useHooks/useCartHook";
import React, { use } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";

type INCTYPE = {
  mobile?: boolean;
  index: number;
  quantity: number;
};

const IncrementDecrement = ({ mobile, index, quantity }: INCTYPE) => {
  const { incQuantity, decQuantity } = useCartHook();

  return (
    <div>
      {mobile ? (
        <div className="flex flex-row items-center justify-between -mt-6 ml-40 gap-6 mr-0">
          <div className="cursor-pointer" onClick={() => decQuantity(index)}>
            <IoIosArrowBack />
          </div>
          <b>{quantity}</b>
          <div className="cursor-pointer" onClick={() => incQuantity(index)}>
            <IoIosArrowForward />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between h-[6rem] mr-4">
          <div className="cursor-pointer" onClick={() => incQuantity(index)}>
            <IoIosArrowUp />
          </div>
          <b>{quantity}</b>
          <div className="cursor-pointer" onClick={() => decQuantity(index)}>
            <IoIosArrowDown />
          </div>
        </div>
      )}
    </div>
  );
};

export default IncrementDecrement;
