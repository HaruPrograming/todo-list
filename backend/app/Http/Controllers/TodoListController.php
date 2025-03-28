<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use App\Models\TodoGroup;
use App\Models\TodoImage;
use Illuminate\Http\Request;
use \Exception;

class TodoListController extends Controller
{
  /**
   * Todoの最後のID取得
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todosLastId), 200
   */
  public function getTodosLastId()
  {
    try {
      $todosLastRow = TodoList::orderby('id', 'desc')->first();
      $todosLastId = $todosLastRow ? $todosLastRow->id : 0;
      // $todos = TodoList::all();
      // $todoLength = $todos->count();
      return response([
        'status' => 'success',
        'message' => 'todosLastIdの取得に成功しました',
        'todosLastId' => $todosLastId
      ], 200);
    } catch(error) {
      return response()->json([
        'status' => 'error',
        'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * TodoGroupの最後のID取得
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, groupsLastId), 200
   */
  public function getTodoGroupsLastId() 
  {
    try {
      $todoGroupsLastRow = TodoGroup::orderby('id', 'desc')->first();
      // $todoGroups = TodoGroup::all();
      $groupsLastId = $todoGroupsLastRow ? $todoGroupsLastRow->id : 0;
      // $todoGroupLength = $todoGroups->count();
      return response([
        'status' => 'success',
        'message' => 'groupsLastIdの取得に成功しました',
        'groupsLastId' => $groupsLastId
      ], 200);
    } catch(error) {
      return response()->json([
        'status' => 'error',
        'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * TodoImageの最後のID取得
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, imagesLastId), 200
   */
  public function getTodoImagesLastId() 
  {
    try {
      $todoImagesLastRow = TodoImage::orderBy('id', 'desc')->first();
      $lastId = $todoImagesLastRow ? $todoImagesLastRow->id : 0;
      return response([
        'status' => 'success',
        'message' => 'imagesLastIdの取得に成功しました',
        'imagesLastId' => $imagesLastId
      ], 200);
    } catch(error) {
      return response()->json([
        'status' => 'error',
        'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * Todo取得
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoList), 200
   */
  public function showTodo() 
  {
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
   * @return  json(status, message, todoGroups), 200
   */
  public function showTodoGroup() 
  {
    try {
      $todoGroups = TodoGroup::all();
      return response([
        'status' => 'success',
        'message' => 'todoGroupの取得に成功しました',
        'todoGroup' => $todoGroups
      ], 200);
    } catch(error) {
      return response()->json([
        'status' => 'error',
        'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }

  /**
   * TodoImage取得
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoImages), 200
   */
  public function showTodoImage() 
  {
    try {
      $todoImages = TodoImage::all();
      $todoImageList = $todoImages->map(function($todoImage) {
        return [
          'id' => $todoImage->id,
          'todo_id' => $todoImage->todo_id,
          'todo_image_path' => asset('storage/' . $todoImage->todo_image_path)
        ];
      });
      return response([
        'status' => 'success',
        'message' => 'todoImageの取得に成功しました',
        'todoImage' => $todoImageList
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
   * @param   $request->id         : Todoのid
   * @param   $request->title      : タイトル
   * @param   $request->start_date : 開始時間
   * @param   $request->end_date   : 終了時間
   * @param   $request->priority   : 重要度
   * @param   $request->comment    : 内容
   * @param   $request->code       : ソースコード
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todo), 200
   */
  public function addTodo(Request $request)
  {
    try {
      $todo = new TodoList();
      $todo->id = $request->id;
      $todo->group_id = $request->group_id;
      $todo->title = $request->title;
      $todo->start_date = $request->start_date;
      $todo->end_date = $request->end_date;
      $todo->priority = $request->priority;
      $todo->comment = $request->comment;
      $todo->code = $request->code;
      $todo->save();

      return response([
          'status' => 'success',
          'message' => 'todoの作成に成功しました',
          'todo' => $request->all()
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
   * @param   $request->id         : id
   * @param   $request->title      : グループタイトル
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoGroup), 200
   */
  public function addTodoGroup(Request $request)
  {
    try {
      $todoGroup = new TodoGroup();
      $todoGroup->id = $request->id;
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
   * TodoImage追加
   * @param   $request->id         : 画像のid
   * @param   $request->todo_image : 画像
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todo), 200
   */
  public function addTodoImage(Request $request)
  {
    try {
      $image = $request->file('todo_image');
      $imagePath = $image->store('images', 'public'); 
      // dd($imagePath);

      $todoImage = new TodoImage();
      $todoImage->id = $request->id;
      $todoImage->todo_id = $request->todo_id;
      $todoImage->todo_image_path = $imagePath;
      $todoImage->save();

      return response([
          'status' => 'success',
          'message' => 'addTodoImageの作成に成功しました',
          'todoImage' => asset('storage/' . $todoImage->todo_image_path)
          // 'todoImage' => $todoImage
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
   * TodoImage削除
   * @param   $request->id      : todoGroupのid
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoGroup), 200
   */
  public function deleteTodoImage(Request $request)
  {
    try {
      $todoGroup = TodoImage::find($request->id);
      $todoGroup->delete();

      return response()->json([
          'status' => 'success',
          'message' => 'deleteTodoImageの削除に成功しました',
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
      // $todo->group_id = $request->group_id;
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

  /**
   * TodoImage編集
   * @param   $request->id      : Todoのid
   * @param   $request->check   : 未実行 -> 0、実行 -> 1
   * 
   * @throws  Exception | json(status, message), 500
   * @return  json(status, message, todoImage), 200
   */
  public function editTodoImage(Request $request)
  {
    try {
      $todoImage = TodoList::find($request->todoId);
      $todoImage->image_id = $request->imageId;
      $todoImage->save();

      return response([
          'status' => 'success',
          'message' => 'editTodoImageの編集に成功しました',
          'todoImage' => $todoImage
      ], 200);
    } catch(Exception $e) {
      return response()->json([
          'status' => 'error',
          'message' => 'データの操作中にエラーが発生しました。'.$e->getMessage()
      ], 500);
    }
  }
}
