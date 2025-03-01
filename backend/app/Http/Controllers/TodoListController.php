<?php

namespace App\Http\Controllers;

use App\Models\TodoList;

class TodoListController extends Controller
{
  public function index() 
  {
    $todo_list = TodoList::all();
    return response()->json($todo_list);
  }
}