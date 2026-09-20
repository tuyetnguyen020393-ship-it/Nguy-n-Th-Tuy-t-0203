import React, { useState } from 'react';

interface TeacherProfileCardProps {
  onOpenZalo: () => void;
}

export const TeacherProfileCard: React.FC<TeacherProfileCardProps> = ({ onOpenZalo }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0986888888');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="teacher-profile-card"
      className="bg-white rounded-2xl shadow-xl p-5 border border-emerald-100 text-xs transition-all duration-300 hover:shadow-2xl"
      data-purpose="teacher-profile"
    >
      {/* Header giáo viên */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-11 h-11 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-700 text-lg shadow-inner shrink-0">
          <i className="fa-solid fa-user-tie"></i>
        </div>
        <div>
          <h2 className="font-bold text-slate-800 text-[13px] leading-tight flex items-center gap-1">
            Cô Tuyết • Giáo Viên Phụ Trách
          </h2>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            Toán THCS & Đổi Mới Công Nghệ 4.0
          </p>
        </div>
      </div>

      {/* Chi tiết hồ sơ giáo viên */}
      <div className="mt-3.5 space-y-2.5 text-slate-600">
        <div className="flex items-start gap-2.5">
          <i className="fa-solid fa-medal text-emerald-600 mt-0.5 text-xs shrink-0"></i>
          <div>
            <span className="font-bold text-slate-700 uppercase text-[10px] block">
              KINH NGHIỆM CHUYÊN MÔN:
            </span>
            <p className="leading-relaxed">
              Hơn 10 năm kinh nghiệm giảng dạy Toán THCS, bồi dưỡng học sinh giỏi và rèn luyện tư duy logic chuẩn mực.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <i className="fa-solid fa-compass-drafting text-emerald-600 mt-0.5 text-xs shrink-0"></i>
          <div>
            <span className="font-bold text-slate-700 uppercase text-[10px] block">
              PHƯƠNG PHÁP GIẢNG DẠY:
            </span>
            <p className="leading-relaxed">
              Hiểu bản chất vấn đề, sơ đồ tư duy toán học, tích hợp công cụ AI & bài giảng trực quan số hoá sinh động.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <i className="fa-solid fa-bullseye text-emerald-600 mt-0.5 text-xs shrink-0"></i>
          <div>
            <span className="font-bold text-slate-700 uppercase text-[10px] block">
              SỨ MỆNH:
            </span>
            <p className="leading-relaxed italic text-slate-700">
              "Biến mỗi bài học Toán thành một hành trình khám phá đầy hứng thú, tư duy chắc và tự tin tiến bộ."
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <i className="fa-solid fa-phone text-emerald-600 mt-0.5 text-xs shrink-0"></i>
          <div className="flex-1">
            <span className="font-bold text-slate-700 uppercase text-[10px] block">
              SỐ ĐIỆN THOẠI / ZALO HỌC TẬP:
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <button 
                id="phone-number-badge"
                type="button"
                onClick={handleCopyPhone}
                title="Bấm để sao chép số điện thoại"
                className="font-bold text-emerald-700 tracking-wide hover:underline cursor-pointer bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
              >
                0986.xxx.888
              </button>
              <button
                type="button"
                onClick={onOpenZalo}
                className="text-[10px] text-sky-600 hover:text-sky-800 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200"
              >
                Zalo
              </button>
              {copied && <span className="text-[10px] text-emerald-600 font-semibold">Đã sao chép!</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Card: Trạng thái hệ thống */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Trạng thái lớp học:</span>
        <span 
          id="classroom-status-badge"
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Đang mở cổng luyện tập
        </span>
      </div>
    </section>
  );
};
