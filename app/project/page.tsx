'use client';

import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null); 

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setProjects(data || []);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="pt-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tighter mb-3">
          My Projects
        </h1>

        <p className="text-zinc-400 text-lg mb-12">
          Proyek Web & Android yang telah saya kerjakan
        </p>

        {/* FILTER */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-3xl font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-cyan-400 text-zinc-950'
                  : 'border border-zinc-700 hover:border-zinc-400'
              }`}
            >
              {cat === 'all'
                ? 'Semua Project'
                : cat === 'web'
                ? 'Web Development'
                : cat === 'android'
                ? 'Android Development'
                : cat}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden hover:border-cyan-400"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <div className="uppercase text-xs tracking-widest text-cyan-400 mb-2">
                  {project.category}
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  {project.title}
                </h3>

                {/* DESKRIPSI (DIPERBAIKI) */}
                <p
                  className={`text-zinc-400 text-sm mb-3 ${
                    expandedId === project.id ? '' : 'line-clamp-3'
                  }`}
                >
                  {project.description}
                </p>

                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId === project.id ? null : project.id
                    )
                  }
                  className="text-cyan-400 text-xs mb-4"
                >
                  {expandedId === project.id
                    ? 'Tutup'
                    : 'Lihat selengkapnya'}
                </button>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech?.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs bg-zinc-800 px-3 py-1 rounded-3xl"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center border border-cyan-400 hover:bg-cyan-400 hover:text-zinc-950 font-medium py-3.5 rounded-3xl text-sm"
                >
                  Lihat di GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-zinc-400 py-20">
            Belum ada project.
          </p>
        )}
      </div>
    </div>
  );
}