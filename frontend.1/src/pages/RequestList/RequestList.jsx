import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar, Header, Requests, PrivateRoutes } from "../../components";
import ReactPaginate from "react-paginate";
import "../../styles/pagination.css";
import { useUser } from "../../context/UserContext";

const RequestList = () => {
  const { accessToken } = useUser();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

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
    <div className="flex w-full">
      <Sidebar activeTab="request-list" variant={"main"} />
      <div className="flex bg-[#eee] w-full justify-center">
        <div className="w-full flex flex-col items-center">
          <Header title={"Request list"} />
          <div className="flex-1 flex justify-center items-center w-full h-full">
            <div className="flex-1 flex justify-center items-center w-full h-full scale-[0.9]">
              <div className="flex flex-col w-full h-full justify-start items-center">
                <div className="flex justify-center items-center w-full  rounded-lg shadow-md border border-[#c5c4c4] bg-white">
                  <Requests data={currentPageData} offset={offset} />
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
  );
};

export default PrivateRoutes(RequestList);
