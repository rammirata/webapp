import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosStarOutline } from "react-icons/io";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import { BsFillPencilFill } from "react-icons/bs";
import { FilterOptions, FilterColumns } from "../components/index";

const ListTable = ({ data, offset, visibleColumns }) => {
  const columnNames = [
    "Address",
    "Total transactions",
    "Latest Trade",
    "Longevity",
    "ENS Names",
    "Swaps",
    "Defi Interactions",
    "Gaming Interactions",
    "Metaverse Interactions",
    "Total Worth",
    "Airdrops",
    "NFT Transactions",
    "First Trade",
  ];

  const [filterOptionsOpen, setFilterOptionsOpen] = useState(
    new Array(columnNames.length).fill(false)
  );

  const toggleFilterOptions = (index) => {
    const newFilterOptionsOpen = [...filterOptionsOpen];
    newFilterOptionsOpen[index] = !newFilterOptionsOpen[index];
    setFilterOptionsOpen(newFilterOptionsOpen);
  };

  const [filterColumnsOpen, setFilterColumnsOpen] = useState(
    new Array(columnNames.length).fill(false)
  );

  const toggleFilterColumns = (index) => {
    const newFilterColumnsOpen = [...filterColumnsOpen];
    newFilterColumnsOpen[index] = !newFilterColumnsOpen[index];
    setFilterColumnsOpen(newFilterColumnsOpen);
  };

  const convertDays = (ms) => {
    const ageInMilliseconds = ms;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    return ageInDays.toFixed(2);
  };

  //format date for latest trade
  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="flex flex-col w-full max-w-[1520px]">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="overflow-auto">
            <table className="min-w-full">
              <thead className="border-b border-[#C9C9C9]">
                <tr>
                  <th className="flex justify-center items-center gap-2.5 mr-3">
                    <input
                      type="checkbox"
                      className="w-[15px] h-[15px] rounded-sm border border-[#222727] outline-none cursor-pointer"
                    />
                  </th>
                  {visibleColumns.includes("Address") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Address
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(0)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(0)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[0]}
                        setIsOpen={() => toggleFilterOptions(0)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[0]}
                        setIsOpen={() => toggleFilterColumns(0)}
                        colName={"Address"}
                        dataName={"address"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Total transactions") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Total transactions
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(1)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[1]}
                        setIsOpen={() => toggleFilterOptions(1)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(1)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[1]}
                        setIsOpen={() => toggleFilterColumns(1)}
                        colName={"Total transactions"}
                        dataName={"numTx"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Latest Trade") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Latest Trade
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(2)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[2]}
                        setIsOpen={() => toggleFilterOptions(2)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(2)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[2]}
                        setIsOpen={() => toggleFilterColumns(2)}
                        colName={"Latest Trade"}
                        dataName={"latestTx"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Longevity") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727] "
                    >
                      Longevity (days)
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(3)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[3]}
                        setIsOpen={() => toggleFilterOptions(3)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(3)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[3]}
                        setIsOpen={() => toggleFilterColumns(3)}
                        colName={"Longevity"}
                        dataName={"longevity"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("ENS Names") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      ENS Names
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(4)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[4]}
                        setIsOpen={() => toggleFilterOptions(4)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(4)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[4]}
                        setIsOpen={() => toggleFilterColumns(4)}
                        colName={"ENS Names"}
                        dataName={"ensNames"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Swaps") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Swaps
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(5)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[5]}
                        setIsOpen={() => toggleFilterOptions(5)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        // onClick={toggleFilterColumns6}
                        onClick={() => toggleFilterColumns(5)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[5]}
                        setIsOpen={() => toggleFilterColumns(5)}
                        colName={"Swaps"}
                        dataName={"numSwaps"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Defi Interactions") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Defi Interactions
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(6)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[6]}
                        setIsOpen={() => toggleFilterOptions(6)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(6)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[6]}
                        setIsOpen={() => toggleFilterColumns(6)}
                        colName={"Defi Interactions"}
                        dataName={"defiInteractions"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Gaming Interactions") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Gaming Interactions
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(7)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[7]}
                        setIsOpen={() => toggleFilterOptions(7)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(7)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[7]}
                        setIsOpen={() => toggleFilterColumns(7)}
                        colName={"Gaming Interactions"}
                        dataName={"gamingInteractions"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Metaverse Interactions") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Metaverse Interactions
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(8)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[8]}
                        setIsOpen={() => toggleFilterOptions(8)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(8)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[8]}
                        setIsOpen={() => toggleFilterColumns(8)}
                        colName={"Metaverse Interactions"}
                        dataName={"metaverseInteractions"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Total Worth") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Total Worth
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(9)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[9]}
                        setIsOpen={() => toggleFilterOptions(9)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(9)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[9]}
                        setIsOpen={() => toggleFilterColumns(9)}
                        colName={"Total Worth"}
                        dataName={"totalWorth"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("Airdrops") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      Airdrops
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(10)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[10]}
                        setIsOpen={() => toggleFilterOptions(10)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(10)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[10]}
                        setIsOpen={() => toggleFilterColumns(10)}
                        colName={"Airdrops"}
                        dataName={"numAirdrops"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("NFT Transactions") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      NFT Transactions
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(11)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[11]}
                        setIsOpen={() => toggleFilterOptions(11)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(11)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[11]}
                        setIsOpen={() => toggleFilterColumns(11)}
                        colName={"NFT Transactions"}
                        dataName={"numNftTx"}
                      />
                    </th>
                  )}
                  {visibleColumns.includes("First Trade") && (
                    <th
                      scope="col"
                      className=" relative whitespace-nowrap text-[15.5px] 2xl:text-[16.5px] font-medium text-[#222727]"
                    >
                      First Trade
                      <AiOutlineArrowDown
                        className="inline-block ml-1 text-[#222727] cursor-pointer"
                        onClick={() => toggleFilterOptions(12)}
                      />
                      <FilterOptions
                        isOpen={filterOptionsOpen[12]}
                        setIsOpen={() => toggleFilterOptions(12)}
                      />
                      <BiDotsVerticalRounded
                        className="inline-block ml-1 text-[#222727] absolute right-0 top-[39%] cursor-pointer"
                        onClick={() => toggleFilterColumns(12)}
                      />
                      <FilterColumns
                        isOpen={filterColumnsOpen[12]}
                        setIsOpen={() => toggleFilterColumns(12)}
                        colName={"First Trade"}
                        dataName={"firstTx"}
                      />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#ECECECCC] cursor-pointer border-b border-[#C9C9C9]"
                  >
                    <td className="flex gap-2.5 justify-center items-center">
                      <img src="/dots_vector.png" alt="dots" />
                      <input
                        type="checkbox"
                        className="w-[15px] h-[15px] rounded-sm border border-[#222727] outline-none cursor-pointer"
                      />
                      <IoIosStarOutline className="text-[#494949] text-[22px] hover:text-yellow-500" />
                    </td>
                    {visibleColumns.includes("Address") && (
                      <td className=" whitespace-nowrap text-sm font-bold text-[#494949] hover:border hover:border-[#1b0165]">
                        <IoDocumentText className="inline-block mr-3 text-[#494949] hover:text-[#1b0165] text-[22px] mb-1" />
                        <span className="font-[500] text-[15px]">
                          {item.address}
                        </span>
                        <BsFillPencilFill className="inline-block ml-6 text-[#494949] hover:text-[#1b0165] text-[22px] mb-1" />
                      </td>
                    )}
                    {visibleColumns.includes("Total transactions") && (
                      <td className=" text-[15px] text-[#494949] font-[500] whitespace-nowrap">
                        {item.numTx}
                      </td>
                    )}
                    {visibleColumns.includes("Latest Trade") && (
                      <td className=" text-[15px] text-[#494949] font-[500] whitespace-nowrap">
                        {formatDate(item.latestTx)}
                      </td>
                    )}
                    {visibleColumns.includes("Longevity") && (
                      <td className=" text-[15px] text-[#494949] font-[500] whitespace-nowrap">
                        {convertDays(item.longevity)}
                      </td>
                    )}
                    {visibleColumns.includes("ENS Names") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {item.ensNames?.length > 0
                          ? item.ensNames?.map((ensName, index) => (
                              <span key={index} className="block">
                                {ensName}
                              </span>
                            ))
                          : "N/A"}
                      </td>
                    )}
                    {visibleColumns.includes("Swaps") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {item.numSwaps}
                      </td>
                    )}
                    {visibleColumns.includes("Defi Interactions") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {item.defiInteractions}
                      </td>
                    )}
                    {visibleColumns.includes("Gaming Interactions") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {item.gamingInteractions}
                      </td>
                    )}
                    {visibleColumns.includes("Metaverse Interactions") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {item.metaverseInteractions}
                      </td>
                    )}
                    {visibleColumns.includes("Total Worth") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {item.totalWorth}
                      </td>
                    )}
                    {visibleColumns.includes("Airdrops") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {item.numAirdrops}
                      </td>
                    )}
                    {visibleColumns.includes("NFT Transactions") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {item.numNftTx}
                      </td>
                    )}
                    {visibleColumns.includes("First Trade") && (
                      <td className=" text-[15px] font-[500] text-[#494949] whitespace-nowrap">
                        {formatDate(item.firstTx)}
                      </td>
                    )}
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

export default ListTable;
