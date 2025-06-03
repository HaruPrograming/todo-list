<?php

// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoListController;


// Route::get('users', [UserController::class, 'index']);
Route::get('getTodosLastId', [TodoListController::class, 'getTodosLastId']);
Route::get('getTodoGroupsLastId', [TodoListController::class, 'getTodoGroupsLastId']);
Route::get('getTodoImagesLastId', [TodoListController::class, 'getTodoImagesLastId']);
Route::get('showTodo/{uid}', [TodoListController::class, 'showTodo']);
Route::get('showTodoGroup/{uid}', [TodoListController::class, 'showTodoGroup']);
Route::get('showTodoImage/{uid}', [TodoListController::class, 'showTodoImage']);
Route::post('addTodo', [TodoListController::class, 'addTodo']);
Route::post('addTodoGroup', [TodoListController::class, 'addTodoGroup']);
Route::post('addTodoImage', [TodoListController::class, 'addTodoImage']);
Route::post('deleteTodo', [TodoListController::class, 'deleteTodo']);
Route::post('deleteTodoGroup', [TodoListController::class, 'deleteTodoGroup']);
Route::post('deleteTodoImage', [TodoListController::class, 'deleteTodoImage']);
Route::post('editTodo', [TodoListController::class, 'editTodo']);
Route::post('editTodoCheckBox', [TodoListController::class, 'editTodoCheckBox']);
Route::post('editTodoImage', [TodoListController::class, 'editTodoImage']);