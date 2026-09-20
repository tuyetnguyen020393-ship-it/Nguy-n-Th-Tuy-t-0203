import React from 'react';
import { Student } from '../types';

interface SubLeaderboardProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const SubLeaderboard: React.FC<SubLeaderboardProps> = ({
  students,
  onSelectStudent,
}) => {
  return (
    <div 
      id="sub-leaderboard-container"
      className="px-5 pb-6 pt-2"
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 flex-wrap gap-2">
        <h4 className="text-xs sm:text-[13px] font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
          <i className="fa-solid fa-fire text-orange-500"></i> CÁC BẠN CHĂM CHỈ ĐẠT ĐIỂM GIỎI TIÊU BIỂU (TỪ 8.0 ĐIỂM TRỞ LÊN):
        </h4>
        <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
          <i className="fa-regular fa-calendar-check"></i> Tuần học 24
        </span>
      </div>

      {/* Bảng 2 cột danh sách học sinh */}
      {students.length === 0 ? (
        <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 rounded-xl">
          Không tìm thấy học sinh nào phù hợp với bộ lọc tìm kiếm.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {students.map((student, idx) => {
            const rankNumber = student.rank || idx + 4;
            return (
              <div
                key={student.id}
                id={`sub-student-card-${student.id}`}
                onClick={() => onSelectStudent(student)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-600 font-black text-xs flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                    #{rankNumber}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                      {student.name}
                    </h5>
                    <p className="text-[10px] text-slate-400">
                      Lớp {student.classId} • {student.submissionsCount} bài nộp
                    </p>
                  </div>
                </div>
                <div className="bg-amber-100 text-amber-900 font-black text-xs px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-200 shrink-0">
                  {student.score.toFixed(1)} <i className="fa-solid fa-star text-amber-500 text-[10px]"></i>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
