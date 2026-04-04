'use client';

import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function KegiatanPage() {
  const [currentMonth, setCurrentMonth] = useState(3);
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);

  const monthNames = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

  //  ambil data dari Supabase
  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setActivities(data);
      }
    };

    fetchActivities();
  }, []);

  //  convert ke format kalender
  const activitiesData: Record<string, any[]> = {};

  activities.forEach((item) => {
    const dateKey = item.date; // format: YYYY-MM-DD

    if (!activitiesData[dateKey]) {
      activitiesData[dateKey] = [];
    }

    activitiesData[dateKey].push(item);
  });

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
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
      days.push(<div key={`empty-${i}`} className="h-20 bg-zinc-900"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const hasActivity = !!activitiesData[dateKey];

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(dateKey)}
          className={`h-20 flex flex-col items-center justify-center border border-zinc-800 hover:border-cyan-400 cursor-pointer transition-all relative
            ${hasActivity ? 'bg-zinc-800 text-cyan-400 font-semibold' : 'bg-zinc-900 text-zinc-300'}`}
        >
          <span className="text-2xl">{day}</span>
          {hasActivity && (
            <span className="absolute bottom-2 text-[10px] bg-cyan-400 text-zinc-950 px-2 py-0.5 rounded-full font-medium">
              EVENT
            </span>
          )}
        </div>
      );
    }

    return days;
  };

  const selectedActivities = selectedDate ? activitiesData[selectedDate] || [] : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="pt-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tighter mb-3">Kegiatan Saya</h1>
        <p className="text-zinc-400 text-lg mb-12">Timeline kegiatan dan event</p>

        <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <button onClick={handlePrevMonth} className="text-3xl text-cyan-400 px-4">←</button>
            <h2 className="text-3xl font-semibold">
              {monthNames[currentMonth - 1]} {currentYear}
            </h2>
            <button onClick={handleNextMonth} className="text-3xl text-cyan-400 px-4">→</button>
          </div>

          <div className="grid grid-cols-7 gap-px bg-zinc-800 rounded-t-2xl overflow-hidden">
            {['Min','Sen','Sel','Rab','Kam','Jum','Sab'].map((hari) => (
              <div key={hari} className="bg-zinc-900 py-4 text-center text-sm text-zinc-400">
                {hari}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-zinc-800">
            {generateCalendar()}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedActivities.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between mb-6">
                <h3 className="text-3xl font-semibold">Kegiatan Tanggal {selectedDate}</h3>
                <button onClick={closeModal} className="text-4xl text-zinc-400">×</button>
              </div>

              {selectedActivities.map((activity) => (
                <div key={activity.id} className="mb-12">
                  <h4 className="text-2xl font-medium mb-3">{activity.title}</h4>
                  <p className="text-cyan-400 mb-5">{activity.date}</p>

                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full rounded-2xl mb-6"
                  />

                  <p className="text-zinc-300">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-700 p-4">
              <button onClick={closeModal} className="w-full py-4 bg-zinc-800 rounded-2xl">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}