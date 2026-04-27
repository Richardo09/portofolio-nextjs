'use client';

import Navbar from '../components/Navbar';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

type Project = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  category: string;
  tech?: string[] | string | null;
  github?: string | null;
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

function getCategoryLabel(category: string) {
  if (category === 'all') return 'Semua Project';
  if (category === 'web') return 'Web Development';
  if (category === 'android') return 'Android Development';
  return category;
}

function getTechList(tech: Project['tech']) {
  if (!tech) return [];
  if (Array.isArray(tech)) return tech;
  return tech
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedId, setExpandedId] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setProjects((data || []) as Project[]);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((project) => project.category).filter(Boolean))
    );

    return ['all', ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

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
              Portfolio Project
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="text-5xl font-black tracking-tighter md:text-7xl"
            >
              My{' '}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="mt-5 text-lg leading-relaxed text-zinc-400 md:text-xl"
            >
              Project Project yang telah saya kerjakan
            </motion.p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
            className="mb-12 flex flex-wrap gap-3 rounded-4xl border border-zinc-800 bg-zinc-900/60 p-3 shadow-xl shadow-black/20 backdrop-blur"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all md:px-7 ${
                  activeFilter === cat
                    ? 'bg-cyan-400 text-zinc-950 shadow-lg shadow-cyan-500/20'
                    : 'border border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-300'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="nimate-pulse roer border-zinc-800 bg-zinc-900/70"
                />
              ))}
            </div>
          )}

          {/* Project Grid */}
          {!loading && filteredProjects.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project) => {
                const techList = getTechList(project.tech);
                const isExpanded = expandedId === project.id;

                return (
                  <motion.article
                    key={project.id}
                    variants={fadeUp}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    whileHover={{ y: -8 }}
                    className="group flex h-full min-h-147.5 flex-col ov4xl border00 bg-zinc-900/80 shadow-xl shadow-black/25 backdrop-blur transition-colors hover:border-cyan-400/40"
                  >
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />

                      <div className="absolute left-4 top-4 rounded-full border border-cyan-400/20 bg-zinc-950/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 shadow-lg shadow-black/20 backdrop-blur">
                        {project.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-4 line-clamp-2 min-h-16 text-2xl font-bold leading-tight text-white trans group-hover:text-cyan-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <div className="mb-3 h-26 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                        <p
                          className={`text-sm leading-relaxed text-zinc-400 ${
                            isExpanded ? 'max-h-18 overflow-y-auto pr-2' : 'line-clamp-3'
                          }`}
                        >
                          {project.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : project.id)}
                        className="mb-5 w-fit text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                      >
                        {isExpanded ? 'Tutup' : 'Lihat selengkapnya'}
                      </button>

                      {/* Tech */}
                      <div className="mb-6 flex min-h-18 flex-wrap content-start gap-2">
                        {techList.length > 0 ? (
                          techList.slice(0, 6).map((tech, i) => (
                            <span
                              key={`${tech}-${i}`}
                              className="h-fit rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-300"
                            >
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="h-fit rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-400">
                            Tech belum diisi
                          </span>
                        )}
                      </div>

                      {/* Button */}
                      <a
                        href={project.github || '#'}
                        target={project.github ? '_blank' : undefined}
                        rel={project.github ? 'noopener noreferrer' : undefined}
                        className={`mt-auto block rounded-2xl py-3.5 text-center text-sm font-bold transition-all ${
                          project.github
                            ? 'border border-cyan-400/70 text-cyan-300 hover:-translate-y-1 hover:bg-cyan-400 hover:text-zinc-950 hover:shadow-lg hover:shadow-cyan-500/20'
                            : 'cursor-not-allowed border border-zinc-700 text-zinc-500'
                        }`}
                      >
                        {project.github ? 'Lihat di GitHub' : 'Link GitHub belum tersedia'}
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-4xl border border-zinc-800 bg-zinc-900/70xt-center shadow-xl shadow-black/20 backdrop-blur"
            >
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-cyan-400/10 text-3xl">
                📁
              </div>
              <h2 className="text-2xl font-bold text-white">Belum ada project</h2>
              <p className="mt-3 text-zinc-400">
                Project untuk kategori ini belum tersedia.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
