"use client";
import React, { useState, useEffect, useRef } from "react";

export default function ConsultationWithAI() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]); // [{ role: 'user'|'assistant', text: '' }]
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  // Scroll otomatis ke bawah saat chatLog berubah
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input.trim() };
    setChatLog((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Panggil API backend kita yang menghubungkan ke Gemini API
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.text }),
      });
      const data = await res.json();

      if (res.ok) {
        setChatLog((prev) => [...prev, { role: "assistant", text: data.answer }]);
      } else {
        setChatLog((prev) => [
          ...prev,
          { role: "assistant", text: "Maaf, terjadi kesalahan saat memproses pertanyaan Anda." },
        ]);
      }
    } catch (error) {
      setChatLog((prev) => [
        ...prev,
        { role: "assistant", text: "Gagal menghubungi server. Coba lagi nanti." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">Konsultasi dengan Asisten AI</h1>
      <p className="text-center mb-4 text-gray-600">
        Tanyakan seputar dunia kerja dan dapatkan jawaban cepat dari asisten AI kami.
      </p>

      <div className="flex-1 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-4">
        {chatLog.length === 0 && (
          <p className="text-gray-500 text-center">Mulai dengan mengetik pertanyaanmu di bawah.</p>
        )}
        {chatLog.map((chat, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] p-3 rounded-lg ${
              chat.role === "user" ? "bg-blue-600 text-white self-end" : "bg-white border"
            }`}
          >
            {chat.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex space-x-2">
        <textarea
          className="flex-1 border border-gray-300 rounded-lg p-2 resize-none"
          rows={2}
          placeholder="Tulis pertanyaanmu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </div>
    </div>
  );
}
