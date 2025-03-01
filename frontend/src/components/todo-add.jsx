import React, { useState, useRef, useEffect } from "react";
import {TodoAddHooks} from "../hooks/todo-add-hooks";

export const TodoAdd = () => {
  const [titleValue, setTitleValue] = useState("課題を終わらす");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupSelected, setGroupSelected] = useState("なし");
  const [groupValue, setGroupValue] = useState("");
  const [priorityValue, setPriorityValue] = useState("高");
  const [commentValue, setCommentValue] = useState("課題終わらす");
  const [codeValue, setCodeValue] = useState("<h1>hello</h1>");
  const [codeAdd, setCodeAdd] = useState(false);
  const [groupAdd, setGroupAdd] = useState(false);
  const {todoAdd} = TodoAddHooks();
  const commentRef = useRef("");
  const commentNewLine = useRef(0);
  const commentTextRows = useRef(1);
  const codeTextRows = useRef(1);
  const nowDate = new Date();
  
  useEffect(() => {
    setStartDate(formatToDatetimeLocal(nowDate));
    if (nowDate.getHours() == 23) {
      setEndDate(formatToDatetimeLocal(nowDate, 1, 1));
    } else {
      setEndDate(formatToDatetimeLocal(nowDate, 0, 1));
    }
  }, []);
  
  const formatToDatetimeLocal = (date, addDate = 0, addHour = 0) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + addDate).padStart(2, "0");
    const hours =
    date.getHours() + addHour == "24"
    ? "00"
    : String(date.getHours() + addHour).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const showcodeAdd = () => {
    setCodeAdd(!codeAdd);
  };

  const commentChange = (event) => {
    setCommentValue(event.target.value);
    commentTextRows.current = textRows(event.target.value);
  };

  const codeChange = (event) => {
    setCodeValue(event.target.value);
    codeTextRows.current = textRows(event.target.value);
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

  const nowDateFormat = new Date(formatToDatetimeLocal(nowDate));

  const endDateSet = (inputDate) => {
    if (inputDate.getHours() == 23) {
      setEndDate(formatToDatetimeLocal(inputDate, 1, 1));
    } else if (new Date(endDate) < inputDate) {
      setEndDate(formatToDatetimeLocal(inputDate, 0, 1));
    }
  };

  const startDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    if (nowDateFormat < inputDate) {
      setStartDate(event.target.value);
      endDateSet(inputDate);
    }
  };
    
  const endDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    if (new Date(startDate) < inputDate && nowDateFormat < inputDate) {
      endDateSet(inputDate);
    }
  };

  const groupSelect = (event) => {
    setGroupSelected(event.target.value);
    if (event.target.value === "追加") {
      setGroupAdd(true);
    } else {
      setGroupAdd(false);
    }
  };

  const saveTodo = () => {
    console.log({
      title: titleValue,
      startDate: startDate,
      endDate: endDate,
      priority: priorityValue,
      groupSelected: groupSelected,
      groupValue: groupValue,
      comment: commentValue,
      code: codeValue,
    })
    const todoData = {
      title: titleValue,
      start_date: startDate,
      end_date: endDate,
      priority: priorityValue,
      // groupSelected: groupSelected,
      group: groupValue,
      comment: commentValue,
      code: codeValue,
    };
    todoAdd(todoData);
  };

  return (
    <>
      <div className=" bg-slate-200">
        <table className="border border-solid border-gray-600">
          <thead>
            <tr>
              <th>タイトル</th>
              <th>日付</th>
              <th>重要度</th>
              <th>グループ</th>
              <th>内容</th>
              <th className="border-r-0"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={titleValue || ""}
                  onChange={(event) => setTitleValue(event.target.value)}
                />
              </td>
              <td>
                <input
                  type="datetime-local"
                  className="w-fit"
                  value={startDate}
                  min={nowDateFormat}
                  onChange={(event) => startDateChange(event)}
                />
                <p className="ml-20">≀</p>
                <input
                  type="datetime-local"
                  className="w-fit"
                  value={endDate}
                  min={nowDateFormat}
                  onChange={(event) => endDateChange(event)}
                />
              </td>
              <td>
                <select
                  name=""
                  id=""
                  className="font-semibold px-2 bg-gray-200"
                  defaultValue={priorityValue}
                  onChange={(event) => setPriorityValue(event.target.value)}
                >
                  <option value="高">高</option>
                  <option value="中">中</option>
                  <option value="低">低</option>
                </select>
              </td>
              <td>
                <select
                  name=""
                  id=""
                  className={
                    groupAdd
                      ? "font-semibold px-2 mb-2 bg-gray-200 haru-underline"
                      : "font-semibold px-2 bg-gray-200"
                  }
                  onChange={(event) => groupSelect(event)}
                >
                  <option value="">なし</option>
                  <option value="追加">追加</option>
                  <option value="Todoリスト">Todoリスト</option>
                </select>
                {groupAdd && (
                  <div>
                    <input
                      type="text"
                      className="haru-underline mb-2 w-9/12"
                      onChange={(event) => setGroupValue(event.target.value)}
                    />
                    {/* <button className="haru-btn my-auto mr-0 ml-auto bg-blue-200">
                      保存
                    </button> */}
                  </div>
                )}
              </td>
              <td className="">
                <button
                  className="haru-code-btn haru-btn-color"
                  onClick={() => showcodeAdd()}
                >
                  コード
                </button>
                <textarea
                  name=""
                  id=""
                  // ref={commentRef}
                  rows={commentTextRows.current}
                  className={codeAdd ? "mt-2 haru-underline" : "mt-2"}
                  onChange={commentChange}
                  value={commentValue || ""}
                  placeholder="内容を入力してください"
                />
                {codeAdd && (
                  <textarea
                    name=""
                    id=""
                    // ref={codeRef}
                    rows={codeTextRows.current}
                    className="mt-2"
                    onChange={codeChange}
                    value={codeValue || ""}
                    placeholder="コードを入力してください"
                  />
                )}
              </td>
              <td className="border-l-0">
                <button
                  className="haru-btn my-auto mr-0 ml-auto bg-blue-200"
                  onClick={() => saveTodo()}
                >
                  保存
                </button>
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
        {/* <button className="haru-btn mb-0 ml-auto bg-blue-200">
          保存
        </button> */}
      </div>
    </>
  );
}