<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudyLogController;
use App\Http\Controllers\SubjectController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/study-logs', [StudyLogController::class, 'index']);
Route::post('/study-logs', [StudyLogController::class, 'store']);
Route::put('/study-logs/{id}', [StudyLogController::class, 'update']);
Route::delete('/study-logs/{id}', [StudyLogController::class, 'destroy']);

Route::get('/subjects', [SubjectController::class, 'index']);
