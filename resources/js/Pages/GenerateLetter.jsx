"use client";
import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";

export default function GenerateLetter() {
  const [formData, setFormData] = useState({
    nama: "",
    tanggal: "",
    alasan: "",
  });

  const [generatedText, setGeneratedText] = useState("");
  const letterRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateLetter = () => {
    const { nama, tanggal, alasan } = formData;
    const surat = `Kepada Yth. HRD\n\nSaya yang bertanda tangan di bawah ini:\nNama: ${nama}\nDengan ini mengajukan izin tidak masuk kerja pada tanggal ${tanggal} dikarenakan ${alasan}.\n\nDemikian surat ini saya buat. Terima kasih.\n\nHormat saya,\n${nama}`;
    setGeneratedText(surat);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Times", "normal");
    doc.setFontSize(12);

    // Membungkus teks jadi array baris dengan maxWidth 170 (A4 dengan margin 20 kiri-kanan)
    const lines = doc.splitTextToSize(generatedText, 170);
    doc.text(lines, 20, 30);

    doc.save("surat-izin.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        Generate Surat Izin Tidak Masuk Kerja
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Isi form berikut, kami bantu buatkan surat izinnya.
      </p>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <input
          type="text"
          name="nama"
          placeholder="Nama lengkap"
          value={formData.nama}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="date"
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          name="alasan"
          placeholder="Alasan tidak masuk kerja"
          value={formData.alasan}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <button
          onClick={generateLetter}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Buat Surat
        </button>
      </div>

      {generatedText && (
        <div className="mt-6 bg-gray-50 border rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-2">Hasil Surat:</h2>
          <pre
            ref={letterRef}
            className="text-gray-800 whitespace-pre-wrap break-words"
            style={{ wordBreak: "break-word" }}
          >
            {generatedText}
          </pre>

          <button
            onClick={exportPDF}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Export ke PDF
          </button>
        </div>
      )}
    </div>
  );
}
