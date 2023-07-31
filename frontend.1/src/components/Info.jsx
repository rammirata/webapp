import React from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Info = () => {
  return (
    <div className=" flex flex-col w-1/2 h-full justify-center items-center">
      <div className="flex flex-col max-w-[600px] max-h-[600px] justify-center items-center pb-48 lg:pb-72">
        <img src="/logo.png" alt="" className="h-[100px] w-[300px]" />
        <p className="py-4 px-12 font-[400] text-[20px] text-white border-b-2">
          Blockway is the next generation on- <br /> chain analytics platform.
          Make the most <br /> of your project marketing by making <br />{" "}
          data-driven decisions.
        </p>
        <div className="flex flex-col mt-8 font-[400] tracking-wider text-white justify-center items-center">
          <span className="mb-4">Follow us on</span>
          <div className="flex flex-row justify-center items-center gap-2">
            <AiFillFacebook className="h-[30px] w-[30px] cursor-pointer hover:text-gray-400 transition delay-25 hover:-translate-y-[2px]" />
            <AiFillLinkedin className="h-[30px] w-[30px] cursor-pointer hover:text-gray-400 transition delay-25 hover:-translate-y-[2px]" />
            <AiFillTwitterSquare className="h-[30px] w-[30px] cursor-pointer hover:text-gray-400 transition delay-25 hover:-translate-y-[2px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
