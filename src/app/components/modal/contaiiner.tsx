"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useModal } from "./useModal";
import { Modal } from "rizzui";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 bg-black/60 z-10 w-[100%] h-screen flex items-center justify-center">
          <div
            className={`bg-white rounded-[10px]`}
            style={{
              width: customSize,
            }}
          >
            {view}
          </div>
        </div>
      )}
    </>
  );
}
