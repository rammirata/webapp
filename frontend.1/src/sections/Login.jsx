import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Info } from "../components/index";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

import { BsFillPersonFill } from "react-icons/bs";
import {
  AiFillLock,
  AiFillInfoCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";

import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error } from "../components/index";

const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useUser();
  const [isLogged, setIsLogged] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const handleHide = () => {
    console.log("clicked");
    setIsHidden(!isHidden);
  };

  const fields = [
    {
      name: email,
      message: "Please enter your email",
      valid: email !== "",
    },
    {
      name: password,
      message: "Please enter your password",
      valid: password !== "",
    },
  ];

  const handleLogin = async () => {
    for (let field of fields) {
      if (!field.valid) {
        setIsLogged(true);
        toast.error(field.message);
        return;
      }
    }
    setIsLogged(false);

    const signIn = async () => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("FIREBASE REPONSE -->", userCredential.user.accessToken);
      setAccessToken(userCredential.user.accessToken);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      navigate("/home");
      return userCredential.user;
    };

    toast.promise(signIn(), {
      loading: "Signing in...",
      success: () => {
        return "Logged in successfully!";
      },
      error: (err) => {
        console.log(err.code);
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-email"
        ) {
          setIsLogged(true);
        }
        if (err.code === "auth/wrong-password") {
          setPasswordError(true);
        }
        return `Failed to log in: ${err.code}`;
      },
    });
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const labelClass = email
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  const labelClass2 = password
    ? "-translate-y-[1.15rem] scale-[0.8] bg-[#170261]"
    : "";

  return (
    <div className="w-full h-[100vh] flex justify-between flex-row items-center main">
      <div className=" flex flex-col w-1/2 h-full justify-center items-center">
        <div className="flex flex-col max-w-[600px] justify-center items-center p-8 pb-32 lg:pt-16 lg:px-16 lg:pb-[14.5rem] 2xl:pb-64 border border-transparent rounded-lg formBackground">
          <form>
            <div className="flex flex-col">
              <h1 className="text-[30px] font-[700] text-white text-left">
                Sign in
              </h1>
              <p className="text-[20px] font-[400] text-white mt-4">
                If you are already a part of the Blockway family, Please enter
                your details.
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
                  type="email"
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
                  Your email
                </label>
                <Error
                  error={isLogged}
                  text={
                    "Sorry, we couldn't validate your email, please try again"
                  }
                />
              </div>
              <div className="relative mb-6 w-full" data-te-input-wrapper-init>
                <AiFillLock
                  className={`absolute top-3.5 left-3 ${
                    passwordError ? "text-[#FF1A19]" : "text-[#a2ff93]"
                  } `}
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
                    passwordError ? "border-red-500" : "border-gray-200"
                  } peer block min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 focus:border-[#A2FF93] z-1 pl-9 
                   text-[#a2ff93]`}
                  id="exampleFormControlInput33"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label
                  htmlFor="exampleFormControlInput33"
                  className={` ${labelClass2} bg-[#170261] pointer-events-none absolute top-1 left-3 mb-0 max-w-[90%] origin-[0_0] truncate px-1 leading-[2.15]  transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none ${
                    passwordError ? "text-red-500" : "text-white"
                  }  dark:peer-focus:text-white z-2 ml-6`}
                >
                  Password
                </label>
                <Error
                  error={passwordError}
                  text={
                    "Sorry, we couldn't validate your password, please try again"
                  }
                />
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

                  <p className="text-[16px] font-[400] text-white">
                    Remember me
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Link to="/forgot-password">
                    <span className="text-[16px] font-[300] text-[#a2ff93] mr-2 cursor-pointer">
                      Forgot your password?
                    </span>
                  </Link>
                </div>
              </div>
              <div
                className=" border border-green-500 flex mt-4 bg-gradient-to-r from-mint-green-500 to-mint-green-200
                  w-full rounded-3xl active:scale-[0.99] transition delay-25"
              >
                <button
                  className="flex flex-row justify-center items-center w-full h-full text-[16px] text-black p-2 font-bold "
                  type="button"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
              <div className="flex flex-row justify-start items-center mt-4 w-full">
                <div>
                  <p className="text-[20px] font-[400] text-white">
                    Don't have an account yet?
                  </p>
                </div>
                <div>
                  <Link to="/signup">
                    <span className="text-[20px] font-[300] text-[#a2ff93] cursor-pointer ml-1 underline">
                      Create an account
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

export default Login;
