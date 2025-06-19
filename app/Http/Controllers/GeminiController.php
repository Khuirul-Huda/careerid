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
                'Kamu adalah AI dari CareerID. Tugasmu adalah menganalisis CV berbasis gambar. Skor ATS-nya dari 1-10, lalu berikan saran perbaikan format/konten/kata kunci. Jika gambar bukan CV, berikan tanggapan lucu dan santai. Tambahkan emoji secukupnya. 
                return hasil analisis dalam format JSON. {
                    "skor": 80,
                    "saran": [ {
                        "judul": "Perbaiki tata letak",
                        "deskripsi": "Pastikan informasi penting seperti nama, kontak, dan pengalaman kerja mudah ditemukan."
                    }, {
                        "judul": "Gunakan kata kunci yang relevan",
                        "deskripsi": "Sertakan kata kunci yang sesuai dengan posisi yang dilamar untuk meningkatkan peluang lolos ATS."
                    }]
                }',
                new Blob(
                    mimeType: MimeType::from($file->getMimeType()),
                    data: base64_encode(file_get_contents($file->getRealPath()))
                )
            ]);
//dd($response->text());
        return response()->json(
             json_decode($cleaned = str_replace(['```', 'json'], '', $response->text())),
        );
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
        'Kamu adalah AI dari CareerID. Tugasmu adalah menganalisis kontrak kerja dan menilai potensi risiko, ketidakadilan, ambiguitas, atau pelanggaran terhadap hak pekerja. Sajikan hasil analisis dalam format JSON berikut:
        {
            "judul": "Hasil Analisis Kontrak",
            "saran": [
                {
                    "judul": "Contoh: Gaji Tidak Jelas",
                    "deskripsi": "Gaji ditulis dengan tanda kurung dan tanpa nilai nominal. Hal ini dapat menimbulkan kesalahpahaman dan ketidakpastian bagi pekerja."
                },
                {
                    "judul": "Pasal 4: Waktu Kontrak Tidak Terdefinisi",
                    "deskripsi": "Tidak ada tanggal mulai dan selesai kontrak, hal ini menyulitkan evaluasi dan perlindungan hukum bagi pekerja."
                }
            ]
        }',
        new Blob(
            mimeType: MimeType::from($file->getMimeType()),
            data: base64_encode(file_get_contents($file->getRealPath()))
        )
    ]);

return response()->json(
    json_decode(str_replace(['```', 'json'], '', $response->text()))
);
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
