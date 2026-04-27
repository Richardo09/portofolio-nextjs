'use client';

import Navbar from './components/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const educationData = [
  {
    school: 'Universitas Katolik Santo Thomas Medan',
    year: '2022 – 2026',
    major: 'Teknik Informatika',
  },
  {
    school: 'SMA Negeri 17 Medan',
    year: '2019 – 2022',
    major: 'Ilmu Pengetahuan Alam',
  },
  {
    school: 'SMP Negeri 31 Medan',
    year: '2016 – 2019',
    major: 'Sekolah Menengah Pertama',
  },
  {
    school: 'SD Negeri 065015',
    year: '2011 – 2016',
    major: 'Sekolah Dasar',
  },
];


export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Navbar />

      {/* Background Decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 60, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 90, 0],
            scale: [1, 1.18, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-72 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%),linear-gradient(to_bottom,rgba(9,9,11,0.15),#09090b)]" />
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          {/* Kiri: Teks */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="relative z-10"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 shadow-lg shadow-cyan-500/5 backdrop-blur"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              </span>
              Portfolio Pribadi
            </motion.div>

            <motion.h1
              variants={fadeLeft}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl"
            >
              Richardo Bram{' '}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Barus
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-7 max-w-xl text-xl leading-relaxed text-zinc-300 md:text-2xl"
            >
              Mahasiswa Teknik Informatika yang memiliki minat dalam pengembangan
              <span className="font-semibold text-cyan-400"> Web</span> dan
              <span className="font-semibold text-cyan-400"> Android</span>.
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 md:text-lg"
            >
              Aktif dalam kegiatan organisasi, terbiasa bekerja secara tim, dan memiliki pengalaman kerja lapangan di lingkungan pemerintahan.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-10 flex"
            >
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-cyan-500/30"
              >
                Lihat Data Diri
              </a>
            </motion.div>
          </motion.div>

          {/* Kanan: Foto Profil */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.18 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="absolute -inset-4 rounded-[3.5rem] bg-linear-to-br from-cyan-400/40 via-blue-500/10 to-transparent blur-2xl" />
                <div className="relative h-80 w-80 overflow-hidden rounded-[3rem] border border-cyan-400/20 bg-zinc-900 p-3 shadow-2xl shadow-cyan-500/10 md:h-96 md:w-96">
                  <div className="h-full w-full overflow-hidden rounded-[2.4rem] border border-zinc-800">
                    <Image
                      src="https://ksocdwbjybounpspyhyg.supabase.co/storage/v1/object/public/images/pas%20foto.jpg"
                      alt="Richardo Bram Barus"
                      width={500}
                      height={500}
                      priority
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -right-4 -top-4 z-20 grid h-20 w-20 place-items-center rounded-full border border-cyan-400/30 bg-zinc-950/80 text-center text-xs font-semibold text-cyan-300 shadow-xl shadow-cyan-500/10 backdrop-blur"
              >
                TI
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute -bottom-7 left-1/2 z-20 w-[88%] -translate-x-1/2 rounded-3xl border border-zinc-700 bg-zinc-900/90 p-4 shadow-2xl shadow-black/30 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">Status</p>
                    <p className="font-semibold text-white">Mahasiswa Aktif</p>
                  </div>
                  <div className="rounded-2xl bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                    2022 - 2026
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Diri Section */}
      <section id="about" className="relative px-6 pb-24 pt-12 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mb-10 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
              Tentang Saya
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Data Diri & Pengalaman
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Ringkasan pendidikan, pengalaman magang, dan pengalaman organisasi yang pernah saya jalani.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {/* Riwayat Pendidikan */}
            <motion.article
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl shadow-black/20 backdrop-blur transition-colors hover:border-cyan-400/40"
            >
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
                  RIWAYAT PENDIDIKAN
                </h2>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 transition-transform group-hover:rotate-6 group-hover:scale-110">
                  🎓
                </div>
              </div>

              <div className="relative space-y-7 pl-5">
                <div className="absolute left-0 top-1 h-[calc(100%-8px)] w-px bg-linear-to-b from-cyan-400 via-zinc-700 to-transparent" />
                {educationData.map((item) => (
                  <div key={item.school} className="relative">
                    <span className="absolute -left-6.25 top-1 h-3 w-3 rounded-full border-2 border-cyan-400 bg-zinc-950" />
                    <div className="font-semibold text-white">{item.school}</div>
                    <div className="mt-1 text-sm text-zinc-400">{item.year}</div>
                    <div className="mt-1 text-sm text-zinc-500">{item.major}</div>
                  </div>
                ))}
              </div>
            </motion.article>

            {/* Pengalaman Magang */}
            <motion.article
              id="experience"
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl shadow-black/20 backdrop-blur transition-colors hover:border-cyan-400/40"
            >
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
                  PENGALAMAN MAGANG
                </h2>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 transition-transform group-hover:rotate-6 group-hover:scale-110">
                  💼
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-5">
                <div className="text-xl font-bold text-white">Kantor DPRD Kota Medan</div>
                <div className="mt-2 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                  Magang
                </div>
                <p className="mt-6 text-sm leading-relaxed text-zinc-300">
                  Pengalaman kerja lapangan di lingkungan pemerintahan Kota Medan, melatih kedisiplinan, komunikasi, dan tanggung jawab dalam dunia kerja.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <div className="text-2xl font-black text-cyan-300">1</div>
                  <div className="mt-1 text-xs text-zinc-400">Instansi</div>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <div className="text-2xl font-black text-cyan-300">PKL</div>
                  <div className="mt-1 text-xs text-zinc-400">Pengalaman</div>
                </div>
              </div>
            </motion.article>

            {/* Pengalaman Organisasi */}
            <motion.article
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="group rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-xl shadow-black/20 backdrop-blur transition-colors hover:border-cyan-400/40"
            >
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-[0.25em] text-cyan-400">
                  ORGANISASI
                </h2>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300 transition-transform group-hover:rotate-6 group-hover:scale-110">
                  🤝
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-950/80 to-cyan-400/5 p-5">
                <div className="text-sm font-medium uppercase tracking-widest text-zinc-400">
                  Jabatan
                </div>
                <div className="mt-2 text-2xl font-black text-white">Wakil Ketua OKK</div>
                <div className="mt-5 text-lg font-semibold leading-snug text-zinc-200">
                  Banteng Muda Indonesia (BMI) PAC Medan Tuntungan
                </div>
                <div className="mt-5 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                  2024 — Sekarang
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-relaxed text-cyan-100">
                Aktif berorganisasi untuk mengembangkan kepemimpinan, komunikasi, koordinasi, dan kerja sama tim.
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
