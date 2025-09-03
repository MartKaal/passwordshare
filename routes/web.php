<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShareController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Default share password
Route::get('/share', function () {
    return Inertia::render('share');
})->name('share');

// Share password with UUID
Route::get('/share/{uuid}', function ($uuid) {
    return Inertia::render('share', ['uuid' => $uuid]);
})->name('share');

// Post shared password
Route::post('/share', [ShareController::class, 'store'])->name('share.store');

// Get Shared Password
Route::get('/api/share/{uuid}', [ShareController::class, 'show'])->name('share.show');