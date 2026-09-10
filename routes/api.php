<?php

use App\Http\Controllers\authController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [authController::class, 'Register']);
Route::post('/login', [authController::class, 'Login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
