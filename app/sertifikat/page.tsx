'use client';

import Navbar from '../components/Navbar';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

type Certificate = {
  id: number | string;
  title: string;
  issuer: string;
  category: string;
  date: string;
  pdf?: string | null;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function SertifikatPage() {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error:', error);
        setCertificates([]);
      } else {
        setCertificates((data || []) as Certificate[]);
      }

      setLoading(false);
    };

    fetchCertificates();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(certificates.map((cert) => cert.category).filter(Boolean))
    );

    return ['Semua', ...uniqueCategories];
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    if (activeFilter === 'Semua') return certificates;
    return certificates.filter((cert) => cert.category === activeFilter);
  }, [activeFilter, certificates]);

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Navbar />

      {/* Background Decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 70, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-28 left-8 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-80 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%),linear-gradient(to_bottom,rgba(9,9,11,0.25),#09090b)]" />
      </div>

      <section className="px-6 pb-24 pt-24 md:pt-28">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="mb-12 max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 shadow-lg shadow-cyan-500/5 backdrop-blur"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
              Sertifikat & Penghargaan
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="text-5xl font-black tracking-tighter md:text-7xl"
            >
              Sertifikat{' '}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                & Penghargaan
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="mt-5 text-lg leading-relaxed text-zinc-400 md:text-xl"
            >
              Daftar sertifikat dan pencapaian yang telah saya raih
            </motion.p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            className="mb-12 flex flex-wrap gap-3 rounded-4xl border border-zinc-800 bg-zinc-900/60 p-3 shadow-xl shadow-black/20 backdrop-blur"
          >
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all md:px-7 ${
                  activeFilter === item
                    ? 'bg-cyan-400 text-zinc-950 shadow-lg shadow-cyan-500/20'
                    : 'border border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-300'
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-120 animate-pulse rounded-4xl border border-zinc-800 bg-zinc-900/70"
                />
              ))}
            </div>
          )}

          {/* Cards */}
          {!loading && filteredCertificates.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCertificates.map((cert) => {
                const isExpanded = expandedId === cert.id;

                return (
                  <motion.article
                    key={cert.id}
                    variants={fadeUp}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    whileHover={{ y: -8 }}
                    className="group flex h-full min-h-120 flex-col overflow-hidden rounded-4xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/25 backdrop-blur transition-colors hover:border-cyan-400/40"
                  >
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                        {cert.category}
                      </span>

                      <span className="rounded-full border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-xs font-semibold text-zinc-400">
                        {cert.date}
                      </span>
                    </div>

                    <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-4xl shadow-lg shadow-cyan-500/5 transition-transform group-hover:rotate-6 group-hover:scale-105">
                      📄
                    </div>

                    <h3 className="mb-5 line-clamp-3 min-h-24 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-300">
                      {cert.title}
                    </h3>

                    <div className="mb-4 rounded-3xl border border-zinc-800 bg-zinc-950/40 p-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                        Keterangan
                      </p>

                      <div className="h-20 overflow-hidden">
                        <p
                          className={`text-sm leading-relaxed text-zinc-300 ${
                            isExpanded ? 'max-h-20 overflow-y-auto pr-2' : 'line-clamp-2'
                          }`}
                        >
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : cert.id)}
                      className="mb-6 w-fit text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                      {isExpanded ? 'Tutup' : 'Lihat selengkapnya'}
                    </button>

                    <a
                      href={cert.pdf || '#'}
                      target={cert.pdf ? '_blank' : undefined}
                      rel={cert.pdf ? 'noopener noreferrer' : undefined}
                      className={`mt-auto block rounded-2xl py-3.5 text-center text-sm font-bold transition-all ${
                        cert.pdf
                          ? 'border border-cyan-400/70 text-cyan-300 hover:-translate-y-1 hover:bg-cyan-400 hover:text-zinc-950 hover:shadow-lg hover:shadow-cyan-500/20'
                          : 'cursor-not-allowed border border-zinc-700 text-zinc-500'
                      }`}
                    >
                      {cert.pdf ? 'Buka Sertifikat PDF ↗' : 'PDF belum tersedia'}
                    </a>
                  </motion.article>
                );
              })}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-4xl border border-zinc-800 bg-zinc-900/70 px-6 py-20 text-center shadow-xl shadow-black/20 backdrop-blur"
            >
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-cyan-400/10 text-3xl">
                📄
              </div>
              <h2 className="text-2xl font-bold text-white">Belum ada sertifikat.</h2>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
