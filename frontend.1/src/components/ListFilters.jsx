import React, { useEffect, useState } from "react";
import { useFilters } from "../context/FilterContext";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";

const columnsData = [
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

const SelectedFilter = ({ filterName, onRemove }) => {
  return (
    <div className="flex justify-center items-center gap-2.5 px-3 2xl:px-4 py-2 bg-[#bbb] rounded-3xl">
      <p className="text-[15.5px] font-[500]">
        <span className="text-[#494949]">Filter:</span>
        <span className="text-[#1B0165] font-[700]">&nbsp; {filterName}</span>
      </p>
      <RxCross2
        className="text-[#1B0165] cursor-pointer"
        onClick={() => {
          onRemove(filterName);
        }}
      />
    </div>
  );
};

const ColumnName = ({ columnName, border, textColor, check, onClick }) => {
  return (
    <div
      className={`flex justify-center cursor-pointer items-center px-3 2xl:px-4 py-2 bg-[#ddd] rounded-3xl ${
        border ? "border border-[#338302]" : ""
      }`}
      onClick={onClick}
    >
      {check && <BsCheck className="text-[#338302]" />}
      <span className={`${textColor} font-[500]`}>
        {check && <span>&nbsp;</span>}
        {columnName}
      </span>
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
        <div className="pb-6 pt-1 origin-bottom-left absolute top-0 -left-8 mt-5 w-[264px] rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  defaultValue={columnsData[0].dataName}
                  onChange={(e) => {
                    setFilterColumn(e.target.value);
                  }}
                >
                  {columnsData.map((col) => (
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

const ListFilters = ({ visibleColumns, setVisibleColumns }) => {
  const { filters, setFilters } = useFilters();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumnsOpen, setFilterColumnsOpen] = useState(false);

  const [columns, setColumns] = useState([
    { name: "Address", visible: true },
    { name: "Total transactions", visible: true },
    { name: "Latest Trade", visible: true },
    { name: "Longevity", visible: true },
    { name: "ENS Names", visible: true },
    { name: "Swaps", visible: true },
    { name: "Defi Interactions", visible: false },
    { name: "Gaming Interactions", visible: false },
    { name: "Metaverse Interactions", visible: false },
    { name: "Total Worth", visible: false },
    { name: "Airdrops", visible: false },
    { name: "NFT Transactions", visible: false },
    { name: "First Trade", visible: false },
  ]);

  const handleColumnClick = (index) => {
    const newColumns = [...columns];
    newColumns[index].visible = !newColumns[index].visible;
    setColumns(newColumns);

    const updatedVisibleColumns = newColumns
      .filter((column) => column.visible)
      .map((column) => column.name);
    setVisibleColumns(updatedVisibleColumns);
  };

  const removeFilterbyName = (name) => {
    const newSelectedFilters = filters.filter(
      (filter) => filter.filterColumn !== name
    );
    setFilters(newSelectedFilters);
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  return (
    <div className="flex flex-col justify-start items-center w-full py-8 max-w-[1280px]">
      <div className="flex justify-start 2xl:justify-start items-center w-full mb-8 gap-4 2xl:gap-8">
        {/* search bar */}
        <div className="flex justify-center items-center relative">
          <input
            type="text"
            className="w-[200px] 2xl:w-[326px] h-[40px] placeholder-[#1B0165] text-[#1B0165] font-[500] text-[15.5px] outline-none bg-[#ddd] rounded-3xl px-4"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-4 text-[#1B0165]" />
        </div>
        {/* filter menu */}
        <div
          className="flex justify-center items-center gap-2.5 relative cursor-pointer"
          onClick={() => {
            setFilterColumnsOpen(!filterColumnsOpen);
          }}
        >
          <span className="text-[15.5px] font-[500] text-[#1B0165]">
            Filters
          </span>
          <IoFilterSharp className="text-[#1B0165]" />
        </div>
        <FilterColumns
          isOpen={filterColumnsOpen}
          setIsOpen={setFilterColumnsOpen}
        />
        {filters.map((filter, index) => {
          return (
            <SelectedFilter
              key={index}
              filterName={filter.filterColumn}
              onRemove={removeFilterbyName}
            />
          );
        })}
        {filters.length > 0 && (
          <div className="flex justify-center items-center">
            <button
              className="text-[#1B0165] font-[700] text-[15.5px]"
              onClick={clearAllFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-start 2xl:justify-start items-center w-full mb-8 gap-4 2xl:gap-8 flex-wrap">
        <div className="flex justify-center items-center">
          <span className="text-[#1b0165] text-[15.5px] font-[400]">All</span>
        </div>
        {columns.map((column, index) => (
          <ColumnName
            key={index}
            columnName={column.name}
            border={column.visible}
            check={column.visible}
            textColor={column.visible ? "text-[#338302]" : "text-[#494949]"}
            onClick={() => handleColumnClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListFilters;
