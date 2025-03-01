import React, { useState } from "react";
import { TodoAdd } from "./todo-add";

export const TodoFormat = () => {
  const [ todoInfoCheck, setTodoInfoCheck ] = useState(false);
  const [ todoInfoAllow, setTodoInfoAllow ] = useState("＞");

  const changeCheckBox = () => {};

  const showTodoInfo = () => {
    setTodoInfoCheck(!todoInfoCheck);
    setTodoInfoAllow(todoInfoCheck ? "＞" : "ｖ");
  };

  return (
    <div className="haru-todo-list haru-todo-list-blue-color">
      <div className="flex items-center mb-2">
        <input type="checkbox" className="w-7 h-7" onChange={changeCheckBox} />
        <label
          htmlFor="todo-list-name"
          className="haru-todo-list-font ml-3 w-full"
          onClick={() => {
            showTodoInfo();
          }}
        >
          画面を作る
          <span className="haru-todo-list-date">2024-02-22 12:00</span>
        </label>
        <p className="ml-auto"> {todoInfoAllow}</p>
      </div>
      {todoInfoCheck && (
        <TodoAdd />
      )}
    </div>
  );
};
