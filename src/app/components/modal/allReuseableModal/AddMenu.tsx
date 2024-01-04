import { ActionIcon } from "rizzui";
import { useModal } from "../useModal";
import { useState } from "react";
import useMenuHook from "@/app/utils/useHooks/useMenuHook";
import toast from "react-hot-toast";

export default function AddMenuModalView({
  updateTableState,
  row,
}: {
  updateTableState: () => void;
  row?: any;
}) {
  const { closeModal } = useModal();
  const [loading, setLoading] = useState();
  const { addMenuHandler, updateMenuHandler } = useMenuHook();
  const [menuData, setMenuData] = useState<any>({
    name: row?.name ?? "",
    description: row?.description ?? "",
    price: row?.price ?? "",
    category: row?.category ?? "",
    coverImage: row?.coverImage ?? "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    row
      ? updateMenuHandler(
          { ...row, ...menuData },
          (res: any) => {
            toast.success(res?.data?.message);
            updateTableState();
            closeModal();
          },
          (err: any) => {
            console.log({ err });
          }
        )
      : addMenuHandler(
          menuData,
          (res: any) => {
            toast.success(res?.data?.message);
            updateTableState();
            closeModal();
          },
          (err: any) => {
            console.log({ err });
          }
        );
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <h1 className="font-semibold">Add New Menu Product</h1>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          x
        </ActionIcon>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          action={"#"}
          className="flex flex-col gap-4 px-10 mt-4"
        >
          <input
            type="text"
            value={menuData.name}
            onChange={(e) => setMenuData({ ...menuData, name: e.target.value })}
            required
            className="bg-lightGrey/50 px-4 py-2 border rounded"
            placeholder="Enter your product name"
          />
          <input
            type="text"
            value={menuData.description}
            onChange={(e) =>
              setMenuData({ ...menuData, description: e.target.value })
            }
            required
            className="bg-lightGrey/50 px-4 py-2 border rounded"
            placeholder="Enter product description"
          />
          <input
            type="number"
            value={menuData.price}
            onChange={(e) =>
              setMenuData({ ...menuData, price: Number(e.target.value) })
            }
            required
            className="bg-lightGrey/50 px-4 py-2 border rounded"
            placeholder="Enter product price"
          />
          <select
            id="category"
            value={menuData.category}
            onChange={(e) =>
              setMenuData({ ...menuData, category: e.target.value })
            }
            required
            className="bg-lightGrey/50 px-4 py-2 border rounded"
          >
            <option value="">Select category</option>
            <option value="seafood">Seafood</option>
            <option value="fastfood">Fast Food</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="text"
            value={menuData.coverImage}
            onChange={(e) =>
              setMenuData({ ...menuData, coverImage: e.target.value })
            }
            required
            className="bg-lightGrey/50 px-4 py-2 border rounded"
            placeholder="Enter cover image URL"
          />
          <div className="mt-4 flex items-center justify-end mb-4">
            <button
              type="submit"
              className="bg-gray px-6 text-white rounded font-bold py-2 w-[150px]"
            >
              {loading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
