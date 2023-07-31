import React from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { IoLogOutSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";

const DropdownMenu = ({ isOpen }) => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      toast.success("Signed out successfully");
      localStorage.clear();
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative inline-block text-left z-20">
      {isOpen && (
        <div className="px-2 pb-6 pt-1 origin-top-right absolute right-4 mt-10 w-[14rem] rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex justify-start items-center gap-1 hover:bg-gray-100 px-1 rounded-lg cursor-pointer">
            <BsFillPersonFill className="text-[#222727] text-[20px]" />
            <button className="py-2 text-sm text-gray-700">Place holder</button>
          </div>
          <div
            className="py-1 flex justify-start items-center gap-1 hover:bg-gray-100 px-1 rounded-lg cursor-pointer"
            onClick={handleSignOut}
          >
            <IoLogOutSharp className="text-[#1B0165] text-[20px]" />
            <button className="py-2 text-sm text-[#1B0165]">Sign out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
