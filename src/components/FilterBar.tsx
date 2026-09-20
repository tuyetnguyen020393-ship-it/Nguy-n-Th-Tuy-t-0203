import React from 'react';
import { ClassFilter } from '../types';

interface FilterBarProps {
  filters: ClassFilter[];
  activeFilterId: string;
  onSelectFilter: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  activeFilterId,
  onSelectFilter,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div 
      id="class-filter-bar"
      className="p-4 border-b border-slate-100 bg-slate-50/70"
      data-purpose="class-filter-tabs"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Hàng tabs cuộn ngang */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs flex-1">
          <span className="text-slate-500 font-bold whitespace-nowrap text-[11px] pr-1">
            Lọc theo lớp:
          </span>

          {filters.map((filter) => {
            const isActive = activeFilterId === filter.id;
            return (
              <button
                key={filter.id}
                id={`filter-class-${filter.id}`}
                type="button"
                onClick={() => onSelectFilter(filter.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white font-bold shadow-sm'
                    : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-600'
                }`}
              >
                {filter.id === 'all' && (
                  <i className="fa-solid fa-star text-[10px] mr-1 text-white"></i>
                )}
                {filter.name}{' '}
                <span
                  className={
                    isActive ? 'text-amber-100 font-normal ml-0.5' : 'text-slate-400 font-normal ml-0.5'
                  }
                >
                  {filter.id === 'all' ? `(${filter.count} bài)` : filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Ô tìm kiếm nhanh học sinh */}
        <div className="relative shrink-0 sm:w-48">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <input
            type="text"
            placeholder="Tìm tên học sinh..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-700 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
