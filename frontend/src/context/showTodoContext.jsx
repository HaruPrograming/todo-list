// import { useState } from "react";

// export const ShowTodoContext = () => {
//   const [todoAddCheck, setTodoAddCheck] = useState(false);

//   return {todoAddCheck, setTodoAddCheck};
// }

import { createContext, useContext, useState } from "react";

export const ShowTodoContext = createContext("");
export const useAdminAddCategoryData = () => {
  return useContext(ShowTodoContext);
};

const AdminAddCategoryDataProvider = ({ children }) => {
  const [AdminAddCategoryData, setAdminAddCategoryData] = useState("");

  const contextValue = {
    AdminAddCategoryData,
    setAdminAddCategoryData,
  };

  return (
    <ShowTodoContext.Provider value={contextValue}>
      {children}
    </ShowTodoContext.Provider>
  );
};

export default AdminAddCategoryDataProvider;
