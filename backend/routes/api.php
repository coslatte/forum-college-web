<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ForumUsersController;

Route::get('/comments', [CommentController::class, 'index']);
Route::get('/comments/{id}', [CommentController::class, 'show']);
Route::get("/forum_users", [ForumUsersController::class, "index"]);

Route::post('/comments', [CommentController::class, 'store']);
