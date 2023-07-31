import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { useFilters } from "../context/FilterContext";

const FilterColumns = ({ isOpen, setIsOpen, colName, dataName }) => {
  const { filters, setFilters } = useFilters();
  const [operator, setOperator] = useState("=");
  const [value, setValue] = useState(null);

  const handleFilter = () => {
    if (!operator || !value || value === "" || operator === "") {
      toast.error("Please select operator and value");
      return;
    }

    const newFilters = [
      ...filters,
      {
        filterColumn: dataName,
        filterOperator: operator,
        filterValue: value,
      },
    ];

    setFilters(newFilters);

    setIsOpen();
  };

  useEffect(() => {
    console.log("FILTERS -->", filters);
  }, [filters]);

  return (
    <div className="relative inline-block text-left z-20">
      {isOpen && (
        <div className="pb-6 pt-1 origin-top-left absolute -left-40 mt-5 w-[264px] rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex justify-between items-center gap-1 px-3 rounded-lg cursor-pointer border-b border-[#ccc]">
            <button className="py-2 text-md text-gray-700 font-[500]">
              {colName}
            </button>
            <RxCross2
              className="text-[#222727] text-[15px]"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>
          <div className="py-1 flex justify-between items-center gap-1 px-3 rounded-lg cursor-pointer">
            <button className="py-2 text-sm text-gray-700 uppercase">
              Filters
            </button>
            <FaPlus className="text-[#1b0165] text-[12px]" />
          </div>
          <div className="py-1 flex justify-between items-center gap-2.5 px-3 rounded-lg relative">
            <div className="flex items-center w-full border border-[#494949] rounded-lg overflow-hidden">
              <div className="flex bg-[#ddd] h-full p-2">
                <span className="text-[#494949] font-[500] text-sm">
                  Operator
                </span>
              </div>
              <div className="flex w-full">
                <select
                  className="w-full h-full text-[#494949]  p-2 outline-none placeholder-[#494949] font-[500] text-sm"
                  placeholder="Enter value"
                  defaultValue={operator}
                  onChange={(e) => {
                    setOperator(e.target.value);
                  }}
                >
                  <option value="=">=</option>
                  <option value=">">{">"}</option>
                  <option value="<">{"<"}</option>
                  <option value=">=">{">="}</option>
                  <option value="<=">{"<="}</option>
                </select>
              </div>
            </div>
          </div>
          <div className="py-1 flex justify-between items-center gap-2.5 px-3 rounded-lg  relative">
            <div className="flex items-center w-full border border-[#494949] rounded-lg overflow-hidden">
              <input
                type="text"
                className="w-full h-full text-[#494949]  p-2 outline-none placeholder-[#494949] font-[500] text-sm"
                placeholder="Enter value"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="pt-4 mt-4 flex justify-end items-center gap-1 px-3 rounded-lg cursor-pointer border-t border-[#ccc]">
            <button
              className="py-1 px-3 text-md text-[#1b0165] font-[700] rounded-full bg-[#eee] border border-[#1b0165]"
              onClick={() => {
                setIsOpen();
              }}
            >
              Cancel
            </button>
            <button
              className="py-1 px-3 text-md text-white font-[700] rounded-full bg-[#1b0165] border"
              onClick={() => {
                toast.success("Filter Added Successfully");
                handleFilter();
              }}
            >
              Add Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterColumns;
