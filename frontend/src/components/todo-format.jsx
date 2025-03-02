import React, { useEffect, useState } from "react";
import { TodoAdd } from "./todo-add";

export const TodoFormat = ({todo}) => {
  console.log(todo);
  const [todoInfoCheck, setTodoInfoCheck] = useState(false);
  const [todoInfoAllow, setTodoInfoAllow] = useState("＞");

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
          {todo.title}
          <span className="haru-todo-list-date">{todo.start_date} ～ {todo.end_date}</span>
        </label>
        <p className="ml-auto"> {todoInfoAllow}</p>
      </div>
      {todoInfoCheck && <TodoAdd add={todo} />}
    </div>
  );
};
