import axios from 'axios'; 
import { useCallback, useEffect, useRef, useState } from 'react';
import { useShowTodoContext } from '../context/showTodoContext';
import { usegetTodoContext } from '../context/getTodoContext';
import { useCookies } from 'react-cookie';
import { useUserInfoContext } from '../context/userInfoContext';

export const TodoHooks = () => {
  const { setTodoAddCheck, setTodoInfoCheck } = useShowTodoContext();
  const {
    getTodoCheck,
    setGetTodoCheck,
    getTodoGroupCheck,
    setGetTodoGroupCheck,
  } = usegetTodoContext();
  const [cookies, setCookie, removeCookie] = useCookies([""]);
  // const todoLength = useRef(0);
  // const [todoLength, setTodolength] = useState(0);

  // getCookeisToken
  const getCookeisToken = () => {
    axios
      .get("http://localhost:8000/csrf-token", { withCredentials: true })
      .then((response) => {
        setCookie("X-CSRF-TOKEN", response.data.csrf_token);
        console.log("X-CSRF-TOKEN", response.data);
      })
      .catch((error) =>
        console.error("CSRFトークン取得エラー:", error.response.data.message)
      );
  };

  // getTodosLastId
  const getTodosLastId = () => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = axios
        .get("http://localhost:8000/api/getTodosLastId")
        .then((res) => {
          console.log("getTodosLastId成功:", res.data);
          return res.data.todosLastId + 1;
        });
      return response;
    } catch (error) {
      console.error("getTodosLastIdエラー:", error);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // getTodoGroupsLastId
  const getTodoGroupsLastId = () => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = axios
        .get("http://localhost:8000/api/getTodoGroupsLastId")
        .then((res) => {
          console.log("getTodoGroupsLastId成功:", res.data);
          return res.data.groupsLastId + 1;
        });
      return response;
    } catch (error) {
      console.error("getTodoGroupsLastIdエラー:", error);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // getTodoImagesLastId
  const getTodoImagesLastId = () => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = axios
        .get("http://localhost:8000/api/getTodoImagesLastId")
        .then((res) => {
          console.log("getTodoImagesLastId成功:", res.data);
          return res.data.imagesLastId + 1;
        });
      return response;
    } catch (error) {
      console.error("getTodoImagesLastIdエラー:", error);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // showTodo
  const showTodo = (uid) => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = axios
        .get(`http://localhost:8000/api/showTodo/${uid}`)
        .then((res) => {
          console.log("showTodo成功:", res.data);
          return res.data;
        });
      return response;
    } catch (error) {
      console.error("showTodoエラー:", error.response.data);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // showTodoGroup
  const showTodoGroup = (uid) => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = axios
        .get(`http://localhost:8000/api/showTodoGroup/${uid}`)
        .then((res) => {
          console.log("showTodoGroup成功:", res.data);
          return res.data;
        });
      return response;
    } catch (error) {
      console.error("showTodoGroupエラー:", error.response.data);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // showTodoImage
  const showTodoImage = (uid) => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = axios
        .get(`http://localhost:8000/api/showTodoImage/${uid}`)
        .then((res) => {
          console.log("showTodoImage成功:", res.data);
          return res.data;
        });
      return response;
    } catch (error) {
      console.error("showTodoImageエラー:", error);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // addTodo
  const addTodo = (todoData) => {
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
      const response = getTodosLastId().then((res) => {
        todoData.id = res;
        const addResponse = axios
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
        return addResponse;
      });
      response.then((res) => console.log("addTodo成功:", res));
      return response;
    } catch (error) {
      console.error("addTodoエラー:", error.response.data.message);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // addTodoGroup
  const addTodoGroup = (groupTitle, uid) => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = getTodoGroupsLastId().then((res) => {
        const groupId = res;
        const groupData = {
          id: groupId,
          user_id: uid,
          title: groupTitle,
        };
        const addGroupResponse = axios
          .post("http://localhost:8000/api/addTodoGroup", groupData, {
            headers: {
              "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
            },
            withCredentials: true,
          })
          .then((res) => {
            console.log("addTodoGroup成功:", res);
            setTodoAddCheck(false);
            setGetTodoGroupCheck(!getTodoGroupCheck);
            return groupId;
          });
        return addGroupResponse;
      });
      return response;
    } catch (error) {
      console.error("addTodoGroupエラー:", error);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // addTodoImage
  const addTodoImage = (todoId, imagePath, uid) => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = getTodoImagesLastId().then((res) => {
        const imageId = res;
        const imageData = new FormData();
        imageData.append("id", imageId);
        imageData.append("user_id", uid);
        imageData.append("todo_id", todoId);
        imageData.append("todo_image", imagePath);
        // const imageData = {
        //   id: imageId,
        //   todo_image: imagePath,
        // };
        const addImageResponse = axios
          .post("http://localhost:8000/api/addTodoImage", imageData, {
            headers: {
              "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
            },
            withCredentials: true,
          })
          .then((res) => {
            console.log("addTodoImage成功:", res);
            return res.data.todoImage;
          });
        return addImageResponse;
      });
      return response;
    } catch (error) {
      console.error("addTodoGroupエラー:", error.response.data);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // deleteTodo
  const deleteTodo = async (todoId, todoImageIdList) => {
    console.log("todoImageIdList", todoImageIdList);
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      todoImageIdList?.forEach((imageId) => {
        deleteTodoImage(imageId);
      });
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
      console.error("deleteTodoエラー:", error.response.data);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // deleteTodoGroup
  const deleteTodoGroup = async (todoGroupId, todoList, todoImageIdList) => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      todoList.forEach((todo) => {
        console.log("todoImageIdList", todoImageIdList);
        deleteTodo(todo.id, todoImageIdList);
      });
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
          setGetTodoGroupCheck(!getTodoGroupCheck);
          return res;
        });
      console.log("deleteTodoGroup成功:", response);
      return response;
    } catch (error) {
      console.error("deleteTodoGroupエラー:", error.response.data);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // deleteTodoImage
  const deleteTodoImage = async (todoImageId) => {
    try {
      if (!cookies["X-CSRF-TOKEN"]) {
        getCookeisToken();
      }
      const response = await axios
        .post(
          "http://localhost:8000/api/deleteTodoImage",
          { id: todoImageId },
          {
            headers: {
              "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          return res.data;
        });
      console.log("deleteTodoImage成功:", response);
      return response;
    } catch (error) {
      console.error("deleteTodoImageエラー:", error.response.data);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
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
    try {
      const response = await axios
        .post("http://localhost:8000/api/editTodoCheckBox", todoCheckData, {
          headers: {
            "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
          },
          withCredentials: true,
        })
        .then((res) => {
          setGetTodoCheck(!getTodoCheck);
          console.log(todoCheckData, !getTodoCheck)
          return res.data;
        });
      console.log("editTodoCheckBox成功:", response);
      return response;
    } catch (error) {
      console.error("editTodoCheckBoxエラー:", error);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  // editTodoImage
  const editTodoImage = async (todoImageData) => {
    try {
      const response = await axios
        .post("http://localhost:8000/api/editTodoImage", todoImageData, {
          headers: {
            "X-CSRF-TOKEN": cookies["X-CSRF-TOKEN"],
          },
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
      console.log("editTodoImage成功:", response);
      return response;
    } catch (error) {
      console.error("editTodoImageエラー:", error);
      if (error.status == 419) {
        setCookie("X-CSRF-TOKEN", "");
        getCookeisToken();
      }
      return error.response.data;
    }
  };

  return {
    showTodo,
    showTodoGroup,
    showTodoImage,
    addTodo,
    addTodoGroup,
    addTodoImage,
    deleteTodo,
    deleteTodoGroup,
    deleteTodoImage,
    editTodo,
    editTodoCheckBox,
    editTodoImage,
  };
};