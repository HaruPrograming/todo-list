import { createContext, useContext, useState } from "react";

export const todoDataContext = createContext("");
export const usetodoDataContext = () => {
  return useContext(todoDataContext);
};

export const TodoDataContextProvider = ({ children }) => {
  const [dbTodoList, setDbTodoList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const contextValue = {
    dbTodoList,
    setDbTodoList,
    groupList,
    setGroupList,
  };

  return (
    <todoDataContext.Provider value={contextValue}>
      {children}
    </todoDataContext.Provider>
  );
};

