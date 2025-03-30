import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Top } from "./pages/top";
import { Login } from "./pages/login";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/top" element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
};
