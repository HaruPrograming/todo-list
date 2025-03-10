<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use App\Models\TodoGroup;
use Illuminate\Http\Request;
use \Exception;

class TodoListController extends Controller
{
  public function showTodo() 
  {
  /**
   * Todo取得
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoList), 200
   */
    try {
      $todoList = TodoList::all();
      return response([
        'status' => 'success',
        'message' => 'todoListの取得に成功しました',
        'todoList' => $todoList
      ], 200);
    } catch(error) {
      return response()->json([
        'status' => 'error',
        'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }
  /**
   * TodoGroup取得
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoGroup), 200
   */
  public function showTodoGroup() 
  {
    try {
      $todoGroup = TodoGroup::all();
      return response([
        'status' => 'success',
        'message' => 'todoListの取得に成功しました',
        'todoGroup' => $todoGroup
      ], 200);
    } catch(error) {
      return response()->json([
        'status' => 'error',
        'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * Todo追加
   * @param   $request->title      : タイトル
   * @param   $request->start_date : 開始時間
   * @param   $request->end_date   : 終了時間
   * @param   $request->priority   : 重要度
   * @param   $request->group_id   : Todoリストのグループ
   * @param   $request->comment    : 内容
   * @param   $request->code       : ソースコード
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todo), 200
   */
  public function addTodo(Request $request)
  {
    if (!isset($request->title)) 
    {
      return response()->json([
          'status' => 'error',
          'message' => 'タイトルが入力されていません。'
      ], 400);
    }
    try {
      $todo = new TodoList();
      $todo->title = $request->title;
      $todo->start_date = $request->start_date;
      $todo->end_date = $request->end_date;
      $todo->priority = $request->priority;
      $todo->group_id = $request->group_id;
      $todo->comment = $request->comment;
      $todo->code = $request->code;
      $todo->save();

      return response([
          'status' => 'success',
          'message' => 'todoの作成に成功しました',
          'todo' => $todo
      ], 200);
    } catch(Exception $e) {
      return response()->json([
          'status' => 'error',
          'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * TodoGroup追加
   * @param   $request->title      : グループタイトル
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoGroup), 200
   */
  public function addTodoGroup(Request $request)
  {
    try {
      $todoGroup = new TodoGroup();
      $todoGroup->title = $request->title;
      $todoGroup->save();

      return response([
          'status' => 'success',
          'message' => 'todoGroupの作成に成功しました',
          'todoGroup' => $todoGroup
      ], 200);
    } catch(Exception $e) {
      return response()->json([
          'status' => 'error',
          'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * Todo削除
   * @param   $request->id      : todoのid
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todo), 200
   */
  public function deleteTodo(Request $request)
  {
    try {
      $todo = TodoList::find($request->id);
      $todo->delete();

      return response()->json([
          'status' => 'success',
          'message' => 'todoの削除に成功しました',
          'todo' => $todo
      ], 200);
    } catch(Exception $e) {
      return response()->json([
          'status' => 'error',
          'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * TodoGroup削除
   * @param   $request->id      : todoGroupのid
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoGroup), 200
   */
  public function deleteTodoGroup(Request $request)
  {
    try {
      $todoGroup = TodoGroup::find($request->id);
      $todoGroup->delete();

      return response()->json([
          'status' => 'success',
          'message' => 'todoGroupの削除に成功しました',
          'todoGroup' => $todoGroup
      ], 200);
    } catch(Exception $e) {
      return response()->json([
          'status' => 'error',
          'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * Todo編集
   * @param   $request->id         : Todoのid
   * @param   $request->title      : タイトル
   * @param   $request->start_date : 開始時間
   * @param   $request->end_date   : 終了時間
   * @param   $request->priority   : 重要度
   * @param   $request->group_id   : Todoリストのグループ
   * @param   $request->comment    : 内容
   * @param   $request->code       : ソースコード
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todo), 200
   */
  public function editTodo(Request $request)
  {
    if (!isset($request->title)) 
    {
      return response()->json([
          'status' => 'error',
          'message' => 'タイトルが入力されていません。'
      ], 400);
    }
    try {
      $todo = TodoList::find($request->id);
      $todo->title = $request->title;
      $todo->start_date = $request->start_date;
      $todo->end_date = $request->end_date;
      $todo->priority = $request->priority;
      $todo->group_id = $request->group_id;
      $todo->comment = $request->comment;
      $todo->code = $request->code;
      $todo->save();

      return response([
          'status' => 'success',
          'message' => 'todoの編集に成功しました',
          'todo' => $todo
      ], 200);
    } catch(Exception $e) {
      return response()->json([
          'status' => 'error',
          'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * TodoCheck編集
   * @param   $request->id      : Todoのid
   * @param   $request->check   : 未実行 -> 0、実行 -> 1
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoCheck), 200
   */
  public function editTodoCheckBox(Request $request)
  {
    try {
      $todoCheck = TodoList::find($request->id);
      $todoCheck->check = $request->check;
      $todoCheck->save();

      return response([
          'status' => 'success',
          'message' => 'editTodoCheckBoxの編集に成功しました',
          'todoCheck' => $todoCheck
      ], 200);
    } catch(Exception $e) {
      return response()->json([
          'status' => 'error',
          'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }
}
