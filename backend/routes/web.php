<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::redirect('/admin', '/login');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Foto beheer routes
    Route::get('/admin/photos', [\App\Http\Controllers\PhotoController::class, 'adminIndex'])->name('photos.index');
    Route::post('/admin/photos', [\App\Http\Controllers\PhotoController::class, 'adminStore'])->name('photos.store');
    Route::delete('/admin/photos/{photo}', [\App\Http\Controllers\PhotoController::class, 'adminDestroy'])->name('photos.destroy');

    // Berichten beheer
    Route::get('/admin/messages', [\App\Http\Controllers\ContactMessageController::class, 'adminIndex'])->name('messages.index');
    Route::delete('/admin/messages/{message}', [\App\Http\Controllers\ContactMessageController::class, 'adminDestroy'])->name('messages.destroy');
});

require __DIR__.'/auth.php';
