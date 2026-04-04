'use client';

import Navbar from './components/Navbar';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Kiri: Teks */}
          <div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              Richardo Bram Barus
            </h1>
            <p className="text-2xl text-zinc-300 leading-relaxed max-w-lg">
              Mahasiswa Teknik Informatika yang memiliki minat dalam pengembangan 
              <span className="text-cyan-400"> Web</span> dan 
              <span className="text-cyan-400"> Android</span>
            </p>
            <p className="mt-8 text-lg text-zinc-400 max-w-md">
              Mahasiswa Teknik Informatika yang aktif dalam kegiatan organisasi 
              dan memiliki pengalaman kerja lapangan.
            </p>
          </div>

          {/* Kanan: Foto Profil */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-[3rem] overflow-hidden border-8 border-zinc-800 shadow-2xl">
                <Image
                  src="https://ksocdwbjybounpspyhyg.supabase.co/storage/v1/object/public/images/pas%20foto.jpg"
                  alt="Richardo Bram Barus"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  loading="eager" // mempercepat LCP
                />
              </div>
              <div className="absolute -inset-4 border border-cyan-400/30 rounded-[3.5rem] -z-10"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Data Diri Section */}
      <section id="about" className="px-6 pb-24 bg-zinc-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 pt-12">

          {/* Riwayat Pendidikan */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-8">
            <h2 className="text-cyan-400 text-sm font-medium tracking-widest mb-6">RIWAYAT PENDIDIKAN</h2>
            <div className="space-y-6 text-sm">
              <div>
                <div className="font-medium">Universitas Katolik Santo Thomas Medan</div>
                <div className="text-zinc-400">2022 – 2026 • Teknik Informatika</div>
              </div>
              <div>
                <div className="font-medium">SMA Negeri 17 Medan</div>
                <div className="text-zinc-400">2019 – 2022</div>
              </div>
              <div>
                <div className="font-medium">SMP Negeri 31 Medan</div>
                <div className="text-zinc-400">2016 – 2019</div>
              </div>
              <div>
                <div className="font-medium">SD Negeri 065015</div>
                <div className="text-zinc-400">2011 – 2016</div>
              </div>
            </div>
          </div>

          {/* Pengalaman Magang */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-8">
            <h2 className="text-cyan-400 text-sm font-medium tracking-widest mb-6">PENGALAMAN MAGANG</h2>
            <div>
              <div className="font-medium text-lg">Kantor DPRD Kota Medan</div>
              <div className="text-zinc-400 text-sm mt-1">Magang</div>
              <p className="text-zinc-300 mt-6 text-sm">
                Pengalaman kerja lapangan di lingkungan pemerintahan Kota Medan.
              </p>
            </div>
          </div>

          {/* Pengalaman Organisasi */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-8">
            <h2 className="text-cyan-400 text-sm font-medium tracking-widest mb-6">PENGALAMAN ORGANISASI</h2>
            <div>
              <div className="font-medium">Wakil Ketua OKK</div>
              <div className="text-lg mt-2">Banteng Muda Indonesia (BMI) PAC Medan Tuntungan</div>
              <div className="text-emerald-400 text-sm mt-4">2024 — Sekarang</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}