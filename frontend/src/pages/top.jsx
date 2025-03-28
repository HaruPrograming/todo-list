import "moment/locale/ja";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, dateFnsLocalizer, Views  } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMonths } from "date-fns";
import { ja } from "date-fns/locale";
import { useShowTodoContext } from "../context/showTodoContext";
import { usegetTodoContext } from "../context/getTodoContext";
import { usetodoDataContext } from "../context/todoDataContext";
import { CustomToolbar } from "../components/custom-tool-bar";
import { TodoListFormat } from "../components/todo-list-format";
import { TodoFormat } from "../components/todo-format";
import { TodoAdd } from "../components/todo-add";
import { TodoHooks } from "../hooks/todo-list-hooks";
import { FilteringTodoList } from "../components/filtering-todo-list";

export const Top = () => {
  const { showTodo, showTodoGroup } = TodoHooks();
  const { todoAddCheck, setTodoAddCheck } = useShowTodoContext();
  const { getTodoCheck, getTodoGroupCheck } = usegetTodoContext();
  const { dbTodoList, setDbTodoList, dbSouceTodoList, setSouceDbTodoList, groupList, setGroupList } =
    usetodoDataContext();
  const [todoAddValue, setTodoAddValue] = useState("追加");
  const [filteringValue, setFilteringValue] = useState("絞り込み");
  const [currentDate, setCurrentDate] = useState("");
  const [event, setEvent] = useState([]);
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [filteringCheck, setFilteringCheck] = useState(false);
  const [filteringAscCheck, setFilteringAscCheck] = useState(true);
  const [filteringDescCheck, setFilteringDescCheck] = useState(false);
  const [filterEndShowCheck, setFilterEndShowCheck] = useState(false);
  const [filterGroupCheck, setFilterGroupCheck] = useState(false);
  const dateFormat = "yyyy-MM-dd";

  const locales = { ja };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  useEffect(() => {
    const date = formatDate(new Date());
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    setTodoAddValue(!todoAddCheck ? "追加" : "閉じる");
    showTodo().then((res) => {
        if (filteringAscCheck) {
          setDbTodoList(
            res.todoList.sort(
              (a, b) => new Date(a.start_date) - new Date(b.start_date)
            )
          );
          setSouceDbTodoList(
            res.todoList.sort(
              (a, b) => new Date(a.start_date) - new Date(b.start_date)
            )
          );
        }
        if (filteringDescCheck) {
          setDbTodoList(
            res.todoList.sort(
              (a, b) => new Date(b.start_date) - new Date(a.start_date)
            )
          );
          setSouceDbTodoList(
            res.todoList.sort(
              (a, b) => new Date(b.start_date) - new Date(a.start_date)
            )
          );
        }
      // setDbTodoList(res.todoList);
      // setSouceDbTodoList(res.todoList);
    });
    setSouceDbTodoList(dbTodoList);
  }, [getTodoCheck]);

  useEffect(() => {
    showTodoGroup().then((res) => {
      setGroupList(res.todoGroup);
    });
  }, [getTodoGroupCheck]);

  useEffect(() => {
    setEvent([]);
    dbTodoList?.map((todo) => {
      setEvent((prev) => [
        ...prev,
        {
          title: todo.title,
          start: new Date(todo.start_date),
          end: new Date(todo.end_date),
          check: todo.check,
        },
      ]);
    });
  }, [dbTodoList]);

  const showTodoAdd = () => {
    setTodoAddValue(todoAddCheck ? "追加" : "閉じる");
    setTodoAddCheck(!todoAddCheck);
  };

  const showfFltering = () => {
    setFilteringValue(filteringCheck ? "絞り込み" : "閉じる");
    setFilteringCheck(!filteringCheck);
  };

  const eventPropGetter = (event) => {
    switch (event.check) {
      case 0:
        return { style: { backgroundColor: "#000" } };
      case 1:
        return { style: { backgroundColor: "#22f" } };
      case 2:
        return { style: { backgroundColor: "#999" } };
      case 3:
        return { style: { backgroundColor: "#f00" } };
      case 4:
        return { style: { backgroundColor: "#88f" } };
    }

    return {};
  };

  const dayPropGetter = (date) => {
    const dayOfWeek = date.getDay();
    const getDate = format(date, dateFormat);
    const nowDate = format(new Date(), dateFormat);
    if (getDate == nowDate) {
      return {
        className: "bg-green-200",
      };
    }

    if (dayOfWeek === 0) {
      return {
        className: "bg-red-200",
      };
    } else if (dayOfWeek === 6) {
      return {
        className: "bg-blue-200",
      };
    }


    return {};
  };

  const handleNavigate = (date) => {
    console.log("ナビゲートされた日付: ", date.toDateString());
    setCurrentDate(formatDate(date));
  };

  const formatDate = (date, changeMonthValue) => {
    const newDate = new Date(date);
    const changeValue = changeMonthValue
      ? addMonths(newDate, changeMonthValue)
      : newDate;
    return format(changeValue, dateFormat, { locale: ja });
  };

  const viewChange = (view) => {
    setCurrentView(view);
  };

  const CustomEvent = ({ event }) => {
    if (currentView === Views.MONTH) {
      return <div></div>;
    }
    return (
      <div>
        {event.title}
      </div>
    );
  };

  // useEffect(() => {
  //   if (!filteringAscCheck) {
  //     setDbTodoList(
  //       dbTodoList.sort(
  //         (a, b) => new Date(a.start_date) - new Date(b.start_date)
  //       )
  //     );
  //   }
  //   if (!filteringDescCheck) {
  //     setDbTodoList(
  //       dbTodoList.sort(
  //         (a, b) => new Date(b.start_date) - new Date(a.start_date)
  //       )
  //     );
  //   }
  // }, [filteringAscCheck, filteringDescCheck]);

  const filteringAsc = () => {
    setFilteringAscCheck(true);
    setFilteringDescCheck(false);
    setDbTodoList(
      dbTodoList.sort(
        (a, b) => new Date(a.start_date) - new Date(b.start_date)
      )
    );
  };

  const filteringDesc = () => {
    setFilteringAscCheck(false);
    setFilteringDescCheck(true);
    setDbTodoList(
      dbTodoList.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date)
      )
    );
  };
  
  const filterEndTodoShow = (event) => {
    const checked = event.target.checked;
    if (checked == true) {
      setFilterEndShowCheck(true);
      setDbTodoList([]);
      dbSouceTodoList?.map((todo) => {
        if (todo.check != 2) {
          setDbTodoList((prev) => [...prev, todo])
        }
      })
    } else if (checked == false) {
      setFilterEndShowCheck(false);
      setDbTodoList(dbSouceTodoList);
    }
  }

  const filterGroupShow = (event) => {
    const checked = event.target.checked;
    console.log(filterGroupCheck)
    if (checked == true) {
      setFilterGroupCheck(true);
    } else if (checked == false) {
      setFilterGroupCheck(false);
    }
  }

  return (
    <>
      <div className="h-screen">
        <div className="h-1/2">
          <Calendar
            className="w-full mt-2 rounded-md bg-gray-100"
            localizer={localizer}
            culture={"ja"}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            // toolbar={false} // ツールバーを非表示にする
            popup={true} // イベントクリック時にポップアップを表示
            // onSelectEvent={handleEventClick}
            // onEventDrop={handleEventDrop}
            // onView={handleViewChange} // ビューが変更されたときに現在の月を更新
            events={event}
            dayPropGetter={dayPropGetter}
            date={currentDate} // 表示する月の日付を指定
            onNavigate={handleNavigate} // 月を変更したときに状態を更新
            onView={viewChange}
            eventPropGetter={eventPropGetter}
            components={{
              toolbar: CustomToolbar, // ✅ カスタムツールバーを適用
              event: (props) => <CustomEvent {...props} />, // カスタムイベント
            }}
          />
        </div>
        <div className="mx-auto pb-3">
          <div className="flex justify-between">
            <div>
              <p className="text-xs mt-1">
                重要度：
                <span className="text-xs w-fit px-1 ml-1 bg-red-400 rounded-md">
                  高
                </span>
                <span className="text-xs w-fit px-1 ml-1 bg-yellow-400 rounded-md">
                  中
                </span>
                <span className="text-xs w-fit px-1 ml-1 bg-blue-400 rounded-md">
                  低
                </span>
              </p>
              {/* <div className="flex">
                <p className="text-xs w-fit px-1 ml-1 bg-red-400 rounded-md">
                  高
                </p>
                <p className="text-xs w-fit px-1 ml-1 bg-yellow-400 rounded-md">
                  中
                </p>
                <p className="text-xs w-fit px-1 ml-1 bg-blue-400 rounded-md">
                  低
                </p>
              </div> */}
              <p className="text-xs w-fit mt-1">
                状況：
                <span className="text-xs w-fit px-1 ml-1 bg-blue-400 rounded-md">
                  実行中
                </span>
                <span className="text-xs w-fit px-1 ml-1 bg-green-400 rounded-md">
                  完了
                </span>
                <span className="text-xs w-fit px-1 ml-1 bg-red-400 rounded-md">
                  遅れ
                </span>
                <span className="text-xs w-fit px-1 ml-1 bg-violet-400 rounded-md">
                  遅れ実行中
                </span>
              </p>
              {/* <div className="flex">
                <p className="text-xs w-fit px-1 ml-1 bg-blue-400 rounded-md">
                  実行中
                </p>
                <p className="text-xs w-fit px-1 ml-1 bg-green-400 rounded-md">
                  完了
                </p>
                <p className="text-xs w-fit px-1 ml-1 bg-red-400 rounded-md">
                  遅れ
                </p>
                <p className="text-xs w-fit px-1 ml-1 bg-violet-400 rounded-md">
                  遅れ実行中
                </p>
              </div> */}
            </div>
            <div className="flex">
              <button
                className="haru-btn haru-btn-color"
                onClick={() => showfFltering()}
              >
                {filteringValue}
              </button>
              <button
                className="haru-btn ml-1 haru-btn-color"
                onClick={() => showTodoAdd()}
              >
                {todoAddValue}
              </button>
            </div>
          </div>
          {dbTodoList == "" && !todoAddCheck && (
            <h1 className="text-center font-semibold">
              Todoリストがありません。
            </h1>
          )}
          {todoAddCheck && <TodoAdd />}
          <FilteringTodoList
            filteringAsc={filteringAsc}
            filteringDesc={filteringDesc}
            filteringAscCheck={filteringAscCheck}
            filteringDescCheck={filteringDescCheck}
            filterEndTodoShow={filterEndTodoShow}
            filterGroupShow={filterGroupShow}
            filterEndShowCheck={filterEndShowCheck}
            filterGroupCheck={filterGroupCheck}
            filteringCheck={filteringCheck}
            showfFltering={showfFltering}
          />
          {groupList && !filterGroupCheck &&
            groupList?.map((group) => (
              <TodoListFormat key={group.id} group={group} />
            ))}
          {groupList?.map((group) => (
            dbTodoList?.map((todo, todoIndex) => {
              if (group.id == todo.group_id) return;
              console.log(todoIndex, dbTodoList.length - 1);
              return todoIndex == dbTodoList.length -1 && <TodoFormat key={todo.id} todo={todo} />;
            })
          ))}
          {groupList == "" && 
            dbTodoList?.map((todo) => {
              return  <TodoFormat key={todo.id} todo={todo} />;
          })}
          {/* <TodoListFormat />
          <TodoFormat /> */}
        </div>
      </div>
    </>
  );
};
