<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;


// Re-expose API routes but exclude CSRF middleware so POST requests no longer fail with 419
Route::middleware('api')
    ->prefix('api')
    ->withoutMiddleware([VerifyCsrfToken::class])
    ->group(function () {
        require __DIR__ . '/api.php';
    });

Route::get('/', function () {
    return view('welcome');
});
