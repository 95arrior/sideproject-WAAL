"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainContainer from "../../components/MainContainer";
import BottomTabBar from "../../components/BottomTabBar";

// ── 목업 데이터 ──────────────────────────────────────────────
const MOCK_ACADEMIES = [
  {
    id: 1,
    name: "해피독 유치원",
    address: "서울시 강남구 테헤란로 123",
    currentCount: 12,
    maxCapacity: 20,
    imageUrl: null,
    distance: 1.2,
    allowSmall: true,  smallMaxKg: 10,
    allowMedium: true, mediumMaxKg: 20,
    allowLarge: false, largeMaxKg: 0,
    hasShuttle: true,
    allowShy: false,
    hasClass: true,
  },
  {
    id: 2,
    name: "멍멍 펫스쿨",
    address: "서울시 서초구 방배로 45",
    currentCount: 15,
    maxCapacity: 15,
    imageUrl: null,
    distance: 2.5,
    allowSmall: true,  smallMaxKg: 8,
    allowMedium: true, mediumMaxKg: 15,
    allowLarge: false, largeMaxKg: 0,
    hasShuttle: false,
    allowShy: true,
    hasClass: false,
  },
  {
    id: 3,
    name: "왈왈 유치원",
    address: "서울시 송파구 올림픽로 88",
    currentCount: 7,
    maxCapacity: 15,
    imageUrl: null,
    distance: 3.8,
    allowSmall: false, smallMaxKg: 0,
    allowMedium: true, mediumMaxKg: 25,
    allowLarge: true,  largeMaxKg: 45,
    hasShuttle: true,
    allowShy: true,
    hasClass: true,
  },
  {
    id: 4,
    name: "포근한 강아지 유치원",
    address: "서울시 마포구 홍대로 22",
    currentCount: 3,
    maxCapacity: 10,
    imageUrl: null,
    distance: 5.1,
    allowSmall: true,  smallMaxKg: 10,
    allowMedium: false, mediumMaxKg: 0,
    allowLarge: false,  largeMaxKg: 0,
    hasShuttle: false,
    allowShy: true,
    hasClass: true,
  },
];

type FilterKey = "nearby" | "small" | "medium" | "large" | "shuttle" | "shy" | "hasClass";
type SortOption = "name" | "capacity" | "distance";

const FILTER_CHIPS: { key: FilterKey; label: string; emoji: string }[] = [
  { key: "nearby",   label: "내 주변",           emoji: "📍" },
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
  { value: "distance", label: "거리순" },
];

export default function ExplorePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("distance");
  const [filters, setFilters] = useState<Record<FilterKey, boolean>>({
    nearby: false, small: false, medium: false, large: false,
    shuttle: false, shy: false, hasClass: false,
  });

  const toggleFilter = (key: FilterKey) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const processed = MOCK_ACADEMIES
    .filter((a) => {
      if (searchTerm && !a.name.includes(searchTerm) && !a.address.includes(searchTerm)) return false;
      if (filters.nearby  && a.distance > 5)   return false;
      if (filters.small   && !a.allowSmall)     return false;
      if (filters.medium  && !a.allowMedium)    return false;
      if (filters.large   && !a.allowLarge)     return false;
      if (filters.shuttle && !a.hasShuttle)     return false;
      if (filters.shy     && !a.allowShy)       return false;
      if (filters.hasClass && !a.hasClass)      return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "capacity") return (b.maxCapacity - b.currentCount) - (a.maxCapacity - a.currentCount);
      return a.name.localeCompare(b.name);
    });

  const getTags = (a: typeof MOCK_ACADEMIES[0]) => {
    const tags: string[] = [];
    if (a.allowSmall)  tags.push(`🐩 소형견 ${a.smallMaxKg}kg`);
    if (a.allowMedium) tags.push(`🐕 중형견 ${a.mediumMaxKg}kg`);
    if (a.allowLarge)  tags.push(`🦮 대형견 ${a.largeMaxKg}kg`);
    if (a.hasShuttle)  tags.push("🚌 통학버스");
    if (a.allowShy)    tags.push("🙈 사회성 없는 강아지");
    if (a.hasClass)    tags.push("📚 교육 수업");
    return tags;
  };

  const formatDist = (km: number) => km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;

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
            총 <span className="text-[#3f59ff] font-bold">{processed.length}</span>개의 유치원
            {activeFilterCount > 0 && (
              <span className="text-[#3f59ff] font-bold"> · 필터 {activeFilterCount}개 적용 중</span>
            )}
          </p>
        </div>

        {/* 카드 리스트 */}
        <div className="px-4 sm:px-5 pb-[100px] flex flex-col gap-3 mt-1">
          {processed.length === 0 ? (
            <div className="flex flex-col items-center py-20 gap-3">
              <span className="text-5xl">🐾</span>
              <p className="text-[15px] text-[#858585] font-medium">조건에 맞는 유치원이 없어요</p>
              <button
                onClick={() => setFilters({ nearby: false, small: false, medium: false, large: false, shuttle: false, shy: false, hasClass: false })}
                className="text-[13px] text-[#3f59ff] font-semibold underline"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            processed.map((academy) => {
              const isFull = academy.currentCount >= academy.maxCapacity;
              const tags = getTags(academy);
              return (
                <button
                  key={academy.id}
                  onClick={() => router.push(`/parent/explore/${academy.id}`)}
                  className="bg-white rounded-[14px] p-4 shadow-[0px_1px_4px_rgba(0,0,0,0.07)] text-left hover:shadow-[0px_3px_10px_rgba(63,89,255,0.13)] transition-all active:scale-[0.98]"
                >
                  <div className="flex gap-3">
                    {/* 이미지 */}
                    <div className="w-[70px] h-[70px] rounded-[10px] bg-[#e8eaff] flex-shrink-0 flex items-center justify-center text-3xl">
                      🏫
                    </div>
                    {/* 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-[3px]">
                        <p className="text-[15px] font-bold text-gray-900 truncate">{academy.name}</p>
                        <span className={`flex-shrink-0 px-2 py-[2px] rounded-full text-[10px] font-bold ${isFull ? "bg-[#f0f0f0] text-[#858585]" : "bg-[rgba(63,89,255,0.1)] text-[#3f59ff]"}`}>
                          {isFull ? "마감" : "모집중"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px] text-[#858585] truncate flex-1">📍 {academy.address}</p>
                        <span className="text-[11px] font-bold text-[#3f59ff] flex-shrink-0 ml-2">
                          {formatDist(academy.distance)}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#3f59ff] font-semibold mb-2">
                        🐶 {academy.currentCount}/{academy.maxCapacity}마리
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
      <BottomTabBar />
    </>
  );
}
