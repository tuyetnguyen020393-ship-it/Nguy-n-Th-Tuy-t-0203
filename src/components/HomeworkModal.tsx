import React, { useState } from 'react';
import { HOMEWORK_LIST } from '../data/mockData';
import { HomeworkAssignment } from '../types';

interface HomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HomeworkModal: React.FC<HomeworkModalProps> = ({ isOpen, onClose }) => {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [homeworks, setHomeworks] = useState<HomeworkAssignment[]>(HOMEWORK_LIST);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = selectedGrade === 'all'
    ? homeworks
    : homeworks.filter((h) => h.grade === selectedGrade);

  const handleSubmitHomework = (hwId: string) => {
    setHomeworks((prev) =>
      prev.map((h) =>
        h.id === hwId
          ? { ...h, status: 'submitted' as const, score: 10.0 }
          : h
      )
    );
    setSubmittingId(null);
    setSuccessToast('Nộp bài thành công! Cô Tuyết đã nhận được bài và cộng 1 điểm chuyên cần!');
    setTimeout(() => setSuccessToast(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-emerald-700 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm">Kho Bài Tập Toán & Phiếu Học Tập Cô Tuyết</h3>
              <p className="text-[11px] text-emerald-100">
                Tuần 24: Bài tập về nhà, phiếu rèn luyện tư duy và đề thi thử
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
          >
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        {/* Filter by Grade */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-600 mr-1">Khối lớp:</span>
          {(['all', 6, 7, 8, 9] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGrade(g)}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                selectedGrade === g
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {g === 'all' ? 'Tất cả khối' : `Lớp ${g}`}
            </button>
          ))}
        </div>

        {successToast && (
          <div className="mx-4 mt-3 p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-600 text-base"></i>
            <span>{successToast}</span>
          </div>
        )}

        {/* Content list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-slate-50/50">
          {filtered.map((hw) => (
            <div
              key={hw.id}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                      Lớp {hw.grade} ({hw.classId})
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Hạn nộp: <strong className="text-red-600">{hw.deadline}</strong>
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mt-1.5">{hw.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{hw.description}</p>
                </div>

                <div className="shrink-0 text-right">
                  {hw.status === 'submitted' || hw.status === 'graded' ? (
                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl text-center">
                      <span className="text-[10px] font-bold block uppercase">Đã nộp bài</span>
                      <span className="text-sm font-black text-emerald-800">
                        {hw.score ? `${hw.score} đ` : 'Chờ duyệt'}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSubmittingId(hw.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer shadow-sm"
                    >
                      <i className="fa-solid fa-upload mr-1"></i> Nộp bài
                    </button>
                  )}
                </div>
              </div>

              {/* Box nộp bài nhanh */}
              {submittingId === hw.id && (
                <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-lg animate-fade-in">
                  <p className="text-xs font-bold text-slate-700 mb-1.5">
                    Tải lên ảnh chụp bài làm vở hoặc tệp PDF bài tập:
                  </p>
                  <div className="border-2 border-dashed border-emerald-300 rounded-xl p-4 text-center bg-white cursor-pointer hover:bg-emerald-50/50 transition">
                    <i className="fa-solid fa-cloud-arrow-up text-2xl text-emerald-600 mb-1"></i>
                    <p className="text-xs text-slate-600 font-medium">
                      Kéo thả ảnh vở ghi bài hoặc bấm để chọn tệp (PNG, JPG, PDF)
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Dung lượng tối đa 15MB</p>
                  </div>
                  <div className="mt-2.5 flex justify-end gap-2">
                    <button
                      onClick={() => setSubmittingId(null)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleSubmitHomework(hw.id)}
                      className="px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow"
                    >
                      Xác nhận gửi Cô Tuyết
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>* Các bài làm nộp đúng hạn được cộng điểm chuyên cần trên Bảng Vàng</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
