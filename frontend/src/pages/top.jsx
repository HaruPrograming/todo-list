import React, { useState, useEffect } from 'react';
import { TodoFormat } from "../components/todo-format";
import { TodoListFormat } from "../components/todo-list-format";
import { TodoAdd } from "../components/todo-add";
import { TodoAddHooks } from "../hooks/todo-list-hooks";

export const Top = () => {
  const { showTodo } = TodoAddHooks();
  const [todoAddCheck, setTodoAddCheck] = useState(false);
  const [todoAddValue, setTodoAddValue] = useState("追加");
  const [dbTodoList, setDbTodoList] = useState([]);
  
  useEffect(() => {
    showTodo().then((res) => setDbTodoList(res.data));
  }, []);
  
  const showTodoAdd = () => {
    setTodoAddCheck(!todoAddCheck);
    setTodoAddValue(todoAddCheck ? "追加" : "閉じる");
  };
  
  return (
    <>
      <div className="mt-6 mx-auto w-80 h-80 bg-slate-500"></div>
      <div className="mx-auto mb-5">
        <div className="flex justify-end">
          <button className="haru-btn haru-btn-color">絞り込み</button>
          <button
            className="haru-btn haru-btn-color"
            onClick={() => showTodoAdd()}
          >
            {todoAddValue}
          </button>
        </div>
        {todoAddCheck && <TodoAdd />}
        {dbTodoList.map((todo) =>
          // console.log(todo)
          <TodoFormat todo={todo} />
        )}
        {/* <TodoListFormat />
        <TodoFormat /> */}
      </div>
    </>
  );
};