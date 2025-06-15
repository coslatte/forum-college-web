<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ForumUsersController;

Route::get('/comments', [CommentController::class, 'index']);
Route::get('/comments/{id}', [CommentController::class, 'show']);
Route::get("/forum_users", [ForumUsersController::class, "index"]);
Route::get("/forum_users/{id}", [ForumUsersController::class, "show"]);

Route::post('/comments', [CommentController::class, 'store']);
Route::post('/comments/{id}/vote', [CommentController::class, 'vote']);

Route::put('/comments/{id}', [CommentController::class, 'update']);

Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
