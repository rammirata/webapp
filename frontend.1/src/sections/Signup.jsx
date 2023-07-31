import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Info } from "../components/index";
import toast from "react-hot-toast";
import axios from "axios";

import { BsFillPersonFill } from "react-icons/bs";
import {
  AiFillLock,
  AiFillInfoCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Error from "../components/Error";

const Register = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleHide = () => {
    console.log("clicked");
    setIsHidden(!isHidden);
  };

  const handleHide2 = () => {
    console.log("clicked");
    setIsHidden2(!isHidden2);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const fields = [
    { name: name, message: "Please enter your name", valid: name !== "" },
    {
      name: email,
      message: "Please enter your email",
      valid: validateEmail(email),
    },
    {
      name: password,
      message: "Please enter your password",
      valid: password !== "",
    },
    {
      name: password2,
      message: "Please confirm your password",
      valid: password2 !== "",
    },
    {
      name: password2,
      message: "Passwords don't match",
      valid: password2 === password,
    },
  ];

  const handleRegister = () => {
    if (name === "") {
      setIsLogged(true);
    }
    if (fields[0].valid) {
      setIsLogged(false);
    }
    if (!fields[1].valid) {
      setEmailError(true);
    }
    if (!fields[2].valid) {
      setPasswordError(true);
    }
    if (!fields[3].valid) {
      setPasswordMatchError(true);
    }
    for (let field of fields) {
      if (!field.valid) {
        toast.error(field.message);
        return;
      }
    }
    console.log("sending data: ", name, email, password);
    const register = async () => {
      const response = await axios.post(
        "https://api.blockway.tech/user/createAccount",
        {
          fullName: name,
          email: email,
          password: password,
          confirmPassword: password2,
        }
      );
      return response.data;
    };

    toast.promise(register(), {
      loading: "Creating account...",
      success: (data) => {
        return data?.status_message || "Account created successfully!";
      },
      error: (err) => {
        // setIsLogged(true);
        if (err.code === "auth/email-already-in-use" || err.code === 400) {
          setEmailError(true);
        }
        if (err.code === "auth/weak-password" || err.code === 400) {
          setPasswordError(true);
        }
        const errorMessage = err?.response?.data?.status_message || err.message;
        return `Failed to create account: ${errorMessage}`;
      },
    });
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const labelClass = name
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  const labelClass2 = password
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  const labelClass3 = email
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  const labelClass4 = password2
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  return (
    <div className="w-full h-[100vh] flex justify-between flex-row items-center main">
      <div className=" flex flex-col w-1/2 h-full justify-center items-center">
        <div
          className={`flex flex-col max-w-[600px] h-[650px] lg:h-auto justify-center items-center p-8 pt-16 pb-24 lg:pt-14 2xl:pt-16 lg:px-16  2xl:pb-24 ${
            !isLogged
              ? "lg:scale-[1] lg:pb-[6.25rem]"
              : "lg:scale-[0.95] lg:pb-16"
          } 2xl:scale-[1] border border-transparent rounded-lg formBackground`}
        >
          <form>
            <div className="flex flex-col">
              <h1 className="text-[30px] font-[700] text-white text-left">
                Sign up to get started
              </h1>
              <p className="text-[20px] font-[400] text-white mt-4">
                Enter your details to create your Blockway account.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-8">
              <div className="relative mb-6 w-full" data-te-input-wrapper-init>
                <BsFillPersonFill
                  className={`absolute top-3.5 left-3 ${
                    isLogged ? "text-[#FF1A19]" : "text-[#a2ff93]"
                  }`}
                />
                <input
                  type="text"
                  value={name}
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
                  Your full name
                </label>
                <Error
                  error={isLogged}
                  text={"Sorry, we couldn't process your account, try later"}
                />
              </div>
              <div className="relative mb-6 w-full" data-te-input-wrapper-init>
                <MdEmail
                  className={`absolute top-3.5 left-3 ${
                    !emailError ? "text-[#a2ff93]" : "text-[#ff1a19]"
                  }`}
                />
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  className={`${
                    emailError ? "border-red-500" : "border-gray-200"
                  }
                  } border peer block min-h-[auto] w-full rounded  bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 focus:border-[#A2FF93] z-1 text-white pl-9`}
                  id="exampleFormControlInput3"
                />
                <label
                  htmlFor="exampleFormControlInput3"
                  className={`pointer-events-none absolute top-1 left-3 mb-0 max-w-[90%] origin-[0_0] px-1 truncate  leading-[2.15] ${labelClass3} bg-[#170261] transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    !emailError ? "text-white" : "text-[#ff1a19]"
                  }
                  dark:peer-focus:text-white z-2 ml-6`}
                >
                  Email
                </label>
                <Error
                  error={emailError}
                  text={"Your email could not be processed"}
                />
              </div>
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
                  className={`${labelClass2} bg-[#170261] pointer-events-none absolute top-1 left-3 mb-0 max-w-[90%] origin-[0_0] truncate px-1 leading-[2.15]  transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    !passwordError ? "text-white" : "text-[#ff1a19]"
                  } dark:peer-focus:text-white z-2 ml-6`}
                >
                  Password
                </label>
                <Error error={passwordError} text={fields[2].message} />
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
                  className={` ${labelClass4} bg-[#170261] pointer-events-none absolute top-1 left-3 mb-0 max-w-[90%] origin-[0_0] truncate px-1 leading-[2.15]  transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    !passwordMatchError ? "text-white" : "text-[#ff1a19]"
                  } dark:peer-focus:text-white z-2 ml-6`}
                >
                  Confirm Password
                </label>
                <Error error={passwordMatchError} text={fields[3].message} />
              </div>
              <div className="flex justify-between items-center w-full ">
                <div className="flex flex-row justify-center items-center">
                  <div className="flex flex-row gap-5 py-2 px-2">
                    <div className="check-box relative w-5 h-5">
                      <input
                        type="checkbox"
                        id="id"
                        name="name"
                        className="hidden"
                      />
                      <label
                        htmlFor="id"
                        className="w-5 h-5 absolute rounded top-0 bg-transparent cursor-pointer border-2 border-[#a2ff93]"
                      ></label>
                    </div>
                  </div>

                  <p className="text-[15px] font-[400] text-white">
                    I agree with the Terms an conditions and Privacy policy of
                    the Blockway and I accept them
                  </p>
                </div>
              </div>
              <div
                className=" border border-green-500 flex mt-4 bg-gradient-to-r from-mint-green-500 to-mint-green-200
                  w-full rounded-3xl active:scale-[0.99] transition delay-25"
              >
                <button
                  className="flex flex-row justify-center items-center w-full h-full text-[16px] text-black p-2 font-bold "
                  type="button"
                  onClick={handleRegister}
                >
                  Sign up
                </button>
              </div>
              <div className="flex flex-row justify-start items-center mt-4 w-full">
                <div>
                  <p className="text-[20px] font-[400] text-white">
                    Already have an account?
                  </p>
                </div>
                <div>
                  <Link to="/">
                    <span className="text-[20px] font-[300] text-[#a2ff93] cursor-pointer ml-1 underline">
                      Sign in
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

export default Register;
