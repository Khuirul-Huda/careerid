<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gemini\Data\Blob;
use Gemini\Enums\MimeType;
use Gemini;

class GeminiController extends Controller
{
    /**
     * Analyze the file using Gemini AI Google API with inline base64-encoded data.
     * @param Request $request
     * 
     */
    public function analyze(Request $request)
    {
        $nama = $request->input('nama');

        $client = Gemini::client(env("GEMINI_API_KEY"));
        $result = $client
            ->geminiFlash()
            ->generateContent([
                'Kamu adalah AI as a service bernama CareerID yang menganalisis CV ATS secara detail. Terima gambar CV dari pengguna dan lakukan langkah-langkah berikut: 1️ Jika CV memenuhi standar ATS, beri skor berdasarkan keterbacaan, kata kunci, dan struktur. Skala 1-10, dengan penjelasan mengapa mendapatkan skor tersebut. 2️ Berikan saran perbaikan agar CV lebih optimal dan lolos seleksi ATS. Sertakan tips tentang format, kata kunci, dan kejelasan informasi. 3️ Jika gambar bukan CV ATS, jelaskan gambar tersebut dengan humor! Misalnya, kalau gambarnya foto kucing, katakan: ‘Ini bukan CV, tapi kandidat untuk posisi Chief Meow Officer 🐱’ 4️ Tampilkan semua informasi dengan bahasa santai, interaktif, dan  emoji secukupnya agar lebih menarik.

Jawablah dengan format yang jelas, dengan pemisahan antara skor, analisis, dan humor dengan heading yang sesuai, masing masing diberi jarak atau spasi yang sesuai.',
                new Blob(
                    mimeType: MimeType::from($request->file('file')->getMimeType()),
                    data: base64_encode(
                        file_get_contents($request->file('file')->getRealPath())
                    )
                )
            ]);

            return view('welcome', ['response' => $result->text()]);
    }

    public function generate(Request $request)
    {
        $client = Gemini::client(env("GEMINI_API_KEY"));
        $result = $client
            ->geminiFlash()
            ->generateContent([
                'Kamu adalah AI as a service bernama CareerID yang menganalisis CV ATS secara detail. Terima gambar CV dari pengguna dan lakukan langkah-langkah berikut: 1️ Jika CV memenuhi standar ATS, beri skor berdasarkan keterbacaan, kata kunci, dan struktur. Skala 1-10, dengan penjelasan mengapa mendapatkan skor tersebut. 2️ Berikan saran perbaikan agar CV lebih optimal dan lolos seleksi ATS. Sertakan tips tentang format, kata kunci, dan kejelasan informasi. 3️ Jika gambar bukan CV ATS, jelaskan gambar tersebut dengan humor! Misalnya, kalau gambarnya foto kucing, katakan: ‘Ini bukan CV, tapi kandidat untuk posisi Chief Meow Officer 🐱’ 4️ Tampilkan semua informasi dengan bahasa santai, interaktif, dan  emoji secukupnya agar lebih menarik.

Jawablah dengan format yang jelas, dengan pemisahan antara skor, analisis, dan humor dengan heading yang sesuai, masing masing diberi jarak atau spasi yang sesuai.',
                new Blob(
                    mimeType: MimeType::from($request->file('file')->getMimeType()),
                    data: base64_encode(
                        file_get_contents($request->file('file')->getRealPath())
                    )
                )
            ]);

            return view('welcome', ['response' => $result->text()]);
    }
}