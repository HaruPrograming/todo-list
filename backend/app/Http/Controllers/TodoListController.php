<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;
use \Exception;

class TodoListController extends Controller
{
  public function showTodo() 
  {
    $todoList = TodoList::all(); 
    return response()->json($todoList);
  }

  /**
   * Todo追加
   * @param   $request->title      : タイトル
   * @param   $request->start_date : 開始時間
   * @param   $request->end_date   : 終了時間
   * @param   $request->priority   : 重要度
   * @param   $request->group      : Todoリストのグループ
   * @param   $request->comment    : 内容
   * @param   $request->code       : ソースコード
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, data), 200
   */
  public function addTodo(Request $request)
  {
    try {
      $todo = new TodoList();
      $todo->title = $request->title;
      $todo->start_date = $request->start_date;
      $todo->end_date = $request->end_date;
      $todo->priority = $request->priority;
      $todo->group = $request->group;
      $todo->comment = $request->comment;
      $todo->code = $request->code;
      $todo->save();

      return response([
          'status' => 'success',
          'message' => 'todoの作成に成功しました',
          'data' => $todo
      ], 200);
    } catch(Exception $e) {
      return response()->json([
          'status' => 'error',
          'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }
}
