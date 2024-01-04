import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";
import IncrementDecrement from "../IncDec";
import { ICart } from "@/app/utils/type";
import useCartHook from "@/app/utils/useHooks/useCartHook";

const ListedCart = ({ data, index }: { data: ICart; index: number }) => {
  const { deleteCartHandler } = useCartHook();

  return (
    <div className="bg-white flex flex-col w-[18rem] md:w-full md:flex-row items-center">
      <div>
        <Image
          src={data.coverImage}
          alt="card-image"
          className="lg:w-[10rem]"
          width={"300"}
          height={200}
        />
      </div>
      <div className="px-1 md:px-4">
        <h2 className="text-2xl font-semibold">{data.name}</h2>
        <p className="mt-1">{data.description}</p>
        <div className="flex items-center mt-2">
          <button
            className="text-red flex items-center gap-3 font-semibold"
            onClick={() => deleteCartHandler(index)}
          >
            Delete item <MdDelete />
          </button>
          <b className="ml-4 text-green">{data.price}$</b>
        </div>
      </div>
      <div className="hidden md:flex ml-auto">
        <IncrementDecrement index={index} quantity={data.quantity} />
      </div>
      <div className="flex md:hidden">
        <IncrementDecrement
          mobile={true}
          index={index}
          quantity={data.quantity}
        />
      </div>
    </div>
  );
};

export default ListedCart;
