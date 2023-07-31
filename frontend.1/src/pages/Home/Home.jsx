import React from "react";
import {
  Sidebar,
  Header,
  AddressInterface,
  RequestInterface,
  PrivateRoutes,
} from "../../components/index";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const localUserString = localStorage.getItem("user");
    const localUser = JSON.parse(localUserString);
    setUser(localUser);
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar activeTab="home" variant={"main"} />
      <div className="flex bg-[#eee] w-full justify-center">
        <div className="w-full flex flex-col items-center">
          <Header title={`Welcome ${user?.displayName}`} />
          <div className="flex-1 flex justify-center items-center w-full  max-h-full">
            <div className="flex-1 h-full max-w-[700px] 2xl:max-w-[950px]">
              <AddressInterface />
            </div>
            <div className="flex-1 h-full max-w-[488px] 2xl:max-w-[550px]">
              <RequestInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoutes(Home);
