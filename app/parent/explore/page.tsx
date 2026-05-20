"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import MainContainer from "../../components/MainContainer";
import BottomNav from "../../components/BottomNav";
import { apiClient } from "../../utils/api";

interface ScheduleItem {
  dayOfWeek: string;
  isOpen: boolean;
  operatingStartTime: string;
  operatingEndTime: string;
}

interface Academy {
  id: number;
  name: string;
  address: string;
  addressDetail: string | null;
  phone: string | null;
  description: string | null;
  imageUrl: string | null;
  maxCapacity: number;
  scheduleList: ScheduleItem[] | null;
  allowSmall: boolean;
  smallMaxKg: number;
  allowMedium: boolean;
  mediumMaxKg: number;
  allowLarge: boolean;
  largeMaxKg: number;
  hasShuttle: boolean;
  allowShy: boolean;
  hasClass: boolean;
  createdAt: string;
}

type FilterKey = "small" | "medium" | "large" | "shuttle" | "shy" | "hasClass";
type SortOption = "name" | "capacity";

const FILTER_CHIPS: { key: FilterKey; label: string; emoji: string }[] = [
  { key: "small",    label: "소형견",             emoji: "🐩" },
  { key: "medium",   label: "중형견",             emoji: "🐕" },
  { key: "large",    label: "대형견",             emoji: "🦮" },
  { key: "shuttle",  label: "통학버스",           emoji: "🚌" },
  { key: "shy",      label: "사회성 없는 강아지", emoji: "🙈" },
  { key: "hasClass", label: "교육 수업",          emoji: "📚" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name",     label: "이름순" },
  { value: "capacity", label: "정원순" },
];

export default function ExplorePage() {
  const router = useRouter();
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [filters, setFilters] = useState<Record<FilterKey, boolean>>({
    small: false, medium: false, large: false,
    shuttle: false, shy: false, hasClass: false,
  });

  const toggleFilter = (key: FilterKey) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const fetchAcademies = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (searchTerm) params.set("keyword", searchTerm);
    if (filters.small)    params.set("allowSmall", "true");
    if (filters.medium)   params.set("allowMedium", "true");
    if (filters.large)    params.set("allowLarge", "true");
    if (filters.shuttle)  params.set("hasShuttle", "true");
    if (filters.shy)      params.set("allowShy", "true");
    if (filters.hasClass) params.set("hasClass", "true");

    const endpoint = `/api/v1/kindergartens${params.toString() ? `?${params}` : ""}`;
    const response = await apiClient.get<{ data: Academy[] }>(endpoint, { requireAuth: false });

    if (response.success && response.data) {
      const list: Academy[] = Array.isArray(response.data)
        ? response.data
        : (response.data as any).data ?? [];
      setAcademies(list);
    }
    setIsLoading(false);
  }, [searchTerm, filters]);

  useEffect(() => {
    const timer = setTimeout(fetchAcademies, 300);
    return () => clearTimeout(timer);
  }, [fetchAcademies]);

  const sorted = [...academies].sort((a, b) => {
    if (sortBy === "capacity") return b.maxCapacity - a.maxCapacity;
    return a.name.localeCompare(b.name);
  });

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const getTags = (a: Academy) => {
    const tags: string[] = [];
    if (a.allowSmall)  tags.push(`🐩 소형견 ${a.smallMaxKg}kg`);
    if (a.allowMedium) tags.push(`🐕 중형견 ${a.mediumMaxKg}kg`);
    if (a.allowLarge)  tags.push(`🦮 대형견 ${a.largeMaxKg}kg`);
    if (a.hasShuttle)  tags.push("🚌 통학버스");
    if (a.allowShy)    tags.push("🙈 사회성 없는 강아지");
    if (a.hasClass)    tags.push("📚 교육 수업");
    return tags;
  };

  return (
    <>
      <MainContainer bg="#f3f4f9" noPadding>
        {/* 헤더 */}
        <div className="bg-white px-4 sm:px-5 pt-14 sm:pt-[73px] pb-3 shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
          <h1 className="text-[22px] font-bold text-gray-900 mb-3">유치원 찾기 🔍</h1>

          {/* 검색창 */}
          <div className="relative mb-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="유치원 이름 또는 주소로 검색"
              className="w-full h-[48px] border border-[#d2d2d2] rounded-[10px] pl-4 pr-11 text-[15px] font-medium outline-none placeholder:text-[#b4b4b4] focus:border-[#3f59ff] transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#b4b4b4" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* 필터 칩 */}
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {FILTER_CHIPS.map(({ key, label, emoji }) => (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                className={`flex-shrink-0 flex items-center gap-[5px] px-3 h-[34px] rounded-full text-[12px] font-semibold border transition-all whitespace-nowrap ${
                  filters[key]
                    ? "bg-[#3f59ff] border-[#3f59ff] text-white"
                    : "bg-white border-[#d2d2d2] text-[#555]"
                }`}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* 정렬 */}
          <div className="flex items-center justify-end mt-2 gap-1.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={`px-3 h-[30px] rounded-full text-[11px] font-semibold transition-colors ${
                  sortBy === opt.value ? "bg-[#3f59ff] text-white" : "bg-[#f0f0f0] text-[#858585]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 결과 수 */}
        <div className="px-4 sm:px-5 pt-3 pb-1">
          <p className="text-[12px] font-medium text-[#858585]">
            총 <span className="text-[#3f59ff] font-bold">{sorted.length}</span>개의 유치원
            {activeFilterCount > 0 && (
              <span className="text-[#3f59ff] font-bold"> · 필터 {activeFilterCount}개 적용 중</span>
            )}
          </p>
        </div>

        {/* 카드 리스트 */}
        <div className="px-4 sm:px-5 pb-[100px] flex flex-col gap-3 mt-1">
          {isLoading ? (
            <div className="flex flex-col items-center py-20 gap-3">
              <div className="w-8 h-8 border-2 border-[#3f59ff] border-t-transparent rounded-full animate-spin" />
              <p className="text-[14px] text-[#858585] font-medium">유치원을 불러오는 중...</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center py-20 gap-3">
              <span className="text-5xl">🐾</span>
              <p className="text-[15px] text-[#858585] font-medium">조건에 맞는 유치원이 없어요</p>
              <button
                onClick={() => setFilters({ small: false, medium: false, large: false, shuttle: false, shy: false, hasClass: false })}
                className="text-[13px] text-[#3f59ff] font-semibold underline"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            sorted.map((academy) => {
              const tags = getTags(academy);
              return (
                <button
                  key={academy.id}
                  onClick={() => router.push(`/parent/explore/${academy.id}`)}
                  className="bg-white rounded-[14px] p-4 shadow-[0px_1px_4px_rgba(0,0,0,0.07)] text-left hover:shadow-[0px_3px_10px_rgba(63,89,255,0.13)] transition-all active:scale-[0.98]"
                >
                  <div className="flex gap-3">
                    {/* 이미지 */}
                    <div className="w-[70px] h-[70px] rounded-[10px] bg-[#e8eaff] flex-shrink-0 flex items-center justify-center text-3xl overflow-hidden">
                      {academy.imageUrl
                        ? <img src={academy.imageUrl} alt={academy.name} className="w-full h-full object-cover" />
                        : "🏫"}
                    </div>
                    {/* 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-[3px]">
                        <p className="text-[15px] font-bold text-gray-900 truncate">{academy.name}</p>
                      </div>
                      <p className="text-[11px] text-[#858585] truncate mb-1">📍 {academy.address}{academy.addressDetail ? ` ${academy.addressDetail}` : ""}</p>
                      <p className="text-[11px] text-[#3f59ff] font-semibold mb-2">
                        최대 {academy.maxCapacity}마리
                      </p>
                      {/* 태그 */}
                      <div className="flex flex-wrap gap-1">
                        {tags.map((tag) => (
                          <span key={tag} className="px-2 py-[2px] bg-[#f3f4f9] rounded-full text-[10px] font-semibold text-[#555]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                      <svg width="7" height="13" viewBox="0 0 8 14" fill="none">
                        <path d="M1 1L7 7L1 13" stroke="#d2d2d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </MainContainer>
      <BottomNav role="parent" />
    </>
  );
}
