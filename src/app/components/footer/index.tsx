import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-main p-4">
      <div className="flex flex-col justify-center">
        <h1 className="text2xl md:text-3xl text-center mt-2 font-bold">
          Food Ordering System
        </h1>
        <ul className="mt-3 flex flex-col items-end gap-1">
          <li className=" list-disc">Term & Conditions</li>
          <li className="list-disc">@copy right</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
