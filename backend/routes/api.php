<?php

// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoListController;


Route::get('users', [UserController::class, 'index']);
Route::post('todoAdd', [TodoListController::class, 'index']);