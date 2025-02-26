<?php

// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  public function index()
  {
    $users = User::all();  // すべてのデータを取得
    return response()->json($users);
  }

    // public function index()
    // {
    //     // すべてのユーザー情報を返す
    //     return response()->json(User::all());
    // }
}
