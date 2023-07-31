import React, { useState } from "react";
import { Info, Error } from "../components/index";

import { AiFillLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleReset = () => {
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (password2 === "") {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
    if (password !== password2) {
      setPasswordMatchError(true);
      setPasswordError(false);
    } else {
      setPasswordMatchError(false);
      setPasswordError(false);
      toast.success("Password reset successfully");
    }
  };

  const handleHide = () => {
    console.log("clicked");
    setIsHidden(!isHidden);
  };

  const handleHide2 = () => {
    console.log("clicked");
    setIsHidden2(!isHidden2);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const labelClass = password
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  const labelClass2 = password2
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  return (
    <div className="w-full h-[100vh] flex justify-between flex-row items-center main">
      <div className=" flex flex-col w-1/2 h-full justify-center items-center">
        <div className="flex flex-col max-w-[525px] justify-center items-center p-8 pb-64 lg:pt-16 lg:px-16 lg:pb-64 border border-transparent rounded-lg formBackground">
          <form>
            <div className="flex flex-col">
              <h1 className="text-[30px] font-[700] text-white text-left">
                Reset password
              </h1>
              <p className="text-[20px] font-[400] text-white mt-4">
                Your new password must be different from previously used
                passwords.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-8">
              <div className="relative mb-6 w-full" data-te-input-wrapper-init>
                <AiFillLock
                  className={`absolute top-3.5 left-3 ${
                    !passwordError ? "text-[#a2ff93]" : "text-[#ff1a19]"
                  }`}
                />
                <div onClick={() => handleHide}>
                  {isHidden ? (
                    <button
                      type="button"
                      className="absolute top-3.5 right-3 text-[#a2ff93] cursor-pointer"
                      onClick={handleHide}
                    >
                      <AiFillEye />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="absolute top-3.5 right-3 text-[#a2ff93] cursor-pointer"
                      onClick={handleHide}
                    >
                      <AiFillEyeInvisible />
                    </button>
                  )}
                </div>
                <input
                  type={`${isHidden ? "password" : "text"}`}
                  className={`border ${
                    !passwordError ? "border-gray-200" : "border-red-500"
                  } peer block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 focus:border-[#A2FF93] z-1 pl-9 text-[#a2ff93]`}
                  id="exampleFormControlInput33"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label
                  htmlFor="exampleFormControlInput33"
                  className={` ${labelClass} bg-[#170261] pointer-events-none absolute top-1 left-3 mb-0 max-w-[90%] origin-[0_0] truncate px-1 leading-[2.15]  transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    !passwordError ? "text-white" : "text-[#ff1a19]"
                  } dark:peer-focus:text-white z-2 ml-6`}
                >
                  Password
                </label>
                <Error error={passwordError} text={"Enter your password"} />
              </div>
              <div className="relative mb-6 w-full" data-te-input-wrapper-init>
                <AiFillLock
                  className={`absolute top-3.5 left-3 ${
                    !passwordMatchError ? "text-[#a2ff93]" : "text-[#ff1a19]"
                  }`}
                />
                <div onClick={() => handleHide2}>
                  {isHidden2 ? (
                    <button
                      type="button"
                      className="absolute top-3.5 right-3 text-[#a2ff93] cursor-pointer"
                      onClick={handleHide2}
                    >
                      <AiFillEye />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="absolute top-3.5 right-3 text-[#a2ff93] cursor-pointer"
                      onClick={handleHide2}
                    >
                      <AiFillEyeInvisible />
                    </button>
                  )}
                </div>
                <input
                  type={`${isHidden2 ? "password" : "text"}`}
                  className={`border ${
                    !passwordMatchError ? "border-gray-200" : "border-red-500"
                  } peer block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 focus:border-[#A2FF93] z-1 pl-9 text-[#a2ff93]`}
                  id="exampleFormControlInput33"
                  placeholder="Password"
                  value={password2}
                  onChange={handlePassword2Change}
                />
                <label
                  htmlFor="exampleFormControlInput33"
                  className={` ${labelClass2} bg-[#170261] pointer-events-none absolute top-1 left-3 mb-0 max-w-[90%] origin-[0_0] truncate px-1 leading-[2.15]  transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    !passwordMatchError ? "text-white" : "text-[#ff1a19]"
                  } dark:peer-focus:text-white z-2 ml-6`}
                >
                  Confirm Password
                </label>
                <Error
                  error={passwordMatchError}
                  text={"Passwords don't match"}
                />
              </div>
              <div
                className=" border border-green-500 flex mt-4 bg-gradient-to-r from-mint-green-500 to-mint-green-200
                  w-full rounded-3xl active:scale-[0.99] transition delay-25"
              >
                <button
                  className="flex flex-row justify-center items-center w-full h-full text-[16px] text-black p-2 font-bold "
                  type="button"
                  onClick={() => handleReset()}
                >
                  Reset password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Info />
    </div>
  );
};

export default ResetPassword;
