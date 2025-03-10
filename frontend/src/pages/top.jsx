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

export const Top = () => {
  const { showTodo, showTodoGroup } = TodoHooks();
  const { todoAddCheck, setTodoAddCheck } = useShowTodoContext();
  const { getTodoCheck, getTodoGroupCheck } = usegetTodoContext();
  const { dbTodoList, setDbTodoList, groupList, setGroupList } =
    usetodoDataContext();
  const [todoAddValue, setTodoAddValue] = useState("追加");
  const [currentDate, setCurrentDate] = useState("");
  const [event, setEvent] = useState([]);
  const [currentView, setCurrentView] = useState(Views.MONTH); // 現在のビューを管理
  const dateFormat = "yyyy-MM-dd";

  const locales = { ja }; // 日本語ロケールを設定
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
      setDbTodoList(res.todoList);
    });
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

  // const handleEventDrop = ({ event, start, end }) =>
  //   const updatedEvent = { ...event, start, end };
  //   setEvents(events.map((e) => (e === event ? updatedEvent : e)));
  // };

  // const handleEventClick = (event) => {
  //   alert(`Event: ${event.title} starts at ${event.start}`);
  // };

  // カレンダーのビューが変更されたときに現在の月を設定
  // const handleViewChange = (view) => {
  //   if (view === "month") {
  //     const month = format(new Date(), "YYYY MM"); // 現在の月を 'Month Year' 形式で取得
  //     setCurrentMonth(month);
  //   }
  // };

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

  // const changeMonth = (changeValue) => {
  //   const date = formatDate(currentDate, changeValue);
  //   setCurrentDate(date);
  // }

  const CustomEvent = ({ event }) => {
    if (currentView === Views.MONTH) {
      return <div></div>;
    }
    return (
      <div>
        {/* {event.date} */}
        {event.title}
      </div>
    );
  };

  // const CustomToolbar = ({ label, onNavigate, onView }) => {
  //   return (
  //     <div className="flex justify-between items-center p-2">
  //       <button
  //         onClick={() => onNavigate("TODAY")}
  //         className="haru-c arendar-header-change-btn"
  //       >
  //         今日
  //       </button>
  //       <button
  //         onClick={() => onNavigate("PREV")}
  //         className="haru-carendar-header-btn"
  //       >
  //         ＜
  //       </button>
  //       <span className="">{label}</span>
  //       <button
  //         onClick={() => onNavigate("NEXT")}
  //         className="haru-carendar-header-btn"
  //       >
  //         ＞
  //       </button>

  //       <div>
  //         <button
  //           onClick={() => onView("month")}
  //           className="haru-carendar-header-change-btn"
  //         >
  //           月
  //         </button>
  //         <button
  //           onClick={() => onView("week")}
  //           className="haru-carendar-header-change-btn"
  //         >
  //           週
  //         </button>
  //         <button
  //           onClick={() => onView("day")}
  //           className="haru-carendar-header-change-btn"
  //         >
  //           日
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      <div className="h-dvh">
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
              <p>
                重要度：
                <span className="px-1 ml-1 bg-red-400 rounded-md">高</span>
                <span className="px-1 ml-1 bg-yellow-400 rounded-md">中</span>
                <span className="px-1 ml-1 bg-blue-400 rounded-md">低</span>
              </p>
              <p>
                実行状況：
                <span className="px-1 ml-1 bg-white rounded-md">未実行</span>
                <span className="px-1 ml-1 bg-blue-400 rounded-md">実行中</span>
                <span className="px-1 ml-1 bg-green-400 rounded-md">完了</span>
                <span className="px-1 ml-1 bg-red-400 rounded-md">遅れ</span>
                <span className="px-1 ml-1 bg-violet-400 rounded-md">遅れ実行</span>
              </p>
            </div>
            <div className="flex">
              <button className="haru-btn haru-btn-color">絞り込み</button>
              <button
                className="haru-btn haru-btn-color"
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
          {groupList &&
            groupList.map((group) => (
              <TodoListFormat key={group.id} group={group} />
            ))}
          {dbTodoList.map((todo) => {
            return !todo.group_id && <TodoFormat key={todo.id} todo={todo} />;
          })}
          {/* <TodoListFormat />
          <TodoFormat /> */}
        </div>
      </div>
    </>
  );
};
