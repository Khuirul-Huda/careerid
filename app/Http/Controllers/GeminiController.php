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

                } Jika yang diunggah bukan cv, maka respon dengan format JSON seperti ini:
                {
                    "skor": 0,
                    "saran": [
                        {
                            "judul": "Bukan CV",
                            "deskripsi": "Gambar yang diunggah bukan merupakan CV. Silakan unggah gambar CV yang valid."
                        }
                    ]
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
        } Jika yang diunggah bukan kontrak kerja, maka respon dengan format JSON seperti ini:
        {
            "judul": "Bukan Kontrak Kerja",
            "saran": [
                {
                    "judul": "Bukan Kontrak",
                    "deskripsi": "File yang diunggah bukan merupakan kontrak kerja. Silakan unggah file kontrak kerja yang valid."
                }
            ]
        } Jawabnya jangan terlalu sinis gitu gan, ceria saja kasih emot apa kek biar usernya senang. Jangan lupa tambahkan emoji secukupnya.',
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
    public function generateProfessionalLetter(Request $request)
    {
        // Validasi jenis surat yang diminta
        $request->validate([
            'letterType' => 'required|string|in:lamaran,resign,cuti,izin',
        ]);

        $letterType = $request->input('letterType');
        $prompt = '';
        $data = [];
        $validationRules = [];

        // Menggunakan Switch untuk menentukan validasi dan prompt berdasarkan jenis surat
        switch ($letterType) {
            case 'lamaran':
                $validationRules = [
                    'namaLengkap' => 'required|string|max:100',
                    'posisi' => 'required|string|max:100',
                    'namaPerusahaan' => 'required|string|max:100',
                    'skills' => 'required|string|max:500',
                ];
                $data = $request->validate($validationRules);
                $prompt = $this->createLamaranPrompt($data);
                break;

            case 'resign':
                $validationRules = [
                    'namaLengkap' => 'required|string|max:100',
                    'posisi' => 'required|string|max:100',
                    'namaPerusahaan' => 'required|string|max:100',
                    'tanggalResign' => 'required|date',
                    'namaAtasan' => 'required|string|max:100',
                ];
                $data = $request->validate($validationRules);
                $prompt = $this->createResignPrompt($data);
                break;

            case 'cuti':
                $validationRules = [
                    'namaLengkap' => 'required|string|max:100',
                    'posisi' => 'required|string|max:100',
                    'tanggalMulai' => 'required|date',
                    'tanggalSelesai' => 'required|date',
                    'alasanCuti' => 'required|string|max:500',
                ];
                $data = $request->validate($validationRules);
                $prompt = $this->createCutiPrompt($data);
                break;

            case 'izin':
                $validationRules = [
                    'namaLengkap' => 'required|string|max:100',
                    'posisi' => 'required|string|max:100',
                    'tanggalIzin' => 'required|date',
                    'alasanIzin' => 'required|string|max:500',
                ];
                $data = $request->validate($validationRules);
                $prompt = $this->createIzinPrompt($data);
                break;
        }

        // Panggil Gemini API jika prompt berhasil dibuat
        try {
            $client = Gemini::client(env("GEMINI_API_KEY"));
            $response = $client->geminiFlash()->generateContent($prompt);

            return response()->json(['letterText' => $response->text()]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menghubungi layanan AI. Coba lagi nanti.'.$e], 500);
        }
    }

    // --- Helper Functions untuk membuat Prompt ---

    private function createLamaranPrompt($data) {
        return "Tugasmu adalah AI career coach dari Career.ID. Buatkan surat lamaran kerja yang profesional dan meyakinkan untuk:
        - Nama Pelamar: {$data['namaLengkap']}
        - Posisi yang Dilamar: {$data['posisi']}
        - Nama Perusahaan Tujuan: {$data['namaPerusahaan']}
        - Sorot skill dan pengalaman berikut: {$data['skills']}
        Instruksi: Gunakan format surat resmi, bahasa formal, dan struktur yang rapi (pembuka, isi yang menyorot kualifikasi, penutup). Buat surat yang ringkas namun berdampak. Tuliskan kota dan tanggal hari ini (Semarang, " . date('d F Y') . ") di awal surat.";
    }

    private function createResignPrompt($data) {
        return "Tugasmu adalah AI konsultan HR dari Career.ID. Buatkan surat pengunduran diri yang sopan, profesional, dan menjaga hubungan baik untuk:
        - Nama Karyawan: {$data['namaLengkap']}
        - Jabatan Terakhir: {$data['posisi']}
        - Nama Perusahaan: {$data['namaPerusahaan']}
        - Nama Atasan/Penerima: {$data['namaAtasan']}
        - Tanggal Efektif Resign: " . date('d F Y', strtotime($data['tanggalResign'])) . "
        Instruksi: Sampaikan terima kasih atas kesempatan, nyatakan pengunduran diri dengan jelas, dan tawarkan bantuan untuk proses transisi. Gunakan format surat resmi. Tuliskan kota dan tanggal hari ini (Semarang, " . date('d F Y') . ") di awal surat.";
    }

    private function createCutiPrompt($data) {
        return "Tugasmu adalah AI asisten administrasi dari Career.ID. Buatkan surat permohonan izin cuti tahunan yang formal untuk:
        - Nama Karyawan: {$data['namaLengkap']}
        - Jabatan: {$data['posisi']}
        - Tanggal Mulai Cuti: " . date('d F Y', strtotime($data['tanggalMulai'])) . "
        - Tanggal Selesai Cuti: " . date('d F Y', strtotime($data['tanggalSelesai'])) . "
        - Alasan Cuti: {$data['alasanCuti']}
        Instruksi: Surat ditujukan kepada 'Yth. Bapak/Ibu Pimpinan HRD'. Sampaikan permohonan dengan jelas dan sopan. Gunakan format surat resmi. Tuliskan kota dan tanggal hari ini (Semarang, " . date('d F Y') . ") di awal surat.";
    }

    private function createIzinPrompt($data) {
        return "Tugasmu adalah AI asisten administrasi dari Career.ID. Buatkan surat izin tidak masuk kerja yang singkat dan jelas untuk:
        - Nama Karyawan: {$data['namaLengkap']}
        - Jabatan: {$data['posisi']}
        - Tanggal Izin: " . date('d F Y', strtotime($data['tanggalIzin'])) . "
        - Alasan Izin: {$data['alasanIzin']}
        Instruksi: Surat ditujukan kepada 'Yth. Bapak/Ibu Pimpinan'. Sampaikan permohonan izin dengan ringkas. Gunakan format surat resmi. Tuliskan kota dan tanggal hari ini (Semarang, " . date('d F Y') . ") di awal surat.";
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
