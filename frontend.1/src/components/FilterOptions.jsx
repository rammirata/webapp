import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useFilters } from "../context/FilterContext";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsChevronRight } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";

const columns = [
  {
    name: "Address",
    dataName: "address",
  },
  {
    name: "Total transactions",
    dataName: "totalTx",
  },
  {
    name: "Latest Trade",
    dataName: "latestTx",
  },
  {
    name: "Longevity",
    dataName: "longevity",
  },
  {
    name: "ENS Names",
    dataName: "ensNames",
  },
  {
    name: "Swaps",
    dataName: "numSwaps",
  },
  {
    name: "Defi Interactions",
    dataName: "defiInteractions",
  },
  {
    name: "Gaming Interactions",
    dataName: "gamingInteractions",
  },
  {
    name: "Metaverse Interactions",
    dataName: "metaverseInteractions",
  },
  {
    name: "Total Worth",
    dataName: "totalWorth",
  },
  {
    name: "Airdrops",
    dataName: "numAirdrops",
  },
  {
    name: "NFT Transactions",
    dataName: "numNftTx",
  },
  {
    name: "First Trade",
    dataName: "firstTx",
  },
];

const Sort = ({ isOpen, setIsOpen, sort, setSort }) => {
  return (
    <div className="relative inline-block text-left z-10">
      {isOpen && (
        <div className="before:pb-6 pt-1 origin-bottom-left absolute left-[18rem] -bottom-[5rem]  mt-10 w-[15rem] rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex justify-start items-center gap-1.5 px-3 rounded-lg cursor-pointer">
            <AiOutlineArrowLeft
              className="text-[#222727] text-[15px]"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <button className="text-md text-gray-700 font-[500]">
              Sort by
            </button>
          </div>
          <div
            className="py-1 flex justify-start items-center gap-1 hover:bg-gray-100 px-3 rounded-lg cursor-pointer"
            onClick={() => {
              sort === "asc" ? setSort("desc") : setSort("asc");
              setIsOpen(false);
            }}
          >
            <button className="py-2 text-sm text-gray-700 uppercase">
              {sort === "asc" ? "desc" : "asc"}
            </button>
          </div>
          <div
            className="py-1 flex justify-start items-center gap-1 hover:bg-gray-100 px-3 rounded-lg cursor-pointer"
            onClick={() => {
              setSort("asc");
              setIsOpen(false);
            }}
          >
            <button className="py-2 text-sm text-[#1B0165]">Unsort</button>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterColumns = ({ isOpen, setIsOpen }) => {
  const { filters, setFilters } = useFilters();
  const [operator, setOperator] = useState("=");
  const [value, setValue] = useState(null);
  const [filterColumn, setFilterColumn] = useState("address");

  const handleFilter = () => {
    if (!operator || !value || value === "" || operator === "") {
      toast.error("Please select operator and value");
      return;
    }

    const newFilters = [
      ...filters,
      {
        filterColumn: filterColumn,
        filterOperator: operator,
        filterValue: value,
      },
    ];

    setFilters(newFilters);

    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-20">
      {isOpen && (
        <div className="pb-6 pt-1 origin-bottom-left absolute -top-[10rem] left-[17.5rem] mt-5 w-[264px] rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex justify-start items-center gap-1 px-3 rounded-lg cursor-pointer">
            <AiOutlineArrowLeft
              className="text-[#222727] text-[15px]"
              onClick={() => {
                setIsOpen(false);
              }}
            />
            <button className="py-2 text-sm text-gray-700">Filters</button>
          </div>
          <div className="py-1 flex flex-col justify-start items-start gap-2.5 px-3 rounded-lg relative">
            <div className="flex justify-start items-center gap-1">
              <IoMdArrowDropdown className="text-[#1b0165] text-[18px]" />
              <span className="text-[13px] font-[500]">Columns</span>
            </div>
            <div className="flex items-center w-full border border-[#494949] rounded-lg overflow-hidden">
              <div className="flex w-full">
                <select
                  className="w-full h-full text-[#494949]  p-2 outline-none placeholder-[#494949] font-[500] text-sm"
                  placeholder="Enter value"
                  defaultValue={columns[0].dataName}
                  onChange={(e) => {
                    setFilterColumn(e.target.value);
                  }}
                >
                  {columns.map((col) => (
                    <option value={col.dataName}>{col.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="py-1 flex flex-col justify-start items-start gap-2.5 px-3 rounded-lg relative">
            <div className="flex justify-start items-center gap-1">
              <IoMdArrowDropdown className="text-[#1b0165] text-[18px]" />
              <span className="text-[13px] font-[500]">Operator</span>
            </div>
            <div className="flex items-center w-full border border-[#494949] rounded-lg overflow-hidden">
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
          <div className="py-1 flex flex-col justify-between items-start gap-2.5 px-3 rounded-lg  relative">
            <div className="flex justify-start items-center gap-1">
              <IoMdArrowDropdown className="text-[#1b0165] text-[18px]" />
              <span className="text-[13px] font-[500]">Value</span>
            </div>
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
              className="py-1 px-8 text-md text-white font-[700] rounded-full bg-[#1b0165] border border-[#1b0165]"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="py-1 px-8 text-md text-[#1b0165] font-[700] rounded-full  bg-[#eee] border border-[#1b0165]"
              onClick={() => {
                toast.success("Filter Added Successfully");
                handleFilter();
                setIsOpen(false);
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterOptions = ({ isOpen, setIsOpen }) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("asc");
  const [columnsOpen, setColumnsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left z-20">
      {isOpen && (
        <div className="pb-6 pt-1 origin-top-left absolute -left-40 mt-5 w-[264px] rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex justify-between items-center gap-1 px-3 rounded-lg cursor-pointer border-b border-[#ccc]">
            <button className="py-2 text-md text-gray-700 font-[500]">
              Option View
            </button>
            <RxCross2
              className="text-[#222727] text-[15px]"
              onClick={() => {
                setIsOpen();
              }}
            />
          </div>
          <div className="py-1 flex justify-between items-center gap-1 px-3 rounded-lg cursor-pointer">
            <button className="py-2 text-xs text-gray-700">Default View</button>
          </div>
          <div
            className="py-1 flex justify-between items-center gap-2.5 hover:bg-gray-100 px-3 rounded-lg cursor-pointer"
            onClick={() => {
              setSortOpen(!sortOpen);
            }}
          >
            <div className="flex justify-center items-center gap-2.5">
              <img src="/arrows_vector.png" alt="logo" className="w-[20px]" />
              <button className="py-2 text-sm text-gray-700">Sort by</button>
            </div>
            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-700 text-xs uppercase">{sort}</span>
              <BsChevronRight className="text-gray-700 text-[10px]" />
            </div>
          </div>
          <FilterColumns isOpen={columnsOpen} setIsOpen={setColumnsOpen} />
          <Sort
            isOpen={sortOpen}
            setIsOpen={setSortOpen}
            sort={sort}
            setSort={setSort}
          />
          <div
            className="py-1 relative flex justify-start items-center gap-2.5 hover:bg-gray-100 px-3 rounded-lg cursor-pointer"
            onClick={() => {
              setColumnsOpen(true);
            }}
          >
            <IoFilterSharp className="text-gray-700 text-[20px]" />
            <button className="py-2 text-sm text-gray-700">Filters</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
