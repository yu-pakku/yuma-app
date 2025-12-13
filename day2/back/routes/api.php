<?php

use Illuminate\Http\Request;
use App\Http\Controllers\MemoController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/memos', [MemoController::class, 'index']);
Route::post('/memos', [MemoController::class, 'store']);
Route::get('/memos/{id}', [MemoController::class, 'show']);
Route::put('/memos/{id}', [MemoController::class, 'update']);
Route::delete('/memos/{id}', [MemoController::class, 'destroy']);
