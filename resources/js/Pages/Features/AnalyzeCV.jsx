import React, { useState } from "react";

export default function AnalyzeCV() {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic analisis file CV di sini
    console.log("File CV uploaded:", file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Analisis CV
        </h1>
        <p className="text-center text-gray-600">
          Upload CV kamu untuk dianalisis.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            className="w-full border border-gray-300 rounded px-4 py-2"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Lakukan Analisis
          </button>
        </form>
        <div className="border border-gray-200 rounded-xl p-4 min-h-[100px] text-center text-gray-500">
          Hasil analisis
        </div>
      </div>
    </div>
  );
}
