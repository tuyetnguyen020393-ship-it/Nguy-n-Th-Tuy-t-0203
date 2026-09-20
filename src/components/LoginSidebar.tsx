import React, { useState } from 'react';
import { UserSession, UserRole } from '../types';

interface LoginSidebarProps {
  userSession: UserSession;
  onLogin: (role: UserRole, username: string) => void;
  onLogout: () => void;
  onOpenHomework: () => void;
  onOpenZalo: () => void;
}

export const LoginSidebar: React.FC<LoginSidebarProps> = ({
  userSession,
  onLogin,
  onLogout,
  onOpenHomework,
  onOpenZalo,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');
  const [teacherUser, setTeacherUser] = useState('cotuyet.toan');
  const [teacherPass, setTeacherPass] = useState('CôTuyếtToán2025');
  const [studentUser, setStudentUser] = useState('HS-7A1-08');
  const [studentPass, setStudentPass] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'teacher') {
      onLogin('teacher', teacherUser);
      setLoginMessage('Đăng nhập thành công với vai trò Giáo viên!');
    } else {
      onLogin('student', studentUser);
      setLoginMessage('Chào mừng bạn học sinh vào lớp học!');
    }
    setTimeout(() => setLoginMessage(null), 3500);
  };

  return (
    <section 
      id="login-card-container"
      className="bg-white rounded-2xl shadow-xl p-5 border border-emerald-100 relative overflow-hidden transition-all duration-300 hover:shadow-2xl"
      data-purpose="login-card"
    >
      {/* Huy hiệu góc AI / Tech */}
      <div 
        id="ai-badge"
        className="absolute top-4 right-4 bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 select-none"
      >
        <i className="fa-solid fa-bolt text-[9px]"></i> AI 4.0
      </div>

      {/* Logo & Thương hiệu */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md ring-4 ring-emerald-50 shrink-0 overflow-hidden border border-emerald-100">
          <img
            src="https://i.postimg.cc/fThJLSnT/logo.png"
            alt="Logo Cô Tuyết Toán"
            className="w-full h-full object-contain p-1"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-xl text-slate-800 tracking-tight flex items-center gap-1.5">
            CÔ TUYẾT TOÁN
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            Hệ Thống Dạy & Học Toán THCS Thông Minh
          </p>
        </div>
      </div>

      {userSession.isLoggedIn ? (
        /* Đã đăng nhập */
        <div id="user-logged-in-box" className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 px-2 py-0.5 bg-emerald-100 rounded-full">
              {userSession.role === 'teacher' ? 'Đã đăng nhập: Giáo Viên' : 'Đã đăng nhập: Học Sinh'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
              {userSession.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">{userSession.name}</p>
              <p className="text-[11px] text-slate-500">{userSession.classOrTitle}</p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex gap-2">
            <button
              id="logout-btn"
              type="button"
              onClick={onLogout}
              className="w-full py-2 px-3 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 text-xs font-bold rounded-lg border border-red-200 transition flex items-center justify-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i> Đăng xuất
            </button>
          </div>
        </div>
      ) : (
        /* Chưa đăng nhập - Hiển thị Form như hình */
        <>
          {/* Bước 1: Chọn vai trò */}
          <div className="mb-4">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-2 block">
              1. CHỌN VAI TRÒ ĐĂNG NHẬP
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
              {/* Nút Học sinh */}
              <button
                id="role-student-btn"
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'student'
                    ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <i className={`fa-solid fa-user-graduate ${selectedRole === 'student' ? 'text-emerald-600' : 'text-slate-500'}`}></i> Học Sinh
              </button>
              {/* Nút Giáo viên (Mặc định chọn) */}
              <button
                id="role-teacher-btn"
                type="button"
                onClick={() => setSelectedRole('teacher')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'teacher'
                    ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                <i className={`fa-solid fa-chalkboard-user ${selectedRole === 'teacher' ? 'text-emerald-600' : 'text-slate-500'}`}></i> Giáo Viên
              </button>
            </div>
          </div>

          {/* Form đăng nhập */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {selectedRole === 'teacher' ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Tên đăng nhập Giáo Viên
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600 text-sm">
                      <i className="fa-regular fa-user"></i>
                    </div>
                    <input
                      id="teacher-username-input"
                      type="text"
                      value={teacherUser}
                      onChange={(e) => setTeacherUser(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-700 transition"
                      placeholder="Nhập tài khoản giáo viên..."
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Mật khẩu Giáo Viên
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-500 text-sm">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <input
                      id="teacher-password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={teacherPass}
                      onChange={(e) => setTeacherPass(e.target.value)}
                      className="w-full pl-9 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-700 transition tracking-widest"
                      placeholder="Mật khẩu..."
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <i className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-xs`}></i>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Mã Học Sinh / SĐT Phụ Huynh
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600 text-sm">
                      <i className="fa-solid fa-id-card"></i>
                    </div>
                    <input
                      id="student-id-input"
                      type="text"
                      value={studentUser}
                      onChange={(e) => setStudentUser(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-700 transition"
                      placeholder="Ví dụ: HS-7A1-08..."
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Mật khẩu Học Sinh
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-500 text-sm">
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <input
                      id="student-password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={studentPass}
                      onChange={(e) => setStudentPass(e.target.value)}
                      className="w-full pl-9 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-700 transition tracking-widest"
                      placeholder="Mật khẩu..."
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <i className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-xs`}></i>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Nút Đăng nhập CTA */}
            <button
              id="submit-login-btn"
              type="submit"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-700/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 mt-1 cursor-pointer"
            >
              <i className="fa-solid fa-right-to-bracket text-sm"></i>
              {selectedRole === 'teacher' ? 'ĐĂNG NHẬP HỆ THỐNG' : 'VÀO LỚP HỌC & XEM ĐIỂM'}
            </button>
          </form>
        </>
      )}

      {loginMessage && (
        <div className="mt-3 p-2 text-[11px] bg-emerald-100 text-emerald-800 rounded-lg text-center font-semibold animate-fade-in">
          {loginMessage}
        </div>
      )}

      {/* Divider Hỗ trợ nhanh */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400 bg-white px-2">
          HOẶC HỖ TRỢ NHANH
        </div>
      </div>

      {/* Các nút tiện ích con */}
      <div className="grid grid-cols-2 gap-2">
        <button
          id="quick-homework-btn"
          type="button"
          onClick={onOpenHomework}
          className="py-2 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg border border-emerald-200/70 flex items-center justify-center gap-1.5 transition text-center cursor-pointer"
        >
          <i className="fa-solid fa-square-root-variable text-emerald-600"></i> Bài tập toán
        </button>
        <button
          id="quick-zalo-btn"
          type="button"
          onClick={onOpenZalo}
          className="py-2 px-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-bold rounded-lg border border-sky-200/70 flex items-center justify-center gap-1.5 transition text-center cursor-pointer"
        >
          <i className="fa-solid fa-comment-dots text-sky-500"></i> Nhắn tin Zalo
        </button>
      </div>
    </section>
  );
};
