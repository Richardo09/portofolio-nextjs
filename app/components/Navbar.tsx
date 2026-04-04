// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-cyan-400 rounded-2xl flex items-center justify-center text-zinc-950 font-bold text-2xl">
            RB
          </div>
          <span className="text-2xl font-semibold tracking-tight">Richardo Bram</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link href="/project" className="hover:text-cyan-400 transition-colors">Project</Link>
          <Link href="/kegiatan" className="hover:text-cyan-400 transition-colors">Kegiatan</Link>
          <Link href="/sertifikat" className="hover:text-cyan-400 transition-colors">Sertifikat</Link>
          <Link href="/kontak" className="hover:text-cyan-400 transition-colors">Kontak</Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-white"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-900 px-6 py-6">
          <div className="flex flex-col gap-6 text-lg font-medium">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-cyan-400">Home</Link>
            <Link href="/project" onClick={() => setIsOpen(false)} className="hover:text-cyan-400">Project</Link>
            <Link href="/kegiatan" onClick={() => setIsOpen(false)} className="hover:text-cyan-400">Kegiatan</Link>
            <Link href="/sertifikat" onClick={() => setIsOpen(false)} className="hover:text-cyan-400">Sertifikat</Link>
            <Link href="/kontak" onClick={() => setIsOpen(false)} className="hover:text-cyan-400">Kontak</Link>
          </div>
        </div>
      )}
    </nav>
  );
}