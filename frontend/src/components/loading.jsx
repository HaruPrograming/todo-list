import { useUserInfoContext } from "../context/userInfoContext";
import { usetodoDataContext } from "../context/todoDataContext";

export const Loading = () => {
  const { userInfo, setUserInfo } = useUserInfoContext();
    const {
      dbTodoList,
      setDbTodoList,
      dbSouceTodoList,
      setSouceDbTodoList,
      groupList,
      setGroupList,
    } = usetodoDataContext();

  return (
    !userInfo || dbTodoList == "" || groupList == "" && (
      <>
        <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-50">
          <p className="z-30 font-bold text-black">読み込み中・・・</p>
        </div>
      </>
    )
  )
}