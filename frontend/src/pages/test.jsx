// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export const Test = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // LaravelのAPIエンドポイントにGETリクエストを送る
//     // axios.get('http://haru-db.cza4asoc8ebt.ap-northeast-1.rds.amazonaws.com/api/users')
//     axios.get('http://localhost:8000/api/users')
//       .then(response => {
//         // 取得したデータを状態に保存
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Users List</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>{user.name} : {user.email}</li>
//         ))}
//       </ul>
//     </div>
//   )
// };