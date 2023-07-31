import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
const Error = ({ error, text }) => {
  return (
    <div className={`${error ? "flex" : "hidden"} flex-row`}>
      <AiFillInfoCircle className=" mt-3 -mb-2 text-[#FF1A19]" />
      <p className="text-[14px] ml-2 font-[400] text-[#FF1A19] mt-2.5">
        {text}
      </p>
    </div>
  );
};

export default Error;
