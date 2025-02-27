import React, { useState, useRef, useEffect } from "react";

export const TodoFormat = () => {
  const [todoInfoCheck, setTodoInfoCheck] = useState(false);
  const [todoInfoAllow, setTodoInfoAllow] = useState("＞");
  const [commentValue, setCommentValue] = useState("");
  const commentRef = useRef("");
  const commentNewLine = useRef(0);
  const commentTextRows = useRef(1);

  const changeCheckBox = () => {};

  const showTodoInfo = () => {
    setTodoInfoCheck(!todoInfoCheck);
    setTodoInfoAllow(todoInfoCheck ? "＞" : "ｖ");
  };

  const commentChange = (event) => {
    setCommentValue(event.target.value);
    commentTextRows.current = textRows(event.target.value);
  };

  const textRows = (comment) => {
    if (commentRef.current) {
      commentNewLine.current = comment.match(/\r\n|\n/g)
        ? comment.match(/\r\n|\n/g).length
        : 0;
      return (
        Math.ceil(
          Math.round(comment.length) /
            Math.round(commentRef.current.clientWidth / 16)
        ) + commentNewLine.current
      );
    } else {
      return 1;
    }
  };

  return (
    <div className="haru-todo-list haru-todo-list-blue-color">
      <div className="flex items-center">
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
        <div className=" bg-slate-200 pb-1">
          <table>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>日付</th>
                <th>重要度</th>
                <th>グループ</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" value={"課題を終わらす"} />
                </td>
                <td>
                  <input type="text" value={"2024/02/12 12:00"} />
                </td>
                <td>
                  <input type="text" value={"中"} />
                </td>
                <td>
                  <input type="text" value={"Todoりすと"} />
                </td>
                <td className="">
                  {/* <input type="text" value={"課題終わらす"}></input> */}
                  <div>
                    <textarea
                      name=""
                      id=""
                      ref={commentRef}
                      rows={commentTextRows.current}
                      className="mt-2"
                      onChange={commentChange}
                      // value={"課題終わらす"}
                      defaultValue={commentValue != "" ? commentValue : ""}
                    ></textarea>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="flex justify-between">
            <button className="haru-btn block px-1 py-1 mt-2 ml-2 bg-red-200">
              キャンセル
            </button>
            <button className="haru-btn block px-1 py-1 mt-2 mr-2 bg-blue-200">
              保存
            </button>
          </div> */}
          <button className="haru-btn block px-1 py-1 mt-2 ml-auto mr-2 bg-blue-200">
            保存
          </button>
        </div>
      )}
    </div>
  );
};
