import React, { useState, useRef, useEffect } from 'react';

interface AiAssistantDockProps {
  onAskQuestion: (question: string, mode: string) => void;
  onOpenWeeklyChallenge: () => void;
}

export const AiAssistantDock: React.FC<AiAssistantDockProps> = ({
  onAskQuestion,
  onOpenWeeklyChallenge,
}) => {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'Cân bằng' | 'Giải chi tiết' | 'Gợi ý từng bước'>('Cân bằng');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showSymbolPalette, setShowSymbolPalette] = useState(false);
  const [showSlashCommands, setShowSlashCommands] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModeDropdown(false);
        setShowSymbolPalette(false);
        setShowSlashCommands(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onAskQuestion(inputText.trim(), mode);
    setInputText('');
    setShowSymbolPalette(false);
    setShowSlashCommands(false);
  };

  const handleInsertSymbol = (symbol: string) => {
    setInputText((prev) => prev + symbol);
    setShowSymbolPalette(false);
  };

  const handleSelectCommand = (samplePrompt: string) => {
    setInputText(samplePrompt);
    setShowSlashCommands(false);
  };

  const handleToggleVoice = () => {
    // Web speech recognition fallback or simulation
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
    } else {
      // Demo speech prompt
      setInputText('Cho tam giác ABC vuông tại A có AB = 6cm, AC = 8cm. Tính BC?');
    }
  };

  return (
    <footer 
      id="ai-assistant-dock"
      className="max-w-[1360px] w-full mx-auto relative z-30"
      data-purpose="ai-assistant-dock"
      ref={dropdownRef}
    >
      {/* Popover ký hiệu toán học khi bấm nút + */}
      {showSymbolPalette && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 md:left-48 md:translate-x-0 bg-white rounded-xl shadow-2xl border border-emerald-200 p-3 z-50 animate-fade-in w-72">
          <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center justify-between border-b pb-1.5">
            <span>Ký hiệu toán nhanh:</span>
            <button onClick={() => setShowSymbolPalette(false)} className="text-slate-400 hover:text-slate-600">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="grid grid-cols-6 gap-1.5 text-center">
            {['²', '³', '√', 'π', '±', '≠', '≤', '≥', '∞', 'Δ', '∠', '°', '⊥', '∥', '∈', '∉', '∩', '∪'].map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={() => handleInsertSymbol(sym)}
                className="p-1.5 bg-slate-50 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-mono text-xs rounded border border-slate-200 font-semibold transition"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popover lệnh nhanh khi bấm nút / */}
      {showSlashCommands && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 md:left-56 md:translate-x-0 bg-white rounded-xl shadow-2xl border border-emerald-200 p-3 z-50 animate-fade-in w-80">
          <div className="text-[11px] font-bold text-slate-600 mb-2 border-b pb-1.5">
            Đề bài toán mẫu thường gặp:
          </div>
          <div className="space-y-1 text-xs">
            <button
              type="button"
              onClick={() => handleSelectCommand('Cho tam giác ABC vuông tại A có AB = 6cm, AC = 8cm. Tính cạnh huyền BC?')}
              className="w-full text-left p-2 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition"
            >
              📐 Định lý Pytago: Cho tam giác vuông tính cạnh huyền
            </button>
            <button
              type="button"
              onClick={() => handleSelectCommand('Giải phương trình bậc nhất: 2x + 5 = 15')}
              className="w-full text-left p-2 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition"
            >
              🔢 Đại số: Giải phương trình 2x + 5 = 15
            </button>
            <button
              type="button"
              onClick={() => handleSelectCommand('Rút gọn phân thức: A = (x^2 - 4) / (x - 2) với x khác 2')}
              className="w-full text-left p-2 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition"
            >
              ⚡ Hằng đẳng thức: Rút gọn phân thức đại số
            </button>
            <button
              type="button"
              onClick={() => handleSelectCommand('Phát biểu định lý Ta-lét trong tam giác và tỉ số các đoạn thẳng?')}
              className="w-full text-left p-2 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition"
            >
              📏 Hình học 8: Định lý Ta-lét (Thales)
            </button>
          </div>
        </div>
      )}

      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Mini Badge / Lời chào */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md shrink-0">
            <i className="fa-solid fa-brain text-sm"></i>
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              Trợ Lý Toán Học Cô Tuyết AI
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Bạn muốn trao đổi bài tập toán hoặc giải đáp câu hỏi nào?
            </p>
          </div>
        </div>

        {/* Khung chat input */}
        <form
          onSubmit={handleSend}
          className="w-full md:max-w-xl flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500 transition relative"
        >
          <button
            id="btn-insert-math-symbol"
            type="button"
            onClick={() => {
              setShowSymbolPalette(!showSymbolPalette);
              setShowSlashCommands(false);
            }}
            title="Chèn ký hiệu toán học (+)"
            className="text-slate-400 hover:text-emerald-600 text-sm p-1 cursor-pointer transition"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button
            id="btn-quick-slash-commands"
            type="button"
            onClick={() => {
              setShowSlashCommands(!showSlashCommands);
              setShowSymbolPalette(false);
            }}
            title="Gợi ý câu hỏi toán (/)"
            className="text-slate-400 hover:text-emerald-600 text-sm p-1 cursor-pointer transition"
          >
            <i className="fa-solid fa-slash"></i>
          </button>

          <input
            id="math-problem-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập đề bài toán (hình học, đại số, phương trình)..."
            className="w-full bg-transparent border-0 text-xs focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium py-1 outline-none"
          />

          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2 relative">
            {/* Chế độ cân bằng / giải nhanh */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowModeDropdown(!showModeDropdown)}
                className="text-[11px] font-bold text-slate-600 whitespace-nowrap hidden sm:inline-flex items-center gap-1 hover:text-emerald-700 transition cursor-pointer"
              >
                {mode} <i className="fa-solid fa-chevron-down text-[9px] text-slate-400"></i>
              </button>

              {showModeDropdown && (
                <div className="absolute bottom-full right-0 mb-2 w-36 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-xs font-medium">
                  {(['Cân bằng', 'Giải chi tiết', 'Gợi ý từng bước'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMode(m);
                        setShowModeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-700 ${
                        mode === m ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mic button */}
            <button
              id="voice-input-btn"
              type="button"
              onClick={handleToggleVoice}
              title="Đọc đề bài qua giọng nói"
              className={`w-7 h-7 rounded-lg ${
                isListening ? 'bg-red-500 text-white animate-bounce' : 'bg-slate-200/80 hover:bg-slate-300 text-slate-600'
              } flex items-center justify-center text-xs transition cursor-pointer`}
            >
              <i className="fa-solid fa-microphone"></i>
            </button>

            {/* Submit button */}
            <button
              id="submit-math-question-btn"
              type="submit"
              title="Gửi câu hỏi cho Trợ Lý AI"
              className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center text-xs transition shadow-sm cursor-pointer"
            >
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </form>

        {/* Khẩu hiệu chân trang / Mở thử thách toán */}
        <div className="hidden lg:flex items-center text-right pr-2">
          <button
            id="open-challenge-dock-btn"
            type="button"
            onClick={onOpenWeeklyChallenge}
            className="text-[11px] font-extrabold text-emerald-800 tracking-tight uppercase hover:text-emerald-600 transition flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fa-solid fa-compass text-amber-500"></i>
            Thử Thách Toán Học & Khám Phá
          </button>
        </div>
      </div>
    </footer>
  );
};
