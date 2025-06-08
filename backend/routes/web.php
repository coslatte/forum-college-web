<?php

use Illuminate\Support\Facades\Route;

Route::middleware('api')->prefix('api')->group(function () {
    require __DIR__.'/api.php';
});

Route::get('/', function () {
    return view('welcome');
});
