import React, { useEffect, useState } from "react";
import { usetodoDataContext } from "../context/todoDataContext";
import { useShowTodoContext } from "../context/showTodoContext";
import { TodoFormat } from "./todo-format";
import { TodoHooks } from "../hooks/todo-list-hooks";

export const TodoListFormat = ({ group }) => {
  const { dbTodoList } = usetodoDataContext();
  const { deleteTodoGroup } = TodoHooks();
  const { todoListInfoCheck, setTodoListInfoCheck, setTodoInfoCheck } = useShowTodoContext();
  const [todoListInfoAllow, setTodoListInfoAllow] = useState("＞");
  const [todoListExistCheck, setTodoListExistCheck] = useState(false);
  // const showTodoListInfo = () => {
  //   setTodoListInfoCheck(!todoListInfoCheck);
  //   setTodoListInfoAllow(todoListInfoCheck ? "＞" : "ｖ");
  // };
  useEffect(() => {
    if (todoListInfoCheck != group.id) {
      setTodoListInfoAllow("＞");
    } else {
      setTodoListInfoAllow("ｖ");
    }
  }, [todoListInfoCheck]);

  const changeCheckBox = () => {};

  const showTodoListInfo = () => {
    if (todoListInfoCheck != group.id) {
      setTodoListInfoCheck(group.id);
      setTodoListExistCheck(false);
      setTodoInfoCheck(-1);
    } else {
      setTodoListInfoCheck(-1);
    }
  };

  return (
    <div className="haru-todo-list-block haru-todo-list-block-color">
      <div
        className="flex justify-between items-center mr-2"
        onClick={() => {
          showTodoListInfo();
        }}
      >
        <p className="haru-todo-list-font flex items-center ml-2">
          {group.title}
          <span>
            {todoListInfoCheck == group.id && !todoListExistCheck && (
              <button
                className="haru-btn haru-delete-btn-color m-0 ml-2 text-base font-normal text-black"
                onClick={() => deleteTodoGroup(group.id)}
              >
                削除
              </button>
            )}
          </span>
          <span className="haru-todo-list-date"></span>
        </p>
        <div>{todoListInfoAllow}</div>
      </div>
      {todoListInfoCheck == group.id &&
        dbTodoList.map(
          (todo) =>
            todo.group_id == group.id &&
            (!todoListExistCheck && setTodoListExistCheck(true),
            (<TodoFormat key={todo.id} todo={todo} />))
        )}
    </div>
  );
};