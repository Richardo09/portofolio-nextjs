'use client';

import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SertifikatPage() {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [certificates, setCertificates] = useState<any[]>([]);

  //  ambil data dari Supabase
  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*');

      if (error) {
        console.error('Error:', error);
      } else {
        setCertificates(data);
      }
    };

    fetchCertificates();
  }, []);

  //  ambil kategori unik otomatis
  const categories = ['Semua', ...new Set(certificates.map(cert => cert.category))];

  //  filter jalan otomatis
  const filteredCertificates =
    activeFilter === 'Semua'
      ? certificates
      : certificates.filter(cert => cert.category === activeFilter);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="pt-20 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter mb-3">
            Sertifikat & Penghargaan
          </h1>
          <p className="text-zinc-400 text-lg">
            Daftar sertifikat dan pencapaian yang telah saya raih
          </p>
        </div>

        {/*  FILTER DINAMIS */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`px-8 py-3 rounded-3xl font-medium transition-all ${
                activeFilter === item
                  ? 'bg-cyan-400 text-zinc-950'
                  : 'border border-zinc-700 hover:border-zinc-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/*  CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 hover:border-cyan-400 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-5 py-2 text-sm bg-zinc-800 rounded-3xl">
                  {cert.category}
                </span>
                <div className="text-sm text-zinc-400">
                  {cert.date}
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400">
                {cert.title}
              </h3>

              <p className="text-zinc-400 text-sm mb-10">
                {cert.issuer}
              </p>

              <a
                href={cert.pdf}
                target="_blank"
                className="flex justify-center border border-cyan-400 hover:bg-cyan-400 hover:text-zinc-950 text-cyan-400 py-4 rounded-3xl transition-all"
              >
                Buka Sertifikat PDF ↗
              </a>
            </div>
          ))}
        </div>

        {/*  EMPTY STATE */}
        {filteredCertificates.length === 0 && (
          <p className="text-center text-zinc-400 py-20 text-lg">
            Belum ada sertifikat.
          </p>
        )}
      </div>
    </div>
  );
}