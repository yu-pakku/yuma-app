<?php

use Illuminate\Http\Request;
use App\Http\Controllers\MemoController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('memos', MemoController::class);