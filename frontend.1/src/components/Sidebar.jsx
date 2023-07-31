import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = ({ activeTab, variant }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const minimize = () => {
    setIsMinimized(!isMinimized);
  };

  const active =
    "flex justify-center items-center gap-2.5 p-4 border-l-8 rounded-l-lg border-mint-green-500 light-violet text-mint-green-500 py-5";
  const inactive =
    "flex justify-center items-center gap-2.5 p-4 border-l-8 border-transparent rounded-l-lg py-5";
  return (
    <div
      className={`${variant === "main" ? "sidebar" : "long-sidebar"} flex-col ${
        !isMinimized ? "w-[320px]" : "w-[195px]"
      } min-h-screen sticky top-0 bottom-0 left-0 transition-all duration-[600ms] ease-in-out`}
    >
      <div className="mt-6 p-4 text-white flex justify-end items-center cursor-pointer">
        <div className="flex justify-center items-center gap-2.5">
          {isMinimized ? (
            <img src="/logo_min.png" alt="logo" className="w-[41px]" />
          ) : (
            <img src="/logo.png" alt="logo" className="w-[155px] h-[50px]" />
          )}

          <GiHamburgerMenu className="text-2xl text-white" onClick={minimize} />
        </div>
      </div>
      <Link
        to="/home"
        className="p-4 text-white flex justify-end items-center cursor-pointer"
      >
        <div className={`${activeTab === "home" ? active : inactive} mr-4`}>
          <div className="flex justify-start items-center gap-2.5">
            <img
              src={`${
                activeTab === "home"
                  ? "/sidebar_vector.png"
                  : "/inactive_sidebar_vector.png"
              }`}
              alt="logo"
              className="w-[20px]"
            />
            {!isMinimized && <span className="text-lg pr-16">Home</span>}
          </div>
        </div>
      </Link>
      <Link
        to="/request-list"
        className="p-4 text-white flex justify-end items-center cursor-pointer"
      >
        <div className={`${activeTab === "request-list" ? active : inactive}`}>
          <img
            src="/document_icon.png"
            alt="logo"
            className={`w-[20px] ${isMinimized ? "mr-[0.85rem]" : ""}`}
          />
          {!isMinimized && <span className="text-lg pr-3">Your Requests</span>}
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
