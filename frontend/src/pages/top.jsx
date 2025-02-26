import React, { useState } from 'react';

export const Top = () => {

  const [ todoListInfoCheck, setTodoListInfoCheck ] = useState(false);
  const [ todoInfoCheck, setTodoInfoCheck ] = useState(false);
  const [ infoAllow, setInfoAllow ] = useState("＞");

  const changeCheckBox = () => {
    
  }

  const showTodoListInfo = () => {
    setTodoListInfoCheck(!todoListInfoCheck);
    setInfoAllow(todoListInfoCheck ? "＞" : "ｖ");
  }

  const showTodoInfo = () => {
    setTodoInfoCheck(!todoInfoCheck);
    setInfoAllow(todoInfoCheck ? "＞" : "ｖ");
  }

  return (
    <>
      {/* <h1 className="text-3xl font-bold text-center">Top Pageだよ</h1> */}
      <div className="mt-6 mx-auto w-80 h-80 bg-slate-500"></div>
      <div className='mx-auto'>
        <div className='flex justify-end'>
          <button className="haru-btn">絞り込み</button>
          <button className="haru-btn">追加</button>
        </div>
        <div className='haru-todo-list-block haru-todo-list-block-color'>
          <div className='flex justify-between items-center pr-2' onClick={() => {showTodoListInfo()}}>
            <p className='haru-todo-list-font ml-2'>Todoりすと<span className="haru-todo-list-date">2024-02-22 12:00 ～ 2024-03-20 12:00</span></p><div>{ infoAllow }</div>
          </div>
          {todoListInfoCheck && (
            <div className="haru-todo-list haru-todo-list-blue-color" onClick={() => {showTodoInfo()}}>
              <input type="checkbox" className="w-7 h-7" onChange={changeCheckBox} />
              <label htmlFor="todo-list-name" className="haru-todo-list-font ml-3">画面を作る<span className="haru-todo-list-date">2024-02-22 12:00</span></label><p className="ml-auto">＞</p>
            </div>
          )}        
        </div>
        <div className='haru-todo-list haru-todo-list-blue-color'>
          <input type="checkbox" className="w-7 h-7" onChange={changeCheckBox} />
          <label htmlFor="todo-list-name" className="haru-todo-list-font ml-3">課題やる<span className="haru-todo-list-date">2024-02-22 12:00</span></label><p className="ml-auto">＞</p>
        </div>
      </div>
    </>
  )
};