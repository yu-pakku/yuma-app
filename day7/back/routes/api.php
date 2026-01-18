<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/items', [ItemController::class, 'index']);
Route::put('/items/{id}', [ItemController::class, 'update']);