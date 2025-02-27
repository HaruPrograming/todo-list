import React, { useState } from "react";
import { TodoFormat } from "./todo-format";

export const TodoListFormat = () => {
  const [ todoListInfoCheck, setTodoListInfoCheck ] = useState(false);
  const [ todoListInfoAllow, setTodoListInfoAllow ] = useState("＞");

  const showTodoListInfo = () => {
    setTodoListInfoCheck(!todoListInfoCheck);
    setTodoListInfoAllow(todoListInfoCheck ? "＞" : "ｖ");
  };

  return (
    <div className="haru-todo-list-block haru-todo-list-block-color">
      <div
        className="flex justify-between items-center pr-2"
        onClick={() => {
          showTodoListInfo();
        }}
      >
        <p className="haru-todo-list-font ml-2">
          Todoりすと
          <span className="haru-todo-list-date">
            2024-02-22 12:00 ～ 2024-03-20 12:00
          </span>
        </p>
        <div>{todoListInfoAllow}</div>
      </div>
      {todoListInfoCheck && <TodoFormat />}
    </div>
  )
};