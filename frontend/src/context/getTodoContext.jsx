import { createContext, useContext, useState } from "react";

export const getTodoContext = createContext("");
export const usegetTodoContext = () => {
  return useContext(getTodoContext);
};

export const GetTodoContextProvider = ({ children }) => {
  const [getTodoCheck, setGetTodoCheck] = useState(false);
  const [getTodoGroupCheck, setGetTodoGroupCheck] = useState(false);

  const contextValue = {
    getTodoCheck,
    setGetTodoCheck,
    getTodoGroupCheck,
    setGetTodoGroupCheck,
  };

  return (
    <getTodoContext.Provider value={contextValue}>
      {children}
    </getTodoContext.Provider>
  );
};
