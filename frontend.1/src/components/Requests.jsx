import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Done = () => {
  return (
    <div className="flex justify-end items-center">
      <button className="bg-[#DFFFDC] text-[#338302] text-[16px] font-bold py-2 px-4 rounded-full inline-flex items-center gap-2.5">
        <span>Done</span>
        <AiFillCheckCircle className="text-[#338302] text-2xl" />
      </button>
    </div>
  );
};

const Processing = () => {
  return (
    <div className="flex justify-end items-center">
      <button className="bg-[#FFF5DA] text-[#A57806] text-[16px] font-bold py-2 px-4 rounded-full inline-flex items-center gap-2.5">
        <span>Processing</span>
        <HiDotsCircleHorizontal className="text-[#BA8602] text-2xl" />
      </button>
    </div>
  );
};

const Requests = ({ data, offset }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-auto">
            <table className="min-w-full">
              <thead className="border-b bg-[#1B0165]">
                <tr>
                  <th
                    scope="col"
                    className="text-3xl font-bold text-[#F9F9F9] text-left pl-4 "
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-[20px] font-medium text-[#F9F9F9] text-left pl-8 "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-[20px] font-medium text-[#F9F9F9] text-right  pr-3"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="text-[20px] font-medium text-[#F9F9F9] py-5 text-right  pr-6"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-3xl font-bold text-[#F9F9F9]  text-right pr-7 "
                  >
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#ECECECCC] cursor-pointer"
                    onClick={() => {
                      navigate(`/analytics/?id=${item._id}`);
                    }}
                  >
                    <td className="whitespace-nowrap text-sm font-bold py-5 p-2">
                      <span className="bg-[#1B0165] text-[#A2FF93] rounded-md px-3 py-1">
                        {index + offset + 1}
                      </span>
                    </td>
                    <td className="text-[20px] text-[#222727] font-[400] whitespace-nowrap py-5">
                      {item.groupName}
                    </td>
                    <td className="text-[20px] text-[##222727] font-[400] whitespace-nowrap py-5  text-right">
                      {
                        (item.createdAt = item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "N/A")
                      }
                    </td>
                    <td className="text-[20px] text-[#222727] font-[400] whitespace-nowrap max-w-[256px] py-5">
                      {item.isProcessed ? <Done /> : <Processing />}
                    </td>
                    <td className="whitespace-nowrap text-[20px] font-[400] py-5 pl-2 pr-6 text-right text-[#222727]">
                      000
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

export default Requests;
