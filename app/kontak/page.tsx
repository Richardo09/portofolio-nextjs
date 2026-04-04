// app/kontak/page.tsx

import Navbar from '../components/Navbar';
import {
  FaWhatsapp,
  FaInstagram,
  FaTelegram,
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa';

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold tracking-tighter mb-6">
          Mari Terhubung
        </h1>
        <p className="text-xl text-zinc-400 max-w-lg mx-auto">
          Berikut adalah kontak dan media sosial saya yang aktif dan dapat dihubungi saya selalu terbuka untuk diskusi dan lainnya terbuka untuk umum
        </p>

        {/* GRID */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {/* WhatsApp */}
          <a 
            href="https://wa.me/623870211278" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-900 border border-zinc-700 hover:border-green-500 rounded-3xl p-8 flex flex-col items-center gap-4 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]"
          >
            <FaWhatsapp className="text-5xl text-green-500 group-hover:scale-110 transition" />
            <div>
              <div className="font-semibold text-lg">WhatsApp</div>
              <div className="text-green-400 text-sm">Chat Langsung</div>
            </div>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/ardobars" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-900 border border-zinc-700 hover:border-pink-500 rounded-3xl p-8 flex flex-col items-center gap-4 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)]"
          >
            <FaInstagram className="text-5xl text-pink-500 group-hover:scale-110 transition" />
            <div>
              <div className="font-semibold text-lg">Instagram</div>
              <div className="text-pink-400 text-sm">@ardobars</div>
            </div>
          </a>

          {/* Telegram */}
          <a 
            href="https://t.me/Ardobars" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-900 border border-zinc-700 hover:border-sky-400 rounded-3xl p-8 flex flex-col items-center gap-4 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]"
          >
            <FaTelegram className="text-5xl text-sky-400 group-hover:scale-110 transition" />
            <div>
              <div className="font-semibold text-lg">Telegram</div>
              <div className="text-sky-400 text-sm">@Ardobars</div>
            </div>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/Richardo09" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-900 border border-zinc-700 hover:border-white rounded-3xl p-8 flex flex-col items-center gap-4 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            <FaGithub className="text-5xl text-white group-hover:scale-110 transition" />
            <div>
              <div className="font-semibold text-lg">GitHub</div>
              <div className="text-zinc-300 text-sm">richardobram</div>
            </div>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/richardo-bram-barus-b7a44b398/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-zinc-900 border border-zinc-700 hover:border-blue-500 rounded-3xl p-8 flex flex-col items-center gap-4 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
          >
            <FaLinkedin className="text-5xl text-blue-500 group-hover:scale-110 transition" />
            <div>
              <div className="font-semibold text-lg">LinkedIn</div>
              <div className="text-blue-400 text-sm">Richardo Bram Barus</div>
            </div>
          </a>

        </div>

        {/* EMAIL SECTION */}
        <div className="mt-20 flex flex-col items-center gap-3">
          <p className="text-zinc-400">Atau kirim email ke</p>

          <a 
            href="mailto:exampel5@gmail.com" 
            className="flex items-center gap-3 text-cyan-400 text-2xl font-medium hover:underline"
          >
            <FaEnvelope className="text-2xl" />
            rikardobarus015@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}
