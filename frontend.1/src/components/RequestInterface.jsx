import React from "react";
import { Link } from "react-router-dom";
import { Addresses } from "../components/index";

const RequestInterface = () => {
  return (
    <div className="flex p-8 flex-col w-full h-full justify-start items-center">
      <div className="flex flex-col justify-start items-center w-full rounded-lg shadow-md border border-[#c5c4c4] bg-white h-full">
        <div className="flex flex-col justify-center items-center w-full px-4 2xl:px-10 mt-10">
          <div className="flex justify-between items-center w-full border border-transparent">
            <span className="text-[#1B0165] font-bold text-[30px] 2xl:text-[32px]">
              Your requests
            </span>
            <div className="border border-transparent flex mt-4 mb-2 analyse-btn rounded-3xl active:scale-[0.998] transition-all delay-25">
              <Link
                to="/request-list"
                className="flex flex-row justify-center items-center w-full h-full text-[12px] text-[#f9f9f9] tracking-wider px-4 py-2 font-bold"
              >
                See all
              </Link>
            </div>
          </div>
          <Addresses />
        </div>
      </div>
    </div>
  );
};

export default RequestInterface;
