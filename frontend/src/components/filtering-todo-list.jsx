// import { useEffect, useState } from "react";
// import { usetodoDataContext } from "../context/todoDataContext";

export const FilteringTodoList = ({
  filteringAsc,
  filteringDesc,
  filteringAscCheck,
  filteringDescCheck,
  filterEndTodoShow,
  filterGroupShow,
  filterEndShowCheck,
  filterGroupCheck,
  filteringCheck,
  showfFltering,
}) => {
  return (
    <>
      {filteringCheck && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-3 w-60 rounded-md bg-blue-200">
          <div className="flex">
            <p>日付</p>
            <button
              className={
                filteringAscCheck
                  ? "ml-2 border border-solid border-blue-500"
                  : "ml-2"
              }
              onClick={() => filteringAsc()}
            >
              昇順
            </button>
            <button
              className={
                filteringDescCheck
                  ? "ml-2 border border-solid border-blue-500"
                  : "ml-2"
              }
              onClick={() => filteringDesc()}
            >
              降順
            </button>
            <button
              className="flex items-start ml-auto"
              onClick={() => showfFltering()}
            >
              ✖
            </button>
          </div>
          <div className="flex" onClick={(event) => filterEndTodoShow(event)}>
            <input
              id="showEndCheck"
              type="checkbox"
              className="w-fit mr-2"
              defaultChecked={filterEndShowCheck}
            />
            <label htmlFor="showEndCheck">実行済みを非表示</label>
          </div>
          <div className="flex" onClick={(event) => filterGroupShow(event)}>
            <input
              id="showGroupCheck"
              type="checkbox"
              className="w-fit mr-2"
              defaultChecked={filterGroupCheck}
            />
            <label htmlFor="showGroupCheck">グループを非表示</label>
          </div>
        </div>
      )}
    </>
  );
};