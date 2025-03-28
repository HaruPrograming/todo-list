import React, { useEffect, useState } from "react";
import { usetodoDataContext } from "../context/todoDataContext";
import { useShowTodoContext } from "../context/showTodoContext";
import { TodoFormat } from "./todo-format";
import { TodoHooks } from "../hooks/todo-list-hooks";

export const TodoListFormat = ({ group }) => {
  const { dbTodoList } = usetodoDataContext();
  const { deleteTodoGroup } = TodoHooks();
  const { todoListInfoCheck, setTodoListInfoCheck, setTodoInfoCheck } = useShowTodoContext();
  const [todoListInfoAllow, setTodoListInfoAllow] = useState(false);
  const [todoListExistCheck, setTodoListExistCheck] = useState(false);

  useEffect(() => {
    if (todoListInfoCheck != group.id) {
      setTodoListInfoAllow(false);
    } else {
      setTodoListInfoAllow(true);
    }
  }, [todoListInfoCheck]);

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
    <div className="haru-todo-list border-gray-500 bg-blue-500 bg-opacity-20">
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
                className="haru-btn py-0 haru-delete-btn-color m-0 ml-2 text-base font-normal text-black"
                onClick={() => deleteTodoGroup(group.id)}
              >
                削除
              </button>
            )}
          </span>
          <span className="haru-todo-list-date"></span>
        </p>
        <img
          src={"http://localhost:8000/storage/todo_info_allow.png"}
          className={todoListInfoAllow ? "w-5 rotate-90" : "w-5"}
        />
      </div>
      {todoListInfoCheck == group.id &&
        dbTodoList.map(
          (todo) =>
            group.id == todo.group_id &&
            (!todoListExistCheck && setTodoListExistCheck(true),
            (<TodoFormat key={todo.id} todo={todo} />))
        )}
    </div>
  );
};