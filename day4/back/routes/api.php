<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemoController;
use App\Http\Controllers\TagController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('x-demo-token')->group(function () {
    Route::get('/memos', [MemoController::class, 'index']);
    Route::post('/memos', [MemoController::class, 'store']);
    Route::get('/memos/{id}', [MemoController::class, 'show']);
    Route::put('/memos/{id}', [MemoController::class, 'update']);
    Route::delete('/memos/{id}', [MemoController::class, 'destroy']);
    Route::get('/tags', [TagController::class, 'index']);
    Route::post('/tags', [TagController::class, 'store']);
});
