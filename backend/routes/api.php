<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/contact', [\App\Http\Controllers\ContactMessageController::class, 'store']);

use App\Http\Controllers\PhotoController;

Route::get('/photos', [PhotoController::class, 'index']);
Route::post('/photos', [PhotoController::class, 'store']);
Route::delete('/photos/{photo}', [PhotoController::class, 'destroy']);
