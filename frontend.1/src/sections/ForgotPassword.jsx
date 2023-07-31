import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Info } from "../components/index";

import { AiFillInfoCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (email === "") {
      setIsLogged(true);
      toast.error("Please enter your email");
      return;
    }
    setIsLogged(false);
    console.log("sending data:", email);

    const resetPassword = async () => {
      const response = await axios.post(
        "https://api.blockway.tech/user/resetPwd",
        {
          email: email,
        }
      );
      return response.data;
    };

    toast.promise(resetPassword(), {
      loading: "Sending reset password request...",
      success: (data) => {
        return (
          data?.status_message || "Reset password request sent successfully!"
        );
      },
      error: (err) => {
        setIsLogged(true);
        const errorMessage = err?.response?.data?.status_message || err.code;
        return `Failed to send reset password request: ${errorMessage}`;
      },
    });
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const labelClass = email
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  return (
    <div className="w-full h-[100vh] flex justify-between flex-row items-center main">
      <div className=" flex flex-col w-1/2 h-full justify-center items-center">
        <div className="flex flex-col max-w-[600px] justify-center items-center p-8 pb-64 lg:pt-16 lg:px-16 lg:pb-80 border border-transparent rounded-lg formBackground">
          <form>
            <div className="flex flex-col">
              <h1 className="text-[30px] font-[700] text-white text-left">
                Forgot password?
              </h1>
              <p className="text-[20px] font-[400] text-white mt-4">
                No worries, we'll send you reset instructions.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-8">
              <div className="relative mb-6 w-full" data-te-input-wrapper-init>
                <MdEmail
                  className={`absolute top-3.5 left-3 ${
                    isLogged ? "text-[#FF1A19]" : "text-[#a2ff93]"
                  }`}
                />
                <input
                  type="text"
                  value={email}
                  onChange={handleInputChange}
                  className={`${
                    isLogged ? "border-red-500" : "border-gray-200"
                  } border peer block min-h-[auto] w-full rounded  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 focus:border-[#A2FF93] z-1 text-white pl-9`}
                  id="exampleFormControlInput3"
                />
                <label
                  htmlFor="exampleFormControlInput3"
                  className={`pointer-events-none absolute top-1 left-3 mb-0 max-w-[90%] origin-[0_0] px-1 truncate  leading-[2.15] ${
                    isLogged ? "text-red-500" : "text-white"
                  } ${labelClass} bg-[#170261] transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    isLogged ? "dark:text-red-500" : "dark:text-white"
                  } ${
                    isLogged
                      ? "dark:peer-cous:text-red-500"
                      : "dark:peer-focus:text-white"
                  }  z-2 ml-6`}
                >
                  Enter your email
                </label>
                {isLogged && (
                  <div className="flex flex-row">
                    <AiFillInfoCircle className=" mt-3 -mb-2 text-[#FF1A19]" />
                    <p className="text-[14px] ml-2 font-[400] text-[#FF1A19] mt-2.5">
                      Sorry, we couldn't validate your email, please try again
                    </p>
                  </div>
                )}
              </div>
              <div
                className="border border-green-500 flex bg-gradient-to-r from-mint-green-500 to-mint-green-200
                  w-full rounded-3xl active:scale-[0.99] transition delay-25"
              >
                <Link
                  // to="/reset-password"
                  className="flex flex-row justify-center items-center w-full h-full text-[16px] text-black p-2 font-bold "
                >
                  <button type="button" onClick={handleReset}>
                    Reset password
                  </button>
                </Link>
              </div>
              <div className="flex flex-row justify-start items-center mt-4 w-full">
                <div>
                  <Link to="/">
                    <span className="text-[20px] font-[400] text-[#a2ff93] cursor-pointer ml-1 ">
                      <AiOutlineArrowLeft className="inline-block mr-2" />
                      Back to login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Info />
    </div>
  );
};

export default ForgotPassword;
