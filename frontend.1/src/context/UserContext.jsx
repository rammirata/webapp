import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    return storedAccessToken ? storedAccessToken : null;
  });

  function updateAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
  }

  return (
    <UserContext.Provider
      value={{ accessToken, setAccessToken: updateAccessToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
