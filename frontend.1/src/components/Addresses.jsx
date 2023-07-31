import React, { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addresses = () => {
  const navigate = useNavigate();
  const { accessToken } = useUser();
  const [data, setData] = useState([]);

  // address groups api
  useEffect(() => {
    axios
      .get(`https://api.blockway.tech/address-groups`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res?.data?.data?.addressGroups);
        setData(res?.data?.data?.addressGroups);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [accessToken]);
  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-3xl font-bold text-[#1B0165] pt-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-[20px] font-medium text-[#1B0165] pt-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-[20px] font-medium text-[#1B0165] px-6 pt-[1.35rem] text-left flex items-end justify-end"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 8).map((item, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/analytics/?id=${item._id}`);
                    }}
                  >
                    <td className="whitespace-nowrap text-sm font-bold py-5">
                      <span className="bg-[#1B0165] text-[#A2FF93] rounded-md px-3 py-1">
                        {index}
                      </span>
                    </td>
                    <td className="text-[20px] text-[#1B0165] font-[400] whitespace-nowrap py-5">
                      {item.groupName}
                    </td>
                    <td className="text-sm text-[#1B0165] font-[400] whitespace-nowrap px-6 py-5 flex items-center justify-end">
                      {item.isProcessed ? (
                        <AiFillCheckCircle className="text-[#22B80A] text-xl" />
                      ) : (
                        <HiDotsCircleHorizontal className="text-[#BA8602] text-xl" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
