import { Sparkles, FileText, ClipboardList, MessageCircle, MailOpen } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full text-center space-y-8">
        <div>
          <h1 className="text-5xl font-extrabold text-blue-700 flex justify-center items-center gap-2">
            <Sparkles className="text-yellow-500 w-8 h-8" />
            CareerID
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Platform cerdas untuk mendukung perjalanan kariermu — dari CV hingga kontrak kerja!
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Fitur Unggulan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-blue-600" />}
              label="Analisis CV"
              href="analyze/cv"
            />

            <FeatureCard
              icon={<ClipboardList className="w-6 h-6 text-green-600" />}
              label="Analisis Kontrak Kerja"
              href="/analyze/contract"
            />

            <FeatureCard
              icon={<MailOpen className="w-6 h-6 text-purple-600" />}
              label="Generator Surat Lamaran"
              href="/generate/letter"
            />

            <FeatureCard
              icon={<MessageCircle className="w-6 h-6 text-pink-600" />}
              label="Konsultasi dengan Asisten AI"
              href="/consultation/ai"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, label, href }) {
  const Wrapper = href ? 'a' : 'button';

  return (
    <Wrapper
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className="group border border-gray-300 rounded-2xl px-6 py-5 bg-white hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 justify-center">
        {icon}
        <span className="text-gray-800 text-lg font-medium group-hover:text-blue-700 transition-colors">
          {label}
        </span>
      </div>
    </Wrapper>
  );
}
