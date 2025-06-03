<?php

// use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

// routes/web.php

use Illuminate\Support\Facades\Route;

Route::middleware('api')
     ->prefix('api')
     ->group(base_path('routes/api.php'));

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});