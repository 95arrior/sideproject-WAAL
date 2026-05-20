"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../utils/auth";
import { api } from "../utils/api";
import { Pet, PetsResponse } from "../types/pet";
import PetCard from "../components/PetCard";
import WaitingCard from "../components/WaitingCard";
import RejectedCard from "../components/RejectedCard";
import AddPetCard from "../components/AddPetCard";
import BottomNav from "../components/BottomNav";
import BottomTabBar from "../components/BottomTabBar";

export default function ParentPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userInfo = authService.getCurrentUserInfo();
    if (!userInfo) {
      router.push("/");
      return;
    }
    setUserName(userInfo.name);

    const fetchPets = async () => {
      try {
        const response = await api.get<PetsResponse>("/api/v1/pets");
        if (response.success && response.data) {
          setPets(response.data.data);
        }
      } catch (error) {
        console.error("반려동물 목록 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, [router]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardEl = scrollRef.current.querySelector("[data-card]");
    const cardWidth = cardEl ? cardEl.clientWidth : 300;
    const gap = 16;
    const index = Math.round(scrollRef.current.scrollLeft / (cardWidth + gap));
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f5f6fa] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#eaecf0] border-t-[#3f55ff] rounded-full animate-spin" />
      </div>
    );
  }

  const totalCards = pets.length + 1;
  const petNames = pets.map((p) => p.petName).join(", ");

  return (
    <div className="w-full min-h-screen bg-[#f5f6fa] flex justify-center">
      <div className="w-full max-w-[720px] min-h-screen flex flex-col pb-24">

        {/* 상단 헤더 */}
        <div className="bg-[#f5f6fa] px-5 pt-16 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[14px] font-medium text-[#8b95a1] mb-1">반갑습니다 👋</p>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[24px] font-extrabold text-[#191f28]">
                  {petNames || userName}
                </h1>
                {petNames && (
                  <span className="text-[24px] font-extrabold text-[#191f28]">보호자님</span>
                )}
              </div>
            </div>

            {/* 설정 버튼 */}
            <button
              onClick={() => router.push("/parent/setting")}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:opacity-70 transition-opacity mt-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="3" stroke="#8b95a1" strokeWidth="2" />
                <path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* 카드 섹션 타이틀 */}
        <div className="px-5 mb-3">
          <p className="text-[13px] font-semibold text-[#8b95a1]">
            {pets.length > 0 ? `우리 아이 ${pets.length}마리` : "아이를 등록해보세요"}
          </p>
        </div>

        {/* 카드 스와이프 */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 px-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {pets.map((pet) => {
            if (pet.enrollmentStatus === "WAITING") return <WaitingCard key={pet.id} />;
            if (pet.enrollmentStatus === "CANCELLED") return <RejectedCard key={pet.id} />;
            if (pet.enrollmentStatus === "APPROVED") return <PetCard key={pet.id} pet={pet} />;
            return null;
          })}
          <AddPetCard />
        </div>

        {/* 인디케이터 */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {Array.from({ length: totalCards }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 bg-[#3f55ff]"
                  : "w-2 bg-[#d1d6db]"
              }`}
            />
          ))}
        </div>

        {/* 빠른 메뉴 */}
        <div className="px-5 mt-8">
          <p className="text-[13px] font-semibold text-[#8b95a1] mb-3">빠른 메뉴</p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {[
              {
                icon: "📅",
                label: "예약현황 확인",
                desc: "등원 예약 내역 보기",
                href: pets[0] ? `/parent/status?petId=${pets[0].id}&academyId=${pets[0].academyId}` : "/parent/status",
              },
              {
                icon: "✏️",
                label: "아이 정보 수정",
                desc: "반려동물 프로필 관리",
                href: pets[0] ? `/parent/update?petId=${pets[0].id}` : "/signup/parent/info",
              },
            ].map((item, idx, arr) => (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-4 px-5 py-4 active:bg-[#f5f6fa] transition-colors ${
                  idx < arr.length - 1 ? "border-b border-[#f5f6fa]" : ""
                }`}
              >
                <span className="text-2xl w-10 h-10 bg-[#f5f6fa] rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </span>
                <div className="flex-1 text-left">
                  <p className="text-[15px] font-semibold text-[#191f28]">{item.label}</p>
                  <p className="text-[12px] text-[#8b95a1] mt-0.5">{item.desc}</p>
                </div>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1L6 6L1 11" stroke="#b0b8c1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

      </div>

      <BottomNav role="parent" />
    </div>
    <BottomTabBar />
  );
}
