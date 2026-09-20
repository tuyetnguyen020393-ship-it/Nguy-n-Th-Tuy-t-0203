import React, { useState } from 'react';
import { MATH_KNOWLEDGE_BASE } from '../data/mockData';

interface AiMathModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion: string;
  mode: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  steps?: string[];
  finalAnswer?: string;
  note?: string;
  time: string;
}

export const AiMathModal: React.FC<AiMathModalProps> = ({
  isOpen,
  onClose,
  initialQuestion,
  mode,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return generateInitialResponse(initialQuestion, mode);
  });
  const [followUpText, setFollowUpText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Update response whenever initial question changes
  React.useEffect(() => {
    if (initialQuestion && isOpen) {
      setMessages(generateInitialResponse(initialQuestion, mode));
    }
  }, [initialQuestion, isOpen, mode]);

  if (!isOpen) return null;

  function generateInitialResponse(q: string, currentMode: string): ChatMessage[] {
    const query = (q || '').toLowerCase();
    const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    let foundKey = '';
    if (query.includes('pyta') || query.includes('tam giác') || query.includes('cạnh huyền') || query.includes('vuông')) {
      foundKey = 'pythagoras';
    } else if (query.includes('phương trình') || query.includes('2x') || query.includes('tìm x')) {
      foundKey = 'equation';
    } else if (query.includes('ta-lét') || query.includes('thales') || query.includes('song song')) {
      foundKey = 'thales';
    } else if (query.includes('rút gọn') || query.includes('phân thức') || query.includes('x^2') || query.includes('x²')) {
      foundKey = 'rutgon';
    }

    const kb = foundKey ? MATH_KNOWLEDGE_BASE[foundKey] : null;

    const userMsg: ChatMessage = {
      id: 'msg-user-1',
      sender: 'user',
      text: q || 'Hướng dẫn em giải bài tập toán này với ạ!',
      time: timeNow,
    };

    let aiMsg: ChatMessage;
    if (kb) {
      aiMsg = {
        id: 'msg-ai-1',
        sender: 'ai',
        text: `Chào con! Cô Tuyết và Trợ lý AI đã nhận được câu hỏi. Dưới đây là phương pháp giải theo chế độ "${currentMode}":`,
        steps: kb.steps,
        finalAnswer: kb.finalAnswer,
        note: kb.teacherNote,
        time: timeNow,
      };
    } else {
      aiMsg = {
        id: 'msg-ai-1',
        sender: 'ai',
        text: `Chào con! Với bài toán "${q}":`,
        steps: [
          'Bước 1: Đọc kỹ giả thiết và kết luận của bài toán, vẽ hình nháp (nếu là hình học) hoặc xác định dạng toán (nếu là đại số).',
          'Bước 2: Tìm mối liên hệ giữa các đại lượng đã biết và đại lượng cần tìm qua các định lý hoặc hằng đẳng thức cốt lõi.',
          'Bước 3: Trình bày bài giải mạch lạc từng bước, kiểm tra lại điều kiện xác định và thử lại nghiệm.',
          'Bước 4: Kết luận rõ ràng đáp số kèm theo đơn vị đo lường (cm, m², nghiệm S,...).'
        ],
        finalAnswer: 'Đáp án được chứng minh và tính toán chuẩn mực theo phương pháp tư duy Cô Tuyết.',
        note: 'Lời dặn của Cô Tuyết: Hãy luôn rèn luyện tính cẩn thận, không làm tắt bước và vẽ hình chính xác bằng thước nhé!',
        time: timeNow,
      };
    }

    return [userMsg, aiMsg];
  }

  const handleSendFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpText.trim()) return;

    const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: followUpText,
      time: timeNow,
    };

    setMessages((prev) => [...prev, userMsg]);
    setFollowUpText('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Cô Tuyết giải đáp thêm cho con về câu hỏi vừa rồi:`,
        steps: [
          'Phân tích chi tiết: Con đã quan sát rất sắc bén! Chỗ này ta có thể biến đổi tương đương hoặc sử dụng tính chất bắc cầu.',
          'Gợi ý tư duy: Hãy thử đặt ẩn phụ hoặc vẽ thêm đường phụ (đối với hình học) để bài toán trở nên đơn giản hơn.',
          'Thực hành: Con hãy lấy giấy nháp làm theo hướng dẫn này và gửi lại cho cô chấm điểm nhé!'
        ],
        finalAnswer: 'Con hoàn toàn có thể làm chủ bài toán nếu nắm chắc sơ đồ tư duy!',
        note: 'Cô Tuyết tặng con 1 điểm chăm chỉ vì tinh thần ham học hỏi!',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-brain"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-2">
                Trợ Lý Toán Học Cô Tuyết AI
                <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full uppercase">
                  Chế độ {mode}
                </span>
              </h3>
              <p className="text-[11px] text-emerald-100">
                Giải đáp bài tập THCS & hướng dẫn phương pháp tư duy toán logic
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

        {/* Message history */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs shrink-0 mt-1 shadow-sm">
                  <i className="fa-solid fa-robot"></i>
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-xs ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <p className="font-medium leading-relaxed">{m.text}</p>

                {/* Các bước giải chi tiết */}
                {m.steps && (
                  <div className="mt-3 space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                    <span className="font-bold text-emerald-700 uppercase text-[10px] block">
                      <i className="fa-solid fa-list-check mr-1"></i> Các bước tư duy & giải toán:
                    </span>
                    {m.steps.map((st, i) => (
                      <div key={i} className="pl-1 leading-relaxed border-l-2 border-emerald-400 my-1 py-0.5">
                        {st}
                      </div>
                    ))}
                  </div>
                )}

                {/* Đáp án cuối cùng */}
                {m.finalAnswer && (
                  <div className="mt-2.5 p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-bold flex items-center gap-2">
                    <i className="fa-solid fa-circle-check text-amber-600 text-sm"></i>
                    <span>Kết quả: {m.finalAnswer}</span>
                  </div>
                )}

                {/* Lời dặn của Cô Tuyết */}
                {m.note && (
                  <div className="mt-2 text-[11px] text-emerald-800 italic bg-emerald-50/80 p-2 rounded-lg border border-emerald-100 flex items-start gap-1.5">
                    <i className="fa-solid fa-lightbulb text-amber-500 text-xs mt-0.5 shrink-0"></i>
                    <span>{m.note}</span>
                  </div>
                )}

                <span
                  className={`text-[9px] mt-1.5 block text-right ${
                    m.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0 mt-1 shadow-sm">
                  <i className="fa-solid fa-user"></i>
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-2 items-center text-xs text-slate-500 bg-white p-3 rounded-xl border w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-2 font-medium">Cô Tuyết và Trợ lý AI đang tư duy lời giải...</span>
            </div>
          )}
        </div>

        {/* Input hỏi thêm */}
        <form onSubmit={handleSendFollowUp} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            placeholder="Hỏi thêm về bước giải hoặc một bài toán khác..."
            value={followUpText}
            onChange={(e) => setFollowUpText(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <i className="fa-solid fa-paper-plane"></i> Gửi
          </button>
        </form>
      </div>
    </div>
  );
};
