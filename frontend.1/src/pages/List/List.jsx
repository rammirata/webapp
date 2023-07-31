import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useFilters } from "../../context/FilterContext";
import {
  Sidebar,
  Header,
  PrivateRoutes,
  ChartHeader,
  ListFilters,
  ListTable,
} from "../../components";
import { useUser } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

const List = () => {
  const [addressGroupId, setAddressGroupId] = useState(null);
  const { accessToken } = useUser();
  const [data, setData] = useState([]);
  const { filters, setFilters } = useFilters();
  const [visibleColumns, setVisibleColumns] = useState([
    "Address",
    "Total transactions",
    "Latest Trade",
    "Longevity",
    "ENS Names",
    "Swaps",
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const addressGroupId = searchParams.get("id");

    if (addressGroupId) {
      setAddressGroupId(addressGroupId);
    } else {
      console.log("No Address Group ID");
    }
  }, [location]);

  useEffect(() => {
    if (!addressGroupId) return;
    console.log(addressGroupId);
  }, [addressGroupId]);

  useEffect(() => {
    if (!addressGroupId) return;
    console.log("AGD", addressGroupId);

    let requestData = JSON.stringify({
      filters: filters,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://api.blockway.tech/address-analytics/${addressGroupId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: requestData,
    };

    axios
      .request(config)
      .then((res) => {
        console.log("look here", res?.data?.data?.addressGroupAnalytics);
        setData(res?.data?.data?.addressGroupAnalytics);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [addressGroupId, accessToken, filters]);

  useEffect(() => {
    console.log(visibleColumns, "visibleColumns");
  }, [visibleColumns]);

  return (
    <div className="flex w-full">
      <Sidebar activeTab="home" variant={"main"} />
      <div className="flex bg-[#eee] w-full justify-center">
        <div className="w-full flex flex-col items-center">
          <Header title={"Analytics - List"} />
          <div className="flex-1 flex justify-center items-center w-full h-full py-4 pl-4 pr-10 2xl:pr-20 max-w-[1050px] 2xl:max-w-[2000px]">
            <div className="flex flex-col items-center 2xl:items-start w-full h-full mt-5">
              <ChartHeader addressGroupId={addressGroupId} list={true} />
              <ListFilters
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
              />
              <div className="flex-1 flex justify-center items-center w-full h-full -mt-10">
                <div className="flex-1 flex justify-center items-center w-full h-full scale-[1]">
                  <div className="flex flex-col w-full h-full justify-start items-center">
                    <div className="flex justify-center items-center w-full rounded-xl bg-white">
                      <ListTable
                        data={currentPageData}
                        offset={offset}
                        visibleColumns={visibleColumns}
                      />
                    </div>
                    <div className="flex justify-between items-center w-full mt-[2rem]">
                      <span className="text-[14px] font-[500] text-[#222727]">
                        1 row selected
                      </span>
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-[#222727] font-[400] text-[14px]">
                          Rows per page
                        </span>
                        <input
                          type="number"
                          className="ml-2 w-10 pl-[0.25rem] placeholder-black flex justify-center items-center text-center font-bold outline-none"
                          placeholder={itemsPerPage}
                          // onChange={(e) => setItemsPerPage(e.target.value)} causes api error (too many requests)
                        />
                        <ReactPaginate
                          previousLabel={
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          }
                          nextLabel={
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          }
                          pageCount={Math.ceil(data.length / itemsPerPage)}
                          onPageChange={handlePageClick}
                          containerClassName={"pagination"}
                          previousLinkClassName={"pagination__link"}
                          nextLinkClassName={"pagination__link"}
                          disabledClassName={"pagination__link--disabled"}
                          activeClassName={"pagination__link--active"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoutes(List);
