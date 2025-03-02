import axios from 'axios'; 
import { useEffect, useState } from 'react';

export const TodoAddHooks = () => {
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    if (csrfToken) return;
    axios
      .get("http://localhost:8000/csrf-token", { withCredentials: true })
      .then((response) => setCsrfToken(response.data.csrf_token))
      .catch((error) => console.error("CSRFトークン取得エラー:", error));
  }, []);

  useEffect(() => {
    console.log("CSRFトークン:", csrfToken);
  }, [csrfToken]);

  const showTodo = () => {
    try {
      const response = axios.get(
        "http://localhost:8000/api/showTodo",
      );
      console.log("成功:", response.data);
      return response;
    } catch (error) {
      console.error("エラー:", error);
    }
  }

  const addTodo = async (todoData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addTodo",
        todoData,
        {
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      console.log("成功:", response.data);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  return { showTodo, addTodo };
};