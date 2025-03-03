import React, { useState, useEffect } from 'react';
import { useShowTodoContext } from '../context/showTodoContext';
import { usegetTodoContext } from '../context/getTodoContext';
import { usetodoDataContext } from '../context/todoDataContext';
import { TodoListFormat } from '../components/todo-list-format';
import { TodoFormat } from "../components/todo-format";
import { TodoAdd } from "../components/todo-add";
import { TodoHooks } from "../hooks/todo-list-hooks";

export const Top = () => {
  const { showTodo, showTodoGroup } = TodoHooks();
  const { todoAddCheck, setTodoAddCheck } = useShowTodoContext();
  const { getTodoCheck } = usegetTodoContext();
  const { dbTodoList, setDbTodoList, groupList, setGroupList } = usetodoDataContext();
  const [todoAddValue, setTodoAddValue] = useState("追加");
  
  useEffect(() => {
    setTodoAddValue(!todoAddCheck ? "追加" : "閉じる");
    showTodo().then((res) => {
      setDbTodoList(res.data);
    });
    showTodoGroup().then((res) => {
      setGroupList(res.data);
    });
  }, [getTodoCheck]);
  
  const showTodoAdd = () => {
    setTodoAddValue(todoAddCheck ? "追加" : "閉じる");
    setTodoAddCheck(!todoAddCheck);
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
        {dbTodoList == "" && !todoAddCheck && (
          <h1 className="text-center font-semibold">
            Todoリストがありません。
          </h1>
        )}
        {todoAddCheck && <TodoAdd />}
        {groupList && groupList.map((group) => 
          <TodoListFormat key={group.id} group={group} />
        )}
        {dbTodoList.map((todo) => 
          !todo.group_id && <TodoFormat key={todo.id} todo={todo} />
        )}
        {/* <TodoListFormat />
        <TodoFormat /> */}
      </div>
    </>
  );
};