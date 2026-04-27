'use client';

import Navbar from '../components/Navbar';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Activity = {
  id: number | string;
  title: string;
  date: string;
  description?: string | null;
  images?: string[] | string | null;
};

const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function getValidDate(dateValue: string) {
  const date = new Date(`${dateValue}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getFirstActivityDate(data: Activity[]) {
  const validDates = data
    .map((item) => getValidDate(item.date))
    .filter((date): date is Date => date !== null)
    .sort((a, b) => a.getTime() - b.getTime());

  return validDates[0] || null;
}

function getImages(images: Activity['images']) {
  if (!images) return [];

  if (Array.isArray(images)) {
    return images.filter(Boolean);
  }

  return images
    .split(',')
    .map((image) => image.trim())
    .filter(Boolean);
}

export default function KegiatanPage() {
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error(error);
        setActivities([]);
      } else {
        const activityData = (data || []) as Activity[];
        setActivities(activityData);

        const firstActivityDate = getFirstActivityDate(activityData);

        if (firstActivityDate) {
          setCurrentMonth(firstActivityDate.getMonth() + 1);
          setCurrentYear(firstActivityDate.getFullYear());
        }
      }

      setLoading(false);
    };

    fetchActivities();
  }, []);

  const activitiesData = useMemo(() => {
    const groupedData: Record<string, Activity[]> = {};

    activities.forEach((item) => {
      const dateKey = item.date;

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = [];
      }

      groupedData[dateKey].push(item);
    });

    return groupedData;
  }, [activities]);

  const selectedActivities = selectedDate ? activitiesData[selectedDate] || [] : [];

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (dateKey: string) => {
    if (activitiesData[dateKey]) {
      setSelectedDate(dateKey);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  const generateCalendar = () => {
    const days = [];
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-20 rounded-xl border border-zinc-800/60 bg-zinc-900/40 md:h-24"
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
      const hasActivity = !!activitiesData[dateKey];

      days.push(
        <button
          type="button"
          key={dateKey}
          onClick={() => handleDateClick(dateKey)}
          className={`group relative flex h-20 flex-col items-center justify-center rounded-xl border transition-all md:h-24 ${
            hasActivity
              ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-400/15'
              : 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600'
          }`}
        >
          <span className="text-2xl font-bold md:text-3xl">{day}</span>

          {hasActivity && (
            <span className="absolute bottom-2 rounded-full bg-cyan-400 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-zinc-950 md:text-[10px]">
              Event
            </span>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-80 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%),linear-gradient(to_bottom,rgba(9,9,11,0.2),#09090b)]" />
      </div>

      <section className="px-6 pb-24 pt-24 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 shadow-lg shadow-cyan-500/5 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
              Timeline Kegiatan
            </div>

            <h1 className="text-5xl font-black tracking-tighter md:text-7xl">
              Kegiatan{' '}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Saya
              </span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-zinc-400 md:text-xl">
              Timeline kegiatan dan event yang pernah saya ikuti.
            </p>
          </div>

          <div className="rounded-4xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-2xl shadow-black/25 backdrop-blur md:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-zinc-700 bg-zinc-950/50 text-2xl text-cyan-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-cyan-400 hover:text-zinc-950"
              >
                ←
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                  {monthNames[currentMonth - 1]} {currentYear}
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  {loading ? 'Memuat kegiatan...' : `${activities.length} kegiatan tersimpan`}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-zinc-700 bg-zinc-950/50 text-2xl text-cyan-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-cyan-400 hover:text-zinc-950"
              >
                →
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-2">
              {dayNames.map((hari) => (
                <div
                  key={hari}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/60 py-3 text-center text-xs font-semibold uppercase tracking-widest text-zinc-400 md:text-sm"
                >
                  {hari}
                </div>
              ))}
            </div>

            {loading ? (
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-20 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900 md:h-24"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2">{generateCalendar()}</div>
            )}
          </div>
        </div>
      </section>

      {showModal && selectedActivities.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-4xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-5 border-b border-zinc-800 p-6 md:p-8">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  Detail Kegiatan
                </p>
                <h3 className="text-2xl font-bold md:text-3xl">
                  Kegiatan Tanggal {selectedDate}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-zinc-700 bg-zinc-950/50 text-3xl leading-none text-zinc-400 transition-all hover:border-cyan-400/60 hover:text-cyan-300"
              >
                ×
              </button>
            </div>

            <div className="max-h-[68vh] overflow-y-auto p-6 md:p-8">
              <div className="space-y-8">
                {selectedActivities.map((activity) => {
                  const images = getImages(activity.images);

                  return (
                    <article
                      key={activity.id}
                      className="rounded-3xl border border-zinc-800 bg-zinc-950/40 p-5 md:p-6"
                    >
                      <div className="mb-5">
                        <h4 className="text-2xl font-bold text-white">{activity.title}</h4>
                        <p className="mt-2 text-sm font-semibold text-cyan-400">{activity.date}</p>
                      </div>

                      {images.length > 0 && (
                        <div
                          className={`mb-5 grid gap-4 ${
                            images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                          }`}
                        >
                          {images.map((img, index) => (
                            <div
                              key={`${img}-${index}`}
                              className="h-52 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 md:h-60"
                            >
                              <img
                                src={img}
                                alt={`${activity.title} ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                        {activity.description || 'Deskripsi kegiatan belum diisi.'}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-800 p-4">
              <button
                type="button"
                onClick={closeModal}
                className="w-full rounded-2xl bg-cyan-400 py-4 font-bold text-zinc-950 transition-all hover:bg-cyan-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
