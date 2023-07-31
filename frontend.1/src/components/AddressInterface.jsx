import React from "react";
import { Upload } from "../components/index";
import { useUser } from "../context/UserContext";

const AddressInterface = () => {
  const { accessToken } = useUser();

  return (
    <div className="flex py-8 pl-8 w-full flex-col h-full justify-start items-center">
      <div className="flex flex-col justify-start items-center w-full rounded-lg shadow-md border border-[#c5c4c4] bg-white h-full">
        <div className="flex flex-col justify-center items-start w-full px-8 2xl:px-10 mt-10">
          <span className="text-[#1B0165] font-bold text-[30px] 2xl:text-[32px]">
            Analyse your addresses
          </span>
          <span className="text-[#110d1b] text-[16px] mt-5 mb-2">
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur.
          </span>
        </div>
        <div className="flex flex-col w-[80%} xl:w-full h-full py-6">
          <Upload accessToken={accessToken} />
        </div>
      </div>
    </div>
  );
};

export default AddressInterface;
