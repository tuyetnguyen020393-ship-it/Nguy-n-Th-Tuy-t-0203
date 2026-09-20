import React from 'react';
import { Student } from '../types';
import confetti from 'canvas-confetti';

interface StudentCertificateModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentCertificateModal: React.FC<StudentCertificateModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !student) return null;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Certificate Canvas */}
        <div className="p-6 text-center bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 relative">
          {/* Certificate Header Decoration */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <img
              src="https://i.postimg.cc/fThJLSnT/logo.png"
              alt="Logo Cô Tuyết Toán"
              className="w-12 h-12 object-contain drop-shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>

          <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full inline-block mb-2">
            HỆ THỐNG DẠY & HỌC TOÁN THCS CÔ TUYẾT
          </span>

          <h3 className="font-display font-black text-xl text-amber-900 tracking-tight uppercase">
            GIẤY KHEN VINH DANH THÀNH TÍCH
          </h3>
          <p className="text-xs text-slate-500 italic mt-0.5">
            Bảng Vàng Danh Dự Tuần 24 • Năm học 2024 - 2025
          </p>

          <div className="my-4 py-3 border-y-2 border-amber-200/80">
            <p className="text-xs text-slate-600 uppercase font-semibold">Tuyên dương con:</p>
            <h2 className="text-2xl font-black text-slate-900 font-display mt-1 text-emerald-800">
              {student.name}
            </h2>
            <p className="text-xs font-bold text-slate-600 mt-0.5">
              Học sinh Lớp {student.classId} • Trường {student.school}
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-700 max-w-sm mx-auto">
            <p className="leading-relaxed">
              Đã xuất sắc đạt vị trí{' '}
              <strong className="text-amber-800 uppercase font-black">
                {student.badge || `Hạng #${student.rank}`}
              </strong>{' '}
              với số điểm tuyệt đối:
            </p>

            <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-2xl px-6 py-1.5 rounded-2xl shadow-md gold-glow">
              {student.score.toFixed(1)} / {student.maxScore} ĐIỂM
            </div>

            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/70 text-amber-950 font-medium italic text-xs mt-2">
              "{student.quote}"
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              Đã hoàn thành {student.submissionsCount} bài nộp chuyên cần và tương tác xuất sắc!
            </p>
          </div>

          {/* Stamp and Signature Section */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs px-4">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block">Ngày ghi danh:</span>
              <span className="font-bold text-slate-700">Tuần 24</span>
            </div>

            {/* Simulated Stamp */}
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-red-500 flex flex-col items-center justify-center text-red-600 transform -rotate-12 select-none shadow-xs">
              <span className="text-[7px] font-black uppercase">CÔ TUYẾT</span>
              <i className="fa-solid fa-check text-sm my-0.5"></i>
              <span className="text-[6px] font-bold">XUẤT SẮC</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Giáo Viên Phụ Trách:</span>
              <span className="font-bold text-emerald-800 font-display text-sm">Cô Tuyết Toán</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          <button
            onClick={triggerCelebration}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i> Pháo hoa chúc mừng
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => {
                alert(`Đã lưu ảnh giấy khen của ${student.name} về thiết bị!`);
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-download"></i> Tải về
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
