"use client";

import { useRouter, useParams } from "next/navigation";
import MainContainer from "../../../components/MainContainer";

// ── 목업 데이터 ──────────────────────────────────────────────
const MOCK_ACADEMIES = [
  {
    id: 1,
    name: "해피독 유치원",
    address: "서울시 강남구 테헤란로 123",
    addressDetail: "2층",
    phone: "02-1234-5678",
    description: "강아지들이 행복하게 뛰놀 수 있는 안전한 공간을 제공합니다. 전문 훈련사가 상주하여 교육 프로그램을 운영하고 있습니다. 소형견부터 중형견까지 모두 환영해요!",
    currentCount: 12,
    maxCapacity: 20,
    allowSmall: true,  smallMaxKg: 10,
    allowMedium: true, mediumMaxKg: 20,
    allowLarge: false, largeMaxKg: 0,
    hasShuttle: true,
    allowShy: false,
    hasClass: true,
    operatingDays: ["월", "화", "수", "목", "금"],
    openTime: "08:00",
    closeTime: "19:00",
  },
  {
    id: 2,
    name: "멍멍 펫스쿨",
    address: "서울시 서초구 방배로 45",
    addressDetail: "1층",
    phone: "02-9876-5432",
    description: "사회성이 부족한 강아지도 천천히 적응할 수 있도록 1:1 케어를 제공합니다.",
    currentCount: 15,
    maxCapacity: 15,
    allowSmall: true,  smallMaxKg: 8,
    allowMedium: true, mediumMaxKg: 15,
    allowLarge: false, largeMaxKg: 0,
    hasShuttle: false,
    allowShy: true,
    hasClass: false,
    operatingDays: ["월", "화", "수", "목", "금", "토"],
    openTime: "07:30",
    closeTime: "20:00",
  },
  {
    id: 3,
    name: "왈왈 유치원",
    address: "서울시 송파구 올림픽로 88",
    addressDetail: "B1",
    phone: "02-5555-1234",
    description: "넓은 실내 운동장을 보유하고 있어요. 대형견도 마음껏 뛰어놀 수 있습니다.",
    currentCount: 7,
    maxCapacity: 15,
    allowSmall: false, smallMaxKg: 0,
    allowMedium: true, mediumMaxKg: 25,
    allowLarge: true,  largeMaxKg: 45,
    hasShuttle: true,
    allowShy: true,
    hasClass: true,
    operatingDays: ["월", "화", "수", "목", "금"],
    openTime: "09:00",
    closeTime: "18:00",
  },
  {
    id: 4,
    name: "포근한 강아지 유치원",
    address: "서울시 마포구 홍대로 22",
    addressDetail: "3층",
    phone: "02-7777-8888",
    description: "소형견 전문 유치원입니다. 아이들이 편안하게 쉬고 놀 수 있는 환경을 만들었어요.",
    currentCount: 3,
    maxCapacity: 10,
    allowSmall: true,  smallMaxKg: 10,
    allowMedium: false, mediumMaxKg: 0,
    allowLarge: false,  largeMaxKg: 0,
    hasShuttle: false,
    allowShy: true,
    hasClass: true,
    operatingDays: ["월", "화", "수", "목", "금", "토", "일"],
    openTime: "08:00",
    closeTime: "21:00",
  },
];

