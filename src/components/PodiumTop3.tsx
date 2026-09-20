import React from 'react';
import { Student } from '../types';
import confetti from 'canvas-confetti';

interface PodiumTop3Props {
  topStudents: Student[];
  onSelectStudent: (student: Student) => void;
}

export const PodiumTop3: React.FC<PodiumTop3Props> = ({
  topStudents,
  onSelectStudent,
}) => {
  const top1 = topStudents[0];
  const top2 = topStudents[1];
  const top3 = topStudents[2];

  const triggerConfetti = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#fbbf24'],
      });
    } catch {
      // ignore
    }
  };

  const handleStudentClick = (student: Student, isTop1: boolean = false) => {
    if (isTop1) {
      triggerConfetti();
    }
    onSelectStudent(student);
  };

  if (!top1) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs">
        Chưa có dữ liệu học sinh dẫn đầu cho bộ lọc này.
      </div>
    );
  }

  return (
    <div 
      id="top-3-podium-container"
      className="px-4 sm:px-6 py-6"
      data-purpose="top-3-podium"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-3xl mx-auto">
        {/* TOP 2: Cột bên trái */}
        {top2 && (
          <div
            id={`podium-card-${top2.id}`}
            onClick={() => handleStudentClick(top2, false)}
            className="order-2 md:order-1 bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-2xl p-4 text-center flex flex-col items-center relative shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            {/* Badge Top 2 */}
            <div className="bg-slate-800 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full tracking-wider mb-3 flex items-center gap-1 shadow-sm">
              <i className="fa-solid fa-medal text-slate-300"></i> TOP 2
            </div>

            {/* Avatar / Huy hiệu bạc */}
            <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-500 text-2xl shadow-inner mb-2.5 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-award text-slate-500"></i>
            </div>

            <h3 className="font-bold text-sm text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">
              {top2.name}
            </h3>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Lớp {top2.classId} • {top2.school}
            </span>

            {/* Điểm số */}
            <div className="mt-2.5 mb-2 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/80">
              <span className="text-base font-extrabold text-slate-800">
                {top2.score.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-400">/{top2.maxScore}</span>
            </div>

            <p className="text-[10px] text-slate-500 italic line-clamp-2 px-1">
              "{top2.quote}"
            </p>
          </div>
        )}

        {/* TOP 1 XUẤT SẮC: Cột ở giữa, cao hơn, nổi bật hơn */}
        {top1 && (
          <div
            id={`podium-card-${top1.id}`}
            onClick={() => handleStudentClick(top1, true)}
            className="order-1 md:order-2 bg-gradient-to-b from-amber-50/90 via-amber-50/40 to-white border-2 border-amber-300 rounded-2xl p-5 text-center flex flex-col items-center relative shadow-xl ring-2 ring-amber-200/50 scale-[1.03] -translate-y-1 cursor-pointer hover:shadow-2xl transition group"
          >
            {/* Huy hiệu Top 1 xuất sắc rực rỡ */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-full tracking-wider mb-2 flex items-center gap-1.5 shadow-md -mt-3 animate-pulse">
              <i className="fa-solid fa-crown text-yellow-200"></i> TOP 1 XUẤT SẮC{' '}
              <i className="fa-solid fa-crown text-yellow-200"></i>
            </div>

            {/* Avatar Vàng Kim & Cúp */}
            <div className="relative mb-2 mt-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-400 flex items-center justify-center text-amber-900 text-3xl shadow-lg gold-glow group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-trophy text-amber-900"></i>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1 text-[9px] shadow">
                <i className="fa-solid fa-star"></i>
              </div>
            </div>

            <h3 className="font-display font-extrabold text-base text-slate-900 leading-tight group-hover:text-amber-800 transition-colors">
              {top1.name}
            </h3>
            <span className="text-[11px] font-semibold text-amber-700 mt-0.5">
              Lớp {top1.classId} • {top1.school}
            </span>

            {/* Điểm số 10.0 Nổi bật */}
            <div className="mt-2.5 mb-2.5 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 rounded-xl shadow-md text-white font-black tracking-tight">
              <span className="text-xl">{top1.score.toFixed(1)}</span>
              <span className="text-xs text-amber-200">/{top1.maxScore}</span>
            </div>

            <p className="text-[11px] text-amber-900 font-semibold italic px-1 leading-snug">
              ⭐ "{top1.quote}"
            </p>
          </div>
        )}

        {/* TOP 3: Cột bên phải */}
        {top3 && (
          <div
            id={`podium-card-${top3.id}`}
            onClick={() => handleStudentClick(top3, false)}
            className="order-3 md:order-3 bg-gradient-to-b from-orange-50/50 to-white border border-orange-200/80 rounded-2xl p-4 text-center flex flex-col items-center relative shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            {/* Badge Top 3 */}
            <div className="bg-amber-700 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full tracking-wider mb-3 flex items-center gap-1 shadow-sm">
              <i className="fa-solid fa-award text-amber-300"></i> TOP 3
            </div>

            {/* Avatar / Huy hiệu đồng */}
            <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-amber-700 text-2xl shadow-inner mb-2.5 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-medal text-amber-700"></i>
            </div>

            <h3 className="font-bold text-sm text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">
              {top3.name}
            </h3>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Lớp {top3.classId} • {top3.school}
            </span>

            {/* Điểm số */}
            <div className="mt-2.5 mb-2 bg-amber-100/70 px-3 py-1 rounded-lg border border-amber-200">
              <span className="text-base font-extrabold text-amber-900">
                {top3.score.toFixed(1)}
              </span>
              <span className="text-[10px] text-amber-700">/{top3.maxScore}</span>
            </div>

            <p className="text-[10px] text-slate-500 italic line-clamp-2 px-1">
              "{top3.quote}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
