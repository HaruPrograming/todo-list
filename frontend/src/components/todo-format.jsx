import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TodoAdd } from "./todo-add";
import { useShowTodoContext } from "../context/showTodoContext";

export const TodoFormat = ({ todo }) => {
  const { todoInfoCheck, setTodoInfoCheck } = useShowTodoContext();
  const [todoInfoAllow, setTodoInfoAllow] = useState("＞");

  useEffect(() => {
    if (todoInfoCheck != todo.id) {
      setTodoInfoAllow("＞");
    } else {
      setTodoInfoAllow("ｖ");
    }
  }, [todoInfoCheck]);

  const changeCheckBox = () => {};

  const showTodoInfo = () => {
    if (todoInfoCheck != todo.id) {
      setTodoInfoCheck(todo.id);
    } else {
      setTodoInfoCheck(-1);
    }
  };


  return (
    <div className="haru-todo-list haru-todo-list-blue-color">
      <div className="flex">
        {/* <input type="checkbox" className="none w-7 h-7 " onChange={changeCheckBox} /> */}
        <Checkbox />
        {/* <FormControlLabel
          disabled
          control={<Checkbox />}
          label={
            <div>
              <p>{todo.title}</p>
              <span className="haru-todo-list-date">
                {todo.start_date} ～ {todo.end_date}
              </span>
            </div>
          }
        /> */}
        {/* <p className="ml-auto">{todoInfoAllow}</p> */}
        <div
          className="flex items-center w-full mb-2 mr-2"
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
          <p className="ml-auto">{todoInfoAllow}</p>
        </div>
      </div>
      {todoInfoCheck == todo.id && <TodoAdd add={todo} />}
    </div>
  );
};
