import axios from 'axios'; 
import { useEffect, useRef, useState } from 'react';
import { useShowTodoContext } from '../context/showTodoContext';
import { usegetTodoContext } from '../context/getTodoContext';
import { useCookies } from 'react-cookie';

export const TodoHooks = () => {
  const { setTodoAddCheck, setTodoInfoCheck } = useShowTodoContext();
  const {
    getTodoCheck,
    setGetTodoCheck,
    getTodoGroupCheck,
    setGetTodoGroupCheck,
  } = usegetTodoContext();
  const [cookies, setCookie, removeCookie] = useCookies([""]);

  useEffect(() => {
    getCookeisToken();
  }, []);

  const getCookeisToken = () => {
    if (cookies["X-CSRF-TOKEN"]) return;
    axios
      .get("http://localhost:8000/csrf-token", { withCredentials: true })
      .then((response) => {
        console.log(response);
        setCookie("X-CSRF-TOKEN", response.data.csrf_token);
      })
      .catch((error) => console.error("CSRFトークン取得エラー:", error));
  }

  const showTodo = () => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = axios
        .get("http://localhost:8000/api/showTodo")
        .then((res) => {
          console.log("showTodo成功:", res.data);
          return res.data;
        });
      return response;
    } catch (error) {
      console.error("showTodoエラー:", error);
      return error.response.data;
    }
  };

  const showTodoGroup = () => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = axios
        .get("http://localhost:8000/api/showTodoGroup")
        .then((res) => {
          console.log("showTodoGroup成功:", res.data);
          return res.data;
        });
      return response;
    } catch (error) {
      console.error("showTodoGroupエラー:", error);
      return error.response.data;
    }
  };

  // addTodo
  const addTodo = async (todoData) => {
    if (todoData.title == "") {
      return {
        status: "error",
        comment: "タイトルが入力されていません。",
      };
    }
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = await axios
        .post("http://localhost:8000/api/addTodo", todoData, {
          headers: {
            "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
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
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = await axios.post(
        "http://localhost:8000/api/addTodoGroup",
        { title: groupTitle },
        {
          headers: {
            "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
          },
          withCredentials: true,
        }
      );
      console.log("addTodoGroup成功:", response);
      setTodoAddCheck(false);
      setGetTodoGroupCheck(!getTodoGroupCheck);
      // setGetTodoCheck(!getTodoCheck);
      return response.data.todoGroup.id;
    } catch (error) {
      console.error("addTodoGroupエラー:", error);
      return error.response.data;
    }
  };

  // deleteTodo
  const deleteTodo = async (todoId) => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = await axios
        .post(
          "http://localhost:8000/api/deleteTodo",
          { id: todoId },
          {
            headers: {
              "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
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
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = await axios
        .post(
          "http://localhost:8000/api/deleteTodoGroup",
          { id: todoGroupId },
          {
            headers: {
              "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("deleteTodoGroup", res);
          setGetTodoGroupCheck(!getTodoGroupCheck);
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
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = await axios
        .post("http://localhost:8000/api/editTodo", todoData, {
          headers: {
            "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
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
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      console.error("editTodoエラー:", error.response.data);
      return error.response.data;
    }
  };

  // editTodoCheck
  const editTodoCheckBox = async (todoCheckData) => {
    console.log("todoCheckData", todoCheckData);
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = await axios
        .post("http://localhost:8000/api/editTodoCheckBox", todoCheckData, {
          headers: {
            "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
          },
          withCredentials: true,
        })
        .then((res) => {
          setGetTodoCheck(!getTodoCheck);
          return res.data;
        });
      console.log("editTodoCheckBox成功:", response);
      return response;
    } catch (error) {
      console.error("editTodoCheckBoxエラー:", error);
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
    editTodoCheckBox,
  };
};