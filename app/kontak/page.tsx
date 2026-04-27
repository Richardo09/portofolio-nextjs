'use client';

// app/kontak/page.tsx

import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaWhatsapp,
  FaInstagram,
  FaTelegram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa';

type ContactItem = {
  name: string;
  label: string;
  href: string;
  icon: IconType;
  iconClass: string;
  hoverBorder: string;
  hoverText: string;
  glowClass: string;
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

const contactItems: ContactItem[] = [
  {
    name: 'WhatsApp',
    label: 'Chat Langsung',
    href: 'https://wa.me/6283870211278',
    icon: FaWhatsapp,
    iconClass: 'text-green-500',
    hoverBorder: 'hover:border-green-500/70',
    hoverText: 'group-hover:text-green-400',
    glowClass: 'group-hover:shadow-green-500/20',
  },
  {
    name: 'Instagram',
    label: '@ardobars',
    href: 'https://instagram.com/ardobars',
    icon: FaInstagram,
    iconClass: 'text-pink-500',
    hoverBorder: 'hover:border-pink-500/70',
    hoverText: 'group-hover:text-pink-400',
    glowClass: 'group-hover:shadow-pink-500/20',
  },
  {
    name: 'Telegram',
    label: '@Ardobars',
    href: 'https://t.me/Ardobars',
    icon: FaTelegram,
    iconClass: 'text-sky-400',
    hoverBorder: 'hover:border-sky-400/70',
    hoverText: 'group-hover:text-sky-400',
    glowClass: 'group-hover:shadow-sky-500/20',
  },
  {
    name: 'GitHub',
    label: 'richardobram',
    href: 'https://github.com/Richardo09',
    icon: FaGithub,
    iconClass: 'text-white',
    hoverBorder: 'hover:border-white/70',
    hoverText: 'group-hover:text-white',
    glowClass: 'group-hover:shadow-white/10',
  },
  {
    name: 'LinkedIn',
    label: 'Richardo Bram Barus',
    href: 'https://www.linkedin.com/in/richardo-bram-barus-b7a44b398/',
    icon: FaLinkedin,
    iconClass: 'text-blue-500',
    hoverBorder: 'hover:border-blue-500/70',
    hoverText: 'group-hover:text-blue-400',
    glowClass: 'group-hover:shadow-blue-500/20',
  },
];

export default function KontakPage() {
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
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 shadow-lg shadow-cyan-500/5 backdrop-blur"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
              Kontak Saya
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="text-5xl font-black tracking-tighter md:text-7xl"
            >
              Mari{' '}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Terhubung
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
            >
              Berikut adalah kontak dan media sosial saya yang aktif dan dapat dihubungi saya selalu terbuka untuk diskusi dan lainnya terbuka untuk umum
            </motion.p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  whileHover={{ y: -8 }}
                  className={`group relative flex min-h-60 flex-col items-center justify-center overflow-hidden rounded-4xl border border-zinc-800 bg-zinc-900/80 p-6 text-center shadow-xl shadow-black/25 backdrop-blur transition-all hover:bg-zinc-900 hover:shadow-2xl ${item.hoverBorder} ${item.glowClass}`}
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/5 blur-2xl transition-all group-hover:bg-cyan-400/10" />

                  <div className="mb-6 grid h-20 w-20 place-items-center rounded-3xl border border-zinc-700 bg-zinc-950/50 shadow-lg shadow-black/20 transition-all group-hover:scale-105 group-hover:border-cyan-400/30">
                    <Icon className={`text-5xl transition-transform duration-300 group-hover:scale-110 ${item.iconClass}`} />
                  </div>

                  <div className="relative z-10">
                    <h2 className={`text-lg font-bold text-white transition-colors ${item.hoverText}`}>
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {item.label}
                    </p>
                  </div>

                  <div className="mt-6 h-1 w-12 rounded-full bg-zinc-800 transition-all group-hover:w-20 group-hover:bg-cyan-400" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Email Section */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: 'easeOut' }}
            className="mx-auto mt-16 max-w-2xl rounded-4xl border border-zinc-800 bg-zinc-900/70 p-6 text-center shadow-xl shadow-black/25 backdrop-blur md:p-8"
          >
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <FaEnvelope className="text-3xl" />
            </div>

            <p className="text-zinc-400">Atau kirim email ke</p>

            <a
              href="mailto:rikardobarus015@gmail.com"
              className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 break-all text-xl font-bold text-cyan-400 transition-colors hover:text-cyan-300 md:text-2xl"
            >
              <FaEnvelope className="text-2xl" />
              rikardobarus015@gmail.com
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
