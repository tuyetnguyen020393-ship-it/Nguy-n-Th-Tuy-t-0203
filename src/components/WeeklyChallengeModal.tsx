import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface WeeklyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeeklyChallengeModal: React.FC<WeeklyChallengeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (opt: string) => {
    setSelectedOption(opt);
    setIsAnswered(true);
    if (opt === 'A') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-lightbulb"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm">Thử Thách Toán Học Tuần 24</h3>
              <p className="text-[11px] text-amber-100">Câu đố tư duy logic có thưởng sao danh dự!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
          >
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        {/* Question body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-slate-800">
            <span className="font-bold text-amber-800 uppercase text-[10px] block mb-1">
              <i className="fa-solid fa-puzzle-piece mr-1"></i> Câu đố chiếc mặt đồng hồ bí ẩn:
            </span>
            <p className="leading-relaxed font-medium">
              Một chiếc mặt đồng hồ tròn (đánh số từ 1 đến 12) bị vỡ làm <strong>3 mảnh</strong>. Biết rằng tổng các số ghi trên mỗi mảnh đều bằng nhau. Hỏi tổng các số trên mỗi mảnh là bao nhiêu?
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-slate-700">Chọn đáp án của con:</p>
            {[
              {
                id: 'A',
                label: 'A. Tổng mỗi mảnh là 26 (Gồm: {11, 12, 1, 2}, {9, 10, 3, 4}, {5, 6, 7, 8})',
                isCorrect: true,
              },
              {
                id: 'B',
                label: 'B. Tổng mỗi mảnh là 24',
                isCorrect: false,
              },
              {
                id: 'C',
                label: 'C. Tổng mỗi mảnh là 30',
                isCorrect: false,
              },
              {
                id: 'D',
                label: 'D. Không thể chia đều được',
                isCorrect: false,
              },
            ].map((item) => {
              const isSelected = selectedOption === item.id;
              let btnClass = 'border-slate-200 bg-slate-50 hover:bg-emerald-50 text-slate-700';

              if (isAnswered) {
                if (item.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold';
                } else if (isSelected) {
                  btnClass = 'border-red-400 bg-red-100 text-red-900';
                }
              }

              return (
                <button
                  key={item.id}
                  onClick={() => !isAnswered && handleSelect(item.id)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${btnClass}`}
                >
                  <span>{item.label}</span>
                  {isAnswered && item.isCorrect && (
                    <i className="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
                  )}
                  {isAnswered && isSelected && !item.isCorrect && (
                    <i className="fa-solid fa-circle-xmark text-red-500 text-sm"></i>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 animate-fade-in text-slate-800">
              <span className="font-bold text-emerald-800 uppercase text-[10px] block mb-1 flex items-center gap-1">
                <i className="fa-solid fa-graduation-cap"></i> Lời giải tư duy từ Cô Tuyết:
              </span>
              <p className="leading-relaxed">
                Tổng tất cả các số từ 1 đến 12 là: (1 + 12) × 12 : 2 = <strong>78</strong>.<br />
                Do chiếc đồng hồ vỡ làm 3 phần có tổng bằng nhau nên tổng mỗi mảnh là: <strong>78 : 3 = 26</strong>.<br />
                Đáp án chính xác là <strong>A</strong>! Chúc mừng con đã giải đố xuất sắc!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {isAnswered ? (
            <button
              onClick={handleReset}
              className="text-xs text-emerald-700 hover:underline font-semibold cursor-pointer"
            >
              Thử làm lại
            </button>
          ) : (
            <span className="text-[11px] text-slate-400 italic">Chọn 1 đáp án để xem giải thích</span>
          )}
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
