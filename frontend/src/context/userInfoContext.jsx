import { createContext, useContext, useState } from "react";

export const userInfoContext = createContext("");
export const useUserInfoContext = () => {
  return useContext(userInfoContext);
};

export const UserInfoContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");

  const contextValue = {
    userInfo,
    setUserInfo,
  };

  return (
    <userInfoContext.Provider value={contextValue}>
      {children}
    </userInfoContext.Provider>
  );
};