export default function AcademyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const academy = MOCK_ACADEMIES.find((a) => a.id === id) ?? MOCK_ACADEMIES[0];
  const isFull = academy.currentCount >= academy.maxCapacity;
  const capacityPercent = Math.round((academy.currentCount / academy.maxCapacity) * 100);

  const sizeTags: string[] = [];
  if (academy.allowSmall)  sizeTags.push(`🐩 소형견 (최대 ${academy.smallMaxKg}kg)`);
  if (academy.allowMedium) sizeTags.push(`🐕 중형견 (최대 ${academy.mediumMaxKg}kg)`);
  if (academy.allowLarge)  sizeTags.push(`🦮 대형견 (최대 ${academy.largeMaxKg}kg)`);

  const serviceTags: string[] = [];
  if (academy.hasShuttle) serviceTags.push("🚌 통학버스 운영");
  if (academy.allowShy)   serviceTags.push("🙈 사회성 없는 강아지 가능");
  if (academy.hasClass)   serviceTags.push("📚 교육 수업 운영");

  const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <MainContainer bg="#f3f4f9" noPadding>
      {/* 상단 이미지 */}
      <div className="relative">
        <div className="w-full h-[220px] bg-[#e8eaff] flex items-center justify-center text-8xl">
          🏫
        </div>
        {/* 뒤로가기 */}
        <button
          onClick={() => router.back()}
          className="absolute top-12 sm:top-[60px] left-4 w-[38px] h-[38px] bg-white rounded-full shadow-md flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#363e4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* 모집 뱃지 */}
        <div className="absolute top-12 sm:top-[60px] right-4">
          <span className={`px-3 py-1.5 rounded-full text-[12px] font-bold shadow-md ${isFull ? "bg-white text-[#858585]" : "bg-[#3f59ff] text-white"}`}>
            {isFull ? "마감" : "모집중 🐾"}
          </span>
        </div>
      </div>

      <div className="px-4 sm:px-5 -mt-4 pb-10">
        {/* 기본 정보 */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-3">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">{academy.name}</h1>
          <p className="text-[13px] text-[#858585] font-medium mb-1">📍 {academy.address} {academy.addressDetail}</p>
          <p className="text-[13px] text-[#858585] font-medium">📞 {academy.phone}</p>
        </div>

        {/* 정원 현황 */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[15px] font-bold text-gray-900">정원 현황</p>
            <p className="text-[13px] font-bold text-[#3f59ff]">
              {academy.currentCount} / {academy.maxCapacity}마리
            </p>
          </div>
          <div className="w-full h-[10px] bg-[#f0f0f0] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${capacityPercent >= 90 ? "bg-[#ff6b6b]" : "bg-[#3f59ff]"}`}
              style={{ width: `${Math.min(capacityPercent, 100)}%` }}
            />
          </div>
          <p className="text-[12px] text-[#858585] mt-2">
            {isFull ? "현재 정원이 가득 찼어요 😢" : `아직 ${academy.maxCapacity - academy.currentCount}자리 남았어요! 🎉`}
          </p>
        </div>

        {/* 받을 수 있는 견종 */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-3">
          <p className="text-[15px] font-bold text-gray-900 mb-3">받을 수 있는 강아지</p>
          <div className="flex flex-col gap-2">
            {sizeTags.map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3f59ff]" />
                <span className="text-[14px] font-medium text-gray-800">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 제공 서비스 */}
        {serviceTags.length > 0 && (
          <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-3">
            <p className="text-[15px] font-bold text-gray-900 mb-3">제공 서비스</p>
            <div className="flex flex-col gap-2">
              {serviceTags.map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#3f59ff]" />
                  <span className="text-[14px] font-medium text-gray-800">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 운영 정보 */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-3">
          <p className="text-[15px] font-bold text-gray-900 mb-3">운영 정보</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[13px] text-[#858585] w-16 flex-shrink-0">운영 요일</span>
            <div className="flex gap-1">
              {DAYS.map((day) => {
                const active = academy.operatingDays.includes(day);
                return (
                  <span
                    key={day}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold ${active ? "bg-[#3f59ff] text-white" : "bg-[#f0f0f0] text-[#b4b4b4]"}`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#858585] w-16 flex-shrink-0">운영 시간</span>
            <span className="text-[13px] font-semibold text-gray-900">
              {academy.openTime} ~ {academy.closeTime}
            </span>
          </div>
        </div>

        {/* 소개 */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-5">
          <p className="text-[15px] font-bold text-gray-900 mb-2">유치원 소개</p>
          <p className="text-[14px] text-[#555] leading-relaxed">{academy.description}</p>
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={() => alert("등록 신청 페이지로 이동")}
          disabled={isFull}
          className={`w-full h-[56px] rounded-[12px] flex items-center justify-center font-bold text-[16px] transition-all ${
            isFull
              ? "bg-[#f0f0f0] text-[#b4b4b4] cursor-not-allowed"
              : "bg-[#3f59ff] text-white shadow-[0px_4px_12px_rgba(63,89,255,0.3)] active:scale-[0.98]"
          }`}
        >
          {isFull ? "현재 모집이 마감되었어요" : "🐾 우리 아이 등록 신청하기"}
        </button>
      </div>
    </MainContainer>
  );
}
