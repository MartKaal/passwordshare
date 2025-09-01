<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShareController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/share', function () {
    return Inertia::render('share');
})->name('share');

// Default share password
Route::post('/share', function () {
    return (new ShareController())->store();
})->name('share.store');

// Share password with UUID
Route::post('/share/{uuid}', function ($uuid) {
    return (new ShareController())->show($uuid);
})->name('share.show');