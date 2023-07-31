import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./index";

const ChartHeader = ({ addressGroupId, list }) => {
  return (
    <div className="flex justify-between px-4 py-2 bg-white rounded-lg shadow-md w-full">
      <div className="flex justify-center items-center">
        <img
          src="/chart_doc_icon.png"
          alt="chart_doc_icon"
          className="w-10 h-10"
        />
        <div className="flex flex-col justify-center items-left ml-[0.85rem]">
          <span className="text-[23px] font-[400] text-[#1b0165]">
            Name-address
          </span>
          <span className="text-[14px] font-[400] text-[#494949]">
            Feb 24, 2023
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center w-[45%] 2xl:w-[30%]">
        <Link to={`/analytics?id=${addressGroupId}`}>
          <Button
            text={"View Charts"}
            icon={list ? "/chart_vector_white.png" : "/chart_vector.png"}
            border={list ? false : true}
          />
        </Link>
        {!list ? (
          <>
            <Link to={`/list?id=${addressGroupId}`}>
              <Button
                text={"View list"}
                icon={"/doc_vector.png"}
                border={false}
              />
            </Link>
            <Button
              text={"Export"}
              icon={"/export_vector.png"}
              border={false}
            />
          </>
        ) : (
          <>
            <Button
              text={"Export"}
              icon={"/export_vector.png"}
              border={false}
            />
            <Button
              text={"Saving list"}
              icon={"/save_vector.png"}
              border={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChartHeader;
