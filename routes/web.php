<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing Page
Route::get('/', function () {
    return Inertia::render('Landing');
});

// Fitur Analisis CV
Route::get('/analyze/cv', function () {
    return Inertia::render('AnalyzeCV');
});

// Fitur Generate Surat Lamaran
Route::get('/generate/letter', function () {
    return Inertia::render('GenerateLetter');
});

// Fitur Analisis Kontrak Kerja
Route::get('/analyze/contract', function () {
    return Inertia::render('AnalyzeContract');
});

// Fitur Konsultasi dengan AI
Route::get('/consultation/ai', function () {
    return Inertia::render('ConsultationWithAI');
});

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
