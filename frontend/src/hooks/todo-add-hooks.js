import axios from 'axios';

export const TodoAddHooks = () => {
  const todoAdd = (todoData) => {
    console.log(todoData);
    axios
      .post("http://localhost:8000/api/todoAdd", todoData)
      .then((response) => {
        // 取得したデータを状態に保存
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return {todoAdd};
};