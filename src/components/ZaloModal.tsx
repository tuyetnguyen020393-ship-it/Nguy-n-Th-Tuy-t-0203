import React, { useState } from 'react';

interface ZaloModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZaloModal: React.FC<ZaloModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0986888888');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const templates = [
    'Chào Cô Tuyết, em muốn xin tư vấn lộ trình học Toán THCS cho con ạ!',
    'Cô Tuyết ơi, em muốn hỏi đáp bài tập nâng cao tuần 24 lớp 8A1 ạ!',
    'Em xin phép đăng ký nhận bộ phiếu bài giảng trực quan số hoá của Cô Tuyết ạ.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-sky-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-comment-dots"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm">Kết Nối Zalo Cô Tuyết Toán</h3>
              <p className="text-[11px] text-sky-100">Kênh giải đáp bài tập & trao đổi học tập phụ huynh</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
          >
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 text-center space-y-4">
          {/* Avatar & Info */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-700 text-2xl shadow-inner mb-2">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Cô Tuyết • Giáo Viên Toán THCS</h4>
            <p className="text-xs text-slate-500">Chuyên toán 6, 7, 8, 9 & Luyện thi vào 10 chất lượng cao</p>
          </div>

          {/* QR Code container */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner mx-auto">
            <div className="w-40 h-40 bg-white p-2 rounded-xl border border-slate-200 flex flex-col items-center justify-center relative shadow-sm">
              {/* QR representation */}
              <div className="grid grid-cols-5 gap-1 w-full h-full p-1 opacity-80">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      i % 2 === 0 || i % 7 === 0 || i === 0 || i === 4 || i === 20 || i === 24
                        ? 'bg-slate-800'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-sky-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow">
                  ZALO
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">
              Quét mã QR để mở trực tiếp tài khoản Zalo
            </p>
          </div>

          {/* SĐT Hotline */}
          <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-sky-700 block">Số điện thoại / Zalo:</span>
              <span className="font-extrabold text-sm text-sky-950">0986.xxx.888</span>
            </div>
            <button
              onClick={handleCopyPhone}
              className="px-3 py-1.5 bg-white text-sky-700 hover:bg-sky-100 text-xs font-bold rounded-lg border border-sky-300 shadow-xs transition cursor-pointer"
            >
              {copied ? 'Đã chép!' : 'Sao chép số'}
            </button>
          </div>

          {/* Mẫu tin nhắn nhanh */}
          <div className="text-left">
            <span className="text-xs font-bold text-slate-700 block mb-1.5">
              Mẫu tin nhắn nhanh (chọn để sao chép):
            </span>
            <div className="space-y-1.5">
              {templates.map((tpl, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigator.clipboard.writeText(tpl);
                    setSelectedTemplate(tpl);
                    setTimeout(() => setSelectedTemplate(''), 2000);
                  }}
                  className="w-full text-left text-[11px] p-2 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-800 border border-slate-200 transition cursor-pointer flex items-center justify-between"
                >
                  <span className="truncate pr-2">{tpl}</span>
                  <i className="fa-regular fa-copy text-slate-400"></i>
                </button>
              ))}
            </div>
            {selectedTemplate && (
              <p className="text-[10px] text-emerald-600 font-semibold mt-1 text-center">
                Đã sao chép nội dung tin nhắn!
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
