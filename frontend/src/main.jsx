import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { ShowTodoContextProvider } from "./context/showTodoContext.jsx";
import { GetTodoContextProvider } from "./context/getTodoContext.jsx";
import { TodoDataContextProvider } from "./context/todoDataContext.jsx";
import { UserInfoContextProvider } from "./context/userInfoContext.jsx";
import "./styles/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShowTodoContextProvider>
      <GetTodoContextProvider>
        <TodoDataContextProvider>
          <UserInfoContextProvider>
            <App />
          </UserInfoContextProvider>
        </TodoDataContextProvider>
      </GetTodoContextProvider>
    </ShowTodoContextProvider>
  </StrictMode>
);
