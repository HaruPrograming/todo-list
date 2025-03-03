import { createContext, useContext, useState } from "react";

export const showTodoContext = createContext("");
export const useShowTodoContext = () => {
  return useContext(showTodoContext);
};

export const ShowTodoContextProvider = ({ children }) => {
  const [todoAddCheck, setTodoAddCheck] = useState(false);
  const [todoInfoCheck, setTodoInfoCheck] = useState(-1);
  const [todoListInfoCheck, setTodoListInfoCheck] = useState(-1);

  const contextValue = {
    todoAddCheck,
    setTodoAddCheck,
    todoInfoCheck,
    setTodoInfoCheck,
    todoListInfoCheck,
    setTodoListInfoCheck,
  };

  return (
    <showTodoContext.Provider value={contextValue}>
      {children}
    </showTodoContext.Provider>
  );
};

