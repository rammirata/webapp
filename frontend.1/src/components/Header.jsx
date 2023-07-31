import React, { useEffect, useState } from "react";
import { DropdownMenu } from "../components/index";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const localUserString = localStorage.getItem("user");
    const localUser = JSON.parse(localUserString);
    setUser(localUser);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="w-full">
      <div className="flex justify-between items-center pl-10  pr-8 xl:pr-12 2xl:pr-20 pt-8">
        <div className="flex justify-center items-center gap-2.5">
          <div className="flex flex-col justify-center items-start gap-5">
            <span className="text-[#1b0165] text-[30px] xl:text-[32px] font-bold">
              {title}
            </span>
            <span className="text-[#110d1b] whitespace-nowrap text-[18px] font-[400]">
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
              consectetur.
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2.5">
          <div className="flex justify-center items-center gap-5">
            <img
              src="/bell_icon.png"
              alt="logo"
              className="w-[20px] xl:w-[30px] cursor-pointer active:scale-[0.97] transition-all duration-25"
            />
            <img
              src="/avatar.png"
              alt="logo"
              className="w-[28px] xl:w-[38px] cursor-pointer active:scale-[0.97] transition-all duration-25"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <div className="flex justify-center items-center gap-2.5">
              <span className="text-[#110d1b] text-sm whitespace-nowrap xl:text-lg font-[700]">
                {user?.displayName}
              </span>
              <IoMdArrowDropdown
                className="cursor-pointer text-2xl text-[#110d1b]"
                onClick={toggleDropdown}
              />
              <DropdownMenu isOpen={isOpen} />
            </div>
            <span className="text-[#110d1b] text-sm font-[400]">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
