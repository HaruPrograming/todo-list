import { createContext, useContext, useState } from "react";

export const todoDataContext = createContext("");
export const usetodoDataContext = () => {
  return useContext(todoDataContext);
};

export const TodoDataContextProvider = ({ children }) => {
  const [dbTodoList, setDbTodoList] = useState([]);
  const [dbSouceTodoList, setSouceDbTodoList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [imageList, setImageList] = useState([]);

  const contextValue = {
    dbTodoList,
    setDbTodoList,
    dbSouceTodoList,
    setSouceDbTodoList,
    groupList,
    setGroupList,
    imageList,
    setImageList,
  };

  return (
    <todoDataContext.Provider value={contextValue}>
      {children}
    </todoDataContext.Provider>
  );
};

