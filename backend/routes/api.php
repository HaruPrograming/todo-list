<?php

// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoListController;


Route::get('users', [UserController::class, 'index']);
Route::get('showTodo', [TodoListController::class, 'showTodo']);
Route::post('addTodo', [TodoListController::class, 'addTodo']);