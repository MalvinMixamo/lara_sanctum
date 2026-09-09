<?php

use App\Http\Controllers\authController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [authController::class, 'Register']);
Route::post('/login', [authController::class, 'Login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
