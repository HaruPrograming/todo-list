import React, { useEffect, useRef, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { format, parse, startOfWeek, getDay, addMonths } from "date-fns";
import { ja } from "date-fns/locale";
import { useShowTodoContext } from "../context/showTodoContext";
import { TodoAdd } from "./todo-add";
import { TodoHooks } from "../hooks/todo-list-hooks";
import { usegetTodoContext } from "../context/getTodoContext";

export const TodoFormat = ({ todo }) => {
  const { todoInfoCheck, setTodoInfoCheck } = useShowTodoContext();
  const { editTodoCheckBox } = TodoHooks();
  const { getTodoCheck, setGetTodoCheck, getTodoGroupCheck } = usegetTodoContext();
  const todoCheckValue = useRef();
  const dateFormat = "yyyy-MM-dd HH:mm";

  useEffect(() => {
    const today = format(new Date(), dateFormat, { locale: ja });
    const todoStartDate = format(new Date(todo.start_date), dateFormat, { locale: ja });
    if (today > todoStartDate) {
      if (todo.check == 0 && todo.check != 3) {
        toggleTodoCheckBox(3);
      } else if (todo.check == 1) {
        toggleTodoCheckBox(4);
      }
    }
  }, []);

  const showTodoInfo = () => {
    if (todoInfoCheck != todo.id) {
      setTodoInfoCheck(todo.id);
    } else {
      setTodoInfoCheck(-1);
    }
    // setGetTodoCheck(!getTodoCheck);
  };

  const toggleTodoCheckBox = (checkValue) => {
    if (checkValue != undefined) {
      todoCheckValue.current = checkValue;
    } else if (todo.check == 0) {
      todoCheckValue.current = 1;
    } else if (todo.check == 1 || todo.check == 4) {
      todoCheckValue.current = 2;
    } else if (todo.check == 2) {
      todoCheckValue.current = 0;
    } else if (todo.check == 3) {
      todoCheckValue.current = 4;
    }
    const todoCheckData = {
      id: todo.id,
      check: todoCheckValue.current,
    };
    editTodoCheckBox(todoCheckData);
  };

  return (
    <div
      // className={
      //   todo.check == 1
      //     ? "haru-todo-list border-blue-500"
      //     : todo.check == 2
      //     ? "haru-todo-list border-gray-500 bg-slate-400"
      //     : todo.check == 3
      //     ? "haru-todo-list border-red-500"
      //     : todo.check == 4
      //     ? "haru-todo-list border-violet-500"
      //     : "haru-todo-list haru-todo-list-color"
      // }
      className={
        `${todo.priority == "高"
          ? "haru-todo-list border-red-600"
          : todo.priority == "中"
          ? "haru-todo-list border-yellow-600"
            : "haru-todo-list border-blue-600"}
        ${todo.check == 2 ? "text-gray-600 bg-gray-400" : ""}`
      }
    >
      <div className="flex">
        <Checkbox
          onClick={() => toggleTodoCheckBox()}
          checked={todo.check != 0 ? true : false}
          color={
            todo.check == 1
              ? "primary"
              : todo.check == 2
              ? "success"
              : todo.check == 3
              ? "error"
              : todo.check == 4
              ? "secondary"
              : ""
          }
        />
        <div
          className="flex items-center w-full my-1 mr-2"
          onClick={() => {
            showTodoInfo();
          }}
        >
          <label
            htmlFor="todo-list-name"
            className="haru-todo-list-font w-full"
            onClick={() => {
              showTodoInfo();
            }}
          >
            {todo.title}
            <span className="haru-todo-list-date">
              {todo.start_date} ～ {todo.end_date}
            </span>
          </label>
          <img
            src={"http://localhost:8000/storage/todo_info_allow.png"}
            className={todoInfoCheck == todo.id ? "w-5 rotate-90" : "w-5"}
          />
        </div>
      </div>
      {todoInfoCheck == todo.id && <TodoAdd add={todo} />}
    </div>
  );
};
