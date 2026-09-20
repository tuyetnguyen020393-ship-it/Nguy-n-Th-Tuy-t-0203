import React from 'react';

interface GoldenBannerProps {
  onCelebrate?: () => void;
}

export const GoldenBanner: React.FC<GoldenBannerProps> = ({ onCelebrate }) => {
  return (
    <div 
      id="golden-honor-banner"
      className="golden-banner text-white px-6 py-6 text-center relative overflow-hidden select-none"
      data-purpose="golden-banner"
    >
      {/* Hiệu ứng tia sáng nền */}
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-yellow-300/20 rounded-full blur-xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl pointer-events-none"></div>

      {/* Tag huy hiệu danh dự */}
      <div 
        id="honor-tag"
        onClick={onCelebrate}
        className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest text-amber-100 shadow-sm border border-white/25 mb-2.5 cursor-pointer hover:bg-white/30 transition transform active:scale-95"
        title="Bấm để chúc mừng các bạn!"
      >
        <i className="fa-solid fa-trophy text-amber-300"></i> BẢNG VÀNG DANH DỰ TUẦN
      </div>

      {/* Tiêu đề lớn */}
      <h2 
        id="honor-title"
        className="font-display font-black text-xl sm:text-2xl md:text-[26px] leading-tight tracking-tight uppercase max-w-2xl mx-auto drop-shadow-sm text-white"
      >
        BẢNG DANH SÁCH THÀNH TÍCH HỌC SINH CHĂM CHỈ ĐANG DẪN ĐẦU ĐIỂM CAO NHẤT
      </h2>

      {/* Lời tuyên dương */}
      <p 
        id="honor-subtitle"
        className="text-xs sm:text-sm text-amber-50 font-medium max-w-xl mx-auto mt-2 leading-relaxed opacity-95"
      >
        Tuyên dương các con nỗ lực làm bài tập về nhà chăm chỉ, tích cực rèn luyện tư duy toán học và đạt điểm số xuất sắc nhất lớp Cô Tuyết!
      </p>
    </div>
  );
};
