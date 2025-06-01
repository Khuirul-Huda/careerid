export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">CareerID</h1>
        <p className="text-gray-600 mb-10">
          Penjelasan mengenai apa itu CareerID dan apa guannya
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Fitur CareerID</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border border-gray-300 rounded-3xl p-8">
          <button className="border border-gray-400 rounded-xl py-4 px-6 text-gray-800 hover:bg-gray-100 transition">
            Analisis CV
          </button>
          <button className="border border-gray-400 rounded-xl py-4 px-6 text-gray-800 hover:bg-gray-100 transition">
            Analisis Kontrak Kerja
          </button>
          <button className="border border-gray-400 rounded-xl py-4 px-6 text-gray-800 hover:bg-gray-100 transition">
            Generator Surat Izin
          </button>
          <button className="border border-gray-400 rounded-xl py-4 px-6 text-gray-800 hover:bg-gray-100 transition">
            Konsultasi dengan Asisten AI
          </button>
        </div>
      </div>
    </div>
  );
}
