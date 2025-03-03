<?php

// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoListController;


Route::get('users', [UserController::class, 'index']);
Route::get('showTodo', [TodoListController::class, 'showTodo']);
Route::get('showTodoGroup', [TodoListController::class, 'showTodoGroup']);
Route::post('addTodo', [TodoListController::class, 'addTodo']);
Route::post('addTodoGroup', [TodoListController::class, 'addTodoGroup']);
Route::post('deleteTodo', [TodoListController::class, 'deleteTodo']);
Route::post('deleteTodoGroup', [TodoListController::class, 'deleteTodoGroup']);
Route::post('editTodo', [TodoListController::class, 'editTodo']);