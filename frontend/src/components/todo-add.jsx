import React, { useState, useRef, useEffect, useCallback } from "react";
import { TodoHooks } from "../hooks/todo-list-hooks";
import { usetodoDataContext } from "../context/todoDataContext";
import { useShowTodoContext } from "../context/showTodoContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // ✅ 修正ポイント
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { set } from "date-fns";
import { useUserInfoContext } from "../context/userInfoContext";

export const TodoAdd = ({ add }) => {
  const {
    showTodoGroup,
    showTodoImage,
    addTodo,
    addTodoGroup,
    addTodoImage,
    editTodo,
    editTodoImage,
    deleteTodo,
    deleteTodoImage,
  } = TodoHooks();
  const { groupList, setGroupList, imageList, setImageList } =
    usetodoDataContext();
  const { todoAddCheck, setTodoAddCheck } = useShowTodoContext();
  const { userInfo, setUserInfo } = useUserInfoContext();
  const [idValue, setIdValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupSelected, setGroupSelected] = useState("");
  const [groupValue, setGroupValue] = useState(null);
  const [priorityValue, setPriorityValue] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [codeValue, setCodeValue] = useState(null);
  const [codeAdd, setCodeAdd] = useState(false);
  const [groupAdd, setGroupAdd] = useState(false);
  const [error, setError] = useState("");
  const [todoImageList, setTodoImageList] = useState([]);
  const [imageDeleteCheck, setImageDeleteCheck] = useState(-1);
  const [imageDelete, setImageDelete] = useState(-1);
  const commentRef = useRef("");
  const codeRef = useRef("");
  const commentTextRows = useRef(1);
  const codeTextRows = useRef(1);
  const commentNewLine = useRef(0);
  const codeNewLine = useRef(0);
  const valueLineRef = useRef(0);
  const valueSliceRef = useRef("");
  const nowDate = new Date();
  const nowDateFormat = useRef("");
  const imageFile = useRef(null);
  // const nowDateFormat = new Date(formatToDatetimeLocal(nowDate));

  useEffect(() => {
    nowDateFormat.current = new Date(formatToDatetimeLocal(nowDate));
    setStartDate(formatToDatetimeLocal(nowDate));
    if (nowDate.getHours() == 23) {
      setEndDate(formatToDatetimeLocal(nowDate, 1, 1));
    } else {
      setEndDate(formatToDatetimeLocal(nowDate, 0, 1));
    }
    // showTodoGroup().then((res) =>{
    //   setGroupList(res.data);
    // });
    // showTodoImage().then((res) => {
    //   setImageList(res.todoImage);
    // });
    if (add) {
      setIdValue(add.id);
      setTitleValue(add.title);
      setStartDate(add.start_date);
      setEndDate(add.end_date);
      groupList?.map((group) => {
        if (group.id == add.group_id) {
          setGroupSelected(group.id);
        }
      });
      setPriorityValue(add.priority);
      setCommentValue(add.comment);
      setCodeValue(add.code);
      add.comment &&
        (commentTextRows.current = textRows(
          commentRef,
          commentNewLine,
          add.comment
        ));
      add.code &&
        (codeTextRows.current = textRows(codeRef, codeNewLine, add.code));
    }
  }, []);

  useEffect(() => {
    imageList?.map((image) => {
      if (image.todo_id == idValue) {
        setTodoImageList((prev) => {
          return [...prev, image.id];
        });
      }
    });
  }, [idValue, imageList]);

  const formatToDatetimeLocal = (date, addDate = 0, addHour = 0) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate() + addDate).padStart(2, "0");
    const hours =
      newDate.getHours() + addHour == "24"
        ? "00"
        : String(newDate.getHours() + addHour).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const showcodeAdd = () => {
    setCodeAdd(!codeAdd);
  };

  const commentChange = (event) => {
    setCommentValue(event.target.value);
    commentTextRows.current = textRows(
      commentRef,
      commentNewLine,
      event.target.value
    );
  };

  const codeChange = (event) => {
    setCodeValue(event.target.value);
    codeTextRows.current = textRows(codeRef, codeNewLine, event.target.value);
  };

  const textRows = (valueRef, valueNewLine, value) => {
    // console.log(
    //   "codeRef",
    //   valueRef.current,
    //   "codeNewLine",
    //   valueNewLine.current,
    //   "value",
    //   value
    // );
    if (valueRef.current) {
      valueNewLine.current = value.match(/\r\n|\n/g)
        ? value.match(/\r\n|\n/g).length
        : 1;
      valueSliceRef.current = value;
      if (valueSliceRef.current.indexOf("\n") > -1) {
        while (valueSliceRef.current.indexOf("\n") > -1) {
          valueLineRef.current = valueSliceRef.current.indexOf("\n");
          valueSliceRef.current = valueSliceRef.current.substring(
            valueLineRef.current + 1,
            valueSliceRef.current.length
          );
        }
        valueNewLine.current++;
      }
      return (
        Math.ceil(
          Math.round(valueSliceRef.current.length) /
            Math.round(valueRef.current.clientWidth / 16)
        ) + valueNewLine.current
      );
    } else {
      return 1;
    }
  };

  const startDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    if (nowDateFormat.current < inputDate) {
      setStartDate(formatToDatetimeLocal(event.target.value));
      endDateSet(inputDate, 1);
    }
  };

  const endDateChange = (event) => {
    const inputDate = new Date(event.target.value);
    if (new Date(startDate) < inputDate && nowDateFormat.current < inputDate) {
      endDateSet(inputDate);
    }
  };

  const endDateSet = (inputDate, inputStartCheck) => {
    if (inputStartCheck == 1 && inputDate.getHours() == 23) {
      setEndDate(formatToDatetimeLocal(inputDate, 1, 1));
    } else if (new Date(startDate) < inputDate) {
      setEndDate(formatToDatetimeLocal(inputDate));
    }
  };

  const groupSelect = (event) => {
    if (event.target.value === "-1") {
      setGroupSelected(null);
    } else {
      setGroupSelected(event.target.value);
    }

    if (event.target.value === "0") {
      setGroupAdd(true);
    } else {
      setGroupAdd(false);
    }
  };

  const addTodoData = (saveSelect) => {
    const selectedPriorityValue = priorityValue || "高";
    const selectedGroupSelected = groupSelected || null;
    const todoData = {
      user_id: userInfo.uid,
      title: titleValue,
      start_date: startDate,
      end_date: endDate,
      priority: selectedPriorityValue,
      group_id: selectedGroupSelected,
      comment: commentValue,
      code: codeValue,
    };
    if (idValue) {
      todoData.id = idValue;
    }
    if (groupValue) {
      // saveSelect(todoData).then((res) => {
      //   addTodoGroup(res.todo.id, groupValue);
      //   if (res.status == "error") {
      //     setError(true);
      //   }
      // });
      addTodoGroup(groupValue, userInfo.uid).then((res) => {
        // console.log('res', res)
        todoData.group_id = res;
        saveSelect(todoData);
      });
    } else {
      saveSelect(todoData).then((res) => {
        if (res.status == "error") {
          setError(true);
        }
      });
    }
  };

  const saveTodo = () => {
    if (idValue) {
      addTodoData(editTodo);
    } else {
      addTodoData(addTodo);
    }
  };

  const addImage = () => {
    imageFile.current.click();
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
              <th>メモ</th>
              {add && <th>画像</th>}
              <th className="border-r-0">
                {add && (
                  <button
                    className="haru-btn haru-delete-btn-color text-base font-normal text-black my-auto mr-0 ml-auto"
                    onClick={() => {
                      deleteTodo(idValue, todoImageList)
                    }}
                  >
                    削除
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={titleValue || ""}
                  className={error ? "haru-todo-error-color" : ""}
                  placeholder="タイトルを入力してください"
                  onChange={(event) => setTitleValue(event.target.value)}
                />
              </td>
              <td>
                <input
                  type="datetime-local"
                  className="w-fit"
                  value={startDate}
                  min={nowDateFormat.current}
                  onChange={(event) => startDateChange(event)}
                />
                <p className="ml-20">≀</p>
                <input
                  type="datetime-local"
                  className="w-fit"
                  value={endDate}
                  min={nowDateFormat.current}
                  onChange={(event) => endDateChange(event)}
                />
              </td>
              <td>
                <select
                  name=""
                  id=""
                  className="font-semibold px-2 bg-gray-200"
                  value={priorityValue || ""}
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
                  value={groupSelected || ""}
                  onChange={(event) => groupSelect(event)}
                >
                  <option value={-1}>なし</option>
                  <option value={0}>追加</option>
                  {groupList &&
                    groupList.map((group) => {
                      return (
                        group && (
                          <option key={group.id} value={group.id}>
                            {group.title}
                          </option>
                        )
                      );
                    })}
                  {/* <option value="Todoリスト">Todoリスト</option> */}
                </select>
                {groupAdd && (
                  <div>
                    <input
                      type="text"
                      className={
                        error
                          ? "haru-todo-error-color haru-underline mb-2 w-9/12"
                          : "haru-underline mb-2 w-9/12"
                      }
                      onChange={(event) => setGroupValue(event.target.value)}
                    />
                    {/* <button className="haru-btn my-auto mr-0 ml-auto bg-blue-200">
                      保存
                    </button> */}
                  </div>
                )}
              </td>
              <td>
                <button
                  className="haru-code-btn haru-btn-color"
                  onClick={() => showcodeAdd()}
                >
                  コード
                </button>
                <textarea
                  name=""
                  id=""
                  wrap="on"
                  ref={commentRef}
                  rows={commentTextRows.current || 1}
                  className={`mt-2 ${
                    codeAdd || codeValue ? "haru-underline" : ""
                  }`}
                  onChange={commentChange}
                  value={commentValue || ""}
                  placeholder="メモを入力してください"
                />
                {/* {(codeAdd || codeValue || codeTextRows.current > 1) && ( */}
                <textarea
                  name=""
                  id=""
                  ref={codeRef}
                  rows={codeTextRows.current || 1}
                  wrap="off"
                  className={`mt-2 ${
                    codeAdd || codeValue ? "visible" : "invisible -m-10"
                  }`}
                  onChange={codeChange}
                  value={codeValue || ""}
                  placeholder="コードを入力してください"
                />
                {/* )} */}
              </td>
              {add && (
                <td>
                  <div className="w-11/12">
                    <Swiper
                      className="w-60 md:w-96"
                      modules={[Navigation, Pagination]} // ✅ ここで modules を適切に設定
                      spaceBetween={10}
                      slidesPerView={2}
                      // navigation
                      pagination={{ clickable: true }}
                      freeMode={true} // ✅ ドラッグで自由にスクロール
                    >
                      {imageList?.map((image) => {
                        if (image.todo_id == idValue) {
                          return (
                            <SwiperSlide key={image.id}>
                              {imageDeleteCheck != image.id && (
                                <img
                                  src={image.todo_image_path}
                                  alt=""
                                  className={`w-32 max-h-64 ${
                                    imageDelete == image.id &&
                                    "border-4 border-solid border-red-400"
                                  } `}
                                  key={image.id}
                                  onClick={() => {
                                    setImageDeleteCheck(image.id);
                                  }}
                                />
                              )}
                              {imageDeleteCheck == image.id && (
                                <img
                                  src={image.todo_image_path}
                                  alt=""
                                  className="w-32 max-h-64 border-4 border-solid border-green-400"
                                  // {`mt-2 ${
                                  //   codeAdd || codeValue ? "visible" : "invisible -m-10"
                                  // }`}
                                  key={image.id}
                                  onClick={() => {
                                    setImageDeleteCheck(-1);
                                    setImageDelete(image.id);
                                    deleteTodoImage(image.id).then(() => {
                                      showTodoImage(userInfo.uid).then((res) => {
                                        setImageList(res.todoImage);
                                      });
                                    });
                                  }}
                                />
                              )}
                            </SwiperSlide>
                          );
                        }
                      })}
                    </Swiper>
                  </div>
                  <div className="flex justify-between">
                    <input
                      type="file"
                      ref={imageFile}
                      name="todo_image"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        addTodoImage(idValue, event.target.files[0], userInfo.uid).then(
                          () => {
                            showTodoImage(userInfo.uid).then((res) => {
                              setImageList(res.todoImage);
                            });
                          }
                        )
                      }
                    />
                    {add && (
                      <button
                        className="haru-btn bg-orange-300 block ml-auto"
                        onClick={() => {
                          addImage(), setImageDelete(-1);
                        }}
                      >
                        アップロード
                      </button>
                    )}
                  </div>
                </td>
              )}
              <td className="border-l-0">
                <button
                  className="haru-btn haru-save-btn-color my-auto mr-0 ml-auto"
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
};