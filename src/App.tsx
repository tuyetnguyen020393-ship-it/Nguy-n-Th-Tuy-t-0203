import React, { useState, useMemo } from 'react';
import { UserSession, UserRole, Student } from './types';
import { CLASS_FILTERS, INITIAL_STUDENTS } from './data/mockData';
import { LoginSidebar } from './components/LoginSidebar';
import { TeacherProfileCard } from './components/TeacherProfileCard';
import { GoldenBanner } from './components/GoldenBanner';
import { FilterBar } from './components/FilterBar';
import { PodiumTop3 } from './components/PodiumTop3';
import { SubLeaderboard } from './components/SubLeaderboard';
import { AiAssistantDock } from './components/AiAssistantDock';
import { AiMathModal } from './components/AiMathModal';
import { HomeworkModal } from './components/HomeworkModal';
import { ZaloModal } from './components/ZaloModal';
import { StudentCertificateModal } from './components/StudentCertificateModal';
import { WeeklyChallengeModal } from './components/WeeklyChallengeModal';
import confetti from 'canvas-confetti';

export default function App() {
  // Authentication & Session
  const [userSession, setUserSession] = useState<UserSession>({
    isLoggedIn: false,
    role: 'teacher',
    name: 'Cô Tuyết',
    classOrTitle: 'Giáo Viên Phụ Trách Toán THCS & Công Nghệ 4.0',
    username: 'cotuyet.toan',
    avatar: 'T',
  });

  // Filter & Search
  const [activeFilterId, setActiveFilterId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiMode, setAiMode] = useState('Cân bằng');
  const [isHomeworkModalOpen, setIsHomeworkModalOpen] = useState(false);
  const [isZaloModalOpen, setIsZaloModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  // Filter students based on class tab and search query
  const filteredStudents = useMemo(() => {
    let list = INITIAL_STUDENTS;

    if (activeFilterId !== 'all') {
      list = list.filter((s) => s.classId.toLowerCase() === activeFilterId.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.classId.toLowerCase().includes(q) ||
          s.school.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeFilterId, searchQuery]);

  // Top 3 for the podium
  const topStudents = useMemo(() => {
    // Top 3 sorted by score desc
    return [...filteredStudents].sort((a, b) => b.score - a.score).slice(0, 3);
  }, [filteredStudents]);

  // Sub-leaderboard for #4 and remaining students
  const subStudents = useMemo(() => {
    const sorted = [...filteredStudents].sort((a, b) => b.score - a.score);
    return sorted.slice(3);
  }, [filteredStudents]);

  // Handlers
  const handleLogin = (role: UserRole, username: string) => {
    if (role === 'teacher') {
      setUserSession({
        isLoggedIn: true,
        role: 'teacher',
        name: 'Cô Tuyết',
        classOrTitle: 'Giáo Viên Phụ Trách Toán THCS',
        username: username || 'cotuyet.toan',
        avatar: 'T',
      });
    } else {
      setUserSession({
        isLoggedIn: true,
        role: 'student',
        name: 'Nguyễn Minh Châu',
        classOrTitle: 'Học sinh Lớp 7A1 • Top 1 Xuất Sắc',
        username: username || 'HS-7A1-08',
        avatar: 'C',
      });
    }
  };

  const handleLogout = () => {
    setUserSession((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsCertificateModalOpen(true);
  };

  const handleAskQuestion = (question: string, mode: string) => {
    setAiQuestion(question);
    setAiMode(mode);
    setIsAiModalOpen(true);
  };

  const handleCelebrate = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#fbbf24', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="text-slate-800 antialiased min-h-screen flex flex-col justify-between p-3 md:p-5 lg:p-6 selection:bg-emerald-500 selection:text-white">
      {/* Main layout container */}
      <div 
        id="main-app-container"
        className="max-w-[1360px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-start"
      >
        {/* Left Sidebar: Login & Teacher Profile */}
        <aside 
          id="left-sidebar"
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <LoginSidebar
            userSession={userSession}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onOpenHomework={() => setIsHomeworkModalOpen(true)}
            onOpenZalo={() => setIsZaloModalOpen(true)}
          />

          <TeacherProfileCard
            onOpenZalo={() => setIsZaloModalOpen(true)}
          />
        </aside>

        {/* Right Main Content: Golden Banner & Leaderboards */}
        <main 
          id="right-main-content"
          className="lg:col-span-8 flex flex-col gap-4"
        >
          <section 
            id="honor-board-section"
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 flex flex-col transition-all duration-300 hover:shadow-2xl"
          >
            {/* Golden Honor Banner */}
            <GoldenBanner onCelebrate={handleCelebrate} />

            {/* Class Filter Bar */}
            <FilterBar
              filters={CLASS_FILTERS}
              activeFilterId={activeFilterId}
              onSelectFilter={(id) => setActiveFilterId(id)}
              searchQuery={searchQuery}
              onSearchChange={(q) => setSearchQuery(q)}
            />

            {/* Top 3 Podium Cards */}
            <PodiumTop3
              topStudents={topStudents}
              onSelectStudent={handleSelectStudent}
            />

            {/* Sub Leaderboard Cards (#4+) */}
            <SubLeaderboard
              students={subStudents}
              onSelectStudent={handleSelectStudent}
            />
          </section>
        </main>
      </div>

      {/* Bottom Interactive AI Assistant Dock */}
      <AiAssistantDock
        onAskQuestion={handleAskQuestion}
        onOpenWeeklyChallenge={() => setIsChallengeModalOpen(true)}
      />

      {/* Interactive Modals */}
      <AiMathModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialQuestion={aiQuestion}
        mode={aiMode}
      />

      <HomeworkModal
        isOpen={isHomeworkModalOpen}
        onClose={() => setIsHomeworkModalOpen(false)}
      />

      <ZaloModal
        isOpen={isZaloModalOpen}
        onClose={() => setIsZaloModalOpen(false)}
      />

      <StudentCertificateModal
        isOpen={isCertificateModalOpen}
        student={selectedStudent}
        onClose={() => {
          setIsCertificateModalOpen(false);
          setSelectedStudent(null);
        }}
      />

      <WeeklyChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
      />
    </div>
  );
}
