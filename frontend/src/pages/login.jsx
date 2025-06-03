// import { provider, auth } from "../firebase";
// import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

// export const Login = () => {
//   return (
//     <h1>hello</h1>
//   )
// };


// LoginModal.jsx
import React, { useState } from 'react';
import { IoLogoGoogle } from "react-icons/io";
import { provider, auth } from '../../firebase'; // Firebaseの認証関連の設定をインポート
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'; // Firebaseの認証関連のメソッドをインポート
import { useNavigate } from 'react-router-dom'; // React RouterのuseNavigateフックをインポート

export const Login = () => {
  const navigate = useNavigate();

  // Googleアカウントを使用してログイン
  const signInwithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);// FirebaseのsignInWithPopupメソッドを使用してGoogleアカウントでのサインインを試行
      navigate('/top'); // サインイン成功後にトップページへリダイレクト
    } catch (error) {
      console.error('Googleサインインエラー:', error.message); // エラーメッセージを表示
      console.error(error); // エラーをコンソールに出力
    }
  };

  return (
    <div className="w-80 m-auto p-5 mt-10 bg-slate-100 rounded-md">
      <h1 className="text-3xl text-center">todoりすと</h1>
      <h2 className="text-2xl text-center mt-3">ログイン</h2>
      <div className="flex w-fit m-auto mt-2">
        <p className="text-center m-auto">Google認証：</p>
        <IoLogoGoogle
          style={{ color: "#1266f1", cursor: "pointer" }}
          className="m-auto ml-2"
          onClick={signInwithGoogle}
          size={26}
        />
      </div>
    </div>
  );
}

