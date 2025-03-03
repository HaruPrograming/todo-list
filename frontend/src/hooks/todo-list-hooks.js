import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { useShowTodoContext } from '../context/showTodoContext';
import { usegetTodoContext } from '../context/getTodoContext';

export const TodoHooks = () => {
  const { setTodoAddCheck, setTodoInfoCheck } = useShowTodoContext();
  const { getTodoCheck, setGetTodoCheck } = usegetTodoContext();
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    if (csrfToken) return;
    axios
      .get("http://localhost:8000/csrf-token", { withCredentials: true })
      .then((response) => setCsrfToken(response.data.csrf_token))
      .catch((error) => console.error("CSRFトークン取得エラー:", error));
  }, []);

  // useEffect(() => {
  //   if (!csrfToken || csrfToken == undefined) return;
  //   console.log("CSRFトークン:", csrfToken);
  // }, [csrfToken]);

  const showTodo = () => {
    try {
      const response = axios.get("http://localhost:8000/api/showTodo");
      response.then((res) => console.log("showTodo成功:", res));
      return response;
    } catch (error) {
      console.error("showTodoエラー:", error);
      return error.response.data;
    }
  };

  const showTodoGroup = () => {
    try {
      const response = axios.get("http://localhost:8000/api/showTodoGroup");
      response.then((res) => console.log("showTodoGroup成功:", res));
      return response;
    } catch (error) {
      console.error("showTodoGroupエラー:", error);
      return error.response.data;
    }
  };

  // addTodo
  const addTodo = async (todoData) => {
    if (todoData.title == "" || todoData.comment == "") {
      return {
        status: "error",
        comment: "タイトルもしくは内容が入力されていません。",
      };
    }
    try {
      const response = await axios
        .post("http://localhost:8000/api/addTodo", todoData, {
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        })
        .then((res) => {
          setTodoAddCheck(false);
          setGetTodoCheck(!getTodoCheck);
          return res.data;
        });
      console.log("addTodo成功:", response);
      return response;
    } catch (error) {
      console.error("addTodoエラー:", error);
      return error.response.data;
    }
  };

  // addTodoGroup
  const addTodoGroup = async (groupTitle) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addTodoGroup",
        { title: groupTitle },
        {
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      console.log("addTodoGroup成功:", response);
      setTodoAddCheck(false);
      return response.data.todoGroup.id;
    } catch (error) {
      console.error("addTodoGroupエラー:", error);
      return error.response.data;
    }
  };

  // deleteTodo
  const deleteTodo = async (todoId) => {
    try {
      const response = await axios
        .post(
          "http://localhost:8000/api/deleteTodo",
          { id: todoId },
          {
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setTodoInfoCheck(res.data.todo.id);
          setGetTodoCheck(!getTodoCheck);
          return res.data;
        });
      console.log("deleteTodo成功:", response);
      return response;
    } catch (error) {
      console.error("deleteTodoエラー:", error);
      return error.response.data;
    }
  };

  // deleteTodoGroup
  const deleteTodoGroup = async (todoGroupId) => {
    try {
      const response = await axios
        .post(
          "http://localhost:8000/api/deleteTodoGroup",
          { id: todoGroupId },
          {
            headers: {
              "X-CSRF-TOKEN": csrfToken,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("deleteTodoGroup", res);
          setGetTodoCheck(!getTodoCheck);
          // setTodoInfoCheck(res.data.todoGroup.id);
          return res;
        });
      console.log("deleteTodoGroup成功:", response);
      return response;
    } catch (error) {
      console.error("deleteTodoGroupエラー:", error);
      return error.response.data;
    }
  };

  // editTodo
  const editTodo = async (todoData) => {
    try {
      const response = await axios
        .post("http://localhost:8000/api/editTodo", todoData, {
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        })
        .then((res) => {
          setGetTodoCheck(!getTodoCheck);
          setTodoInfoCheck(false);
          return res.data;
        });
      console.log("editTodo成功:", response);
      return response;
    } catch (error) {
      console.error("editTodoエラー:", error);
      return error.response.data;
    }
  };

  return {
    showTodo,
    showTodoGroup,
    addTodo,
    addTodoGroup,
    deleteTodo,
    deleteTodoGroup,
    editTodo,
  };
};