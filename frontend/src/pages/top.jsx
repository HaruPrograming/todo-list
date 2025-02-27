import React, { useState } from 'react';
import { TodoFormat } from "../components/todo-format";
import { TodoListFormat } from "../components/todo-list-format";

export const Top = () => {
  
  return (
    <>
      <div className="mt-6 mx-auto w-80 h-80 bg-slate-500"></div>
      <div className="mx-auto mb-5">
        <div className="flex justify-end">
          <button className="haru-btn haru-btn-color">絞り込み</button>
          <button className="haru-btn haru-btn-color">追加</button>
        </div>
        <TodoListFormat />
        <TodoFormat />
      </div>
    </>
  );
};