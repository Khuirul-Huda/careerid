<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gemini\Data\Blob;
use Gemini\Enums\MimeType;
use Gemini;
use Inertia\Inertia;

class GeminiController extends Controller
{
    /**
     * Analisis CV ATS dari gambar yang diunggah.
     */
    public function analyzeCV(Request $request)
    {


        $file = $request->file('file');

        $client = Gemini::client(env("GEMINI_API_KEY"));
        $response = $client
            ->geminiFlash()
            ->generateContent([
                'Kamu adalah AI dari CareerID. Tugasmu adalah menganalisis CV berbasis gambar. Skor ATS-nya dari 1-10, lalu berikan saran perbaikan format/konten/kata kunci. Jika gambar bukan CV, berikan tanggapan lucu dan santai. Tambahkan emoji secukupnya.',
                new Blob(
                    mimeType: MimeType::from($file->getMimeType()),
                    data: base64_encode(file_get_contents($file->getRealPath()))
                )
            ]);

        return response()->json([
            'response' => $response->text()
        ]);
    }

    /**
     * Analisis kontrak kerja dari file yang diunggah.
     */
    public function analyzeContract(Request $request)
    {
        $file = $request->file('file');

        $client = Gemini::client(env("GEMINI_API_KEY"));
        $response = $client
            ->geminiFlash()
            ->generateContent([
                'Kamu adalah AI dari CareerID yang bertugas meninjau kontrak kerja. Evaluasi apakah kontrak ini menguntungkan bagi pekerja. Soroti poin-poin rawan, ambigu, atau janggal. Berikan saran & klarifikasi.',
                new Blob(
                    mimeType: MimeType::from($file->getMimeType()),
                    data: base64_encode(file_get_contents($file->getRealPath()))
                )
            ]);

        return response()->json([
            'response' => $response->text()
        ]);
    }

    /**
     * Generate surat lamaran kerja berdasarkan data dari form.
     */
    public function generateLetter(Request $request)
    {
        $nama = $request->input('nama');
        $posisi = $request->input('posisi');
        $perusahaan = $request->input('perusahaan');
        $skills = $request->input('skills');

        $client = Gemini::client(env("GEMINI_API_KEY"));
        $response = $client
            ->geminiPro()
            ->generateContent("Buatkan surat lamaran kerja untuk $nama yang ingin melamar posisi $posisi di $perusahaan. Soroti pengalaman dan skill: $skills. Gunakan bahasa profesional dan sopan, maksimal 1 halaman.");

        return response()->json([
            'response' => $response->text()
        ]);
    }

    /**
     * Fitur konsultasi AI – tanya-jawab umum seputar dunia kerja.
     */
    public function askAssistant(Request $request)
    {
        $pertanyaan = $request->input('question');

        $client = Gemini::client(env("GEMINI_API_KEY"));
        $response = $client
            ->geminiFlash()
            ->generateContent("Kamu adalah CareerBot dari CareerID. Jawablah pertanyaan pengguna seputar dunia kerja: $pertanyaan. Gunakan bahasa santai namun informatif, seperti mentor yang suportif.");

        return response()->json([
            'response' => $response->text()
        ]);
    }
}
