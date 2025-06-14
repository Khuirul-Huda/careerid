<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GeminiController;


Route::post('/gemini/analyze-cv', [GeminiController::class, 'analyzeCV'])->name('gemini.analyze.cv');
Route::post('/gemini/analyze-contract', [GeminiController::class, 'analyzeContract']);
Route::post('/gemini/generate-letter', [GeminiController::class, 'generateLetter']);
Route::post('/gemini/ask-assistant', [GeminiController::class, 'askAssistant']);

Route::get('/', function () {
    return Inertia::render('Auth/marketing-page/MarketingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    // Landing Page
    Route::get('/dashboard', function () {
        return Inertia::render('Main/Dashboard');
    })->name('dashboard');

    // Fitur Analisis CV
    Route::get('/analyze/cv', function () {
        return Inertia::render('Main/CVAnalysis');
    })->name('analyze.cv');
    Route::post('/analyze/cv', [\App\Http\Controllers\GeminiController::class, 'analyze'])->name('analyze.cv');

    // Fitur Generate Surat Lamaran
    Route::get('/generate/letter', function () {
        return Inertia::render('Main/LetterGenerator');
    })->name('generate.letter');

    // Fitur Analisis Kontrak Kerja
    Route::get('/analyze/contract', function () {
        return Inertia::render('Main/ContractAnalysis');
    })->name('analyze.contract');
    Route::post('/analyze/contract', [\App\Http\Controllers\GeminiController::class, 'analyzeContract'])->name('analyze.contract');

    // Fitur Konsultasi dengan AI
    Route::get('/consultation/ai', function () {
        return Inertia::render('Main/AIConsultation', ['csrfToken' => csrf_token()]);
    })->name('ai.consultation');
    Route::post('/consultation/ai', [\App\Http\Controllers\GeminiController::class, 'askAssistant'])->name('ai.consultation');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
