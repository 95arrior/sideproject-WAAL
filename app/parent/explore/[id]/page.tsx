"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MainContainer from "../../../components/MainContainer";
import { apiClient } from "../../../utils/api";

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
}

const DAY_ORDER = ["월", "화", "수", "목", "금", "토", "일"];

export default function AcademyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [academy, setAcademy] = useState<Academy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const response = await apiClient.get<Academy>(`/api/v1/kindergartens/${id}`, { requireAuth: false });
      if (response.success && response.data) {
        const raw = response.data as any;
        setAcademy(raw.data ?? raw);
      } else {
        setNotFound(true);
      }
      setIsLoading(false);
    };
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <MainContainer bg="#f3f4f9" noPadding>
        <div className="flex flex-col items-center justify-center h-screen gap-3">
          <div className="w-8 h-8 border-2 border-[#3f59ff] border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-[#858585]">불러오는 중...</p>
        </div>
      </MainContainer>
    );
  }

  if (notFound || !academy) {
    return (
      <MainContainer bg="#f3f4f9" noPadding>
        <div className="flex flex-col items-center justify-center h-screen gap-3">
          <span className="text-5xl">😢</span>
          <p className="text-[15px] text-[#858585] font-medium">유치원 정보를 찾을 수 없어요</p>
          <button onClick={() => router.back()} className="text-[13px] text-[#3f59ff] font-semibold underline">
            돌아가기
          </button>
        </div>
      </MainContainer>
    );
  }

  const sizeTags: string[] = [];
  if (academy.allowSmall)  sizeTags.push(`🐩 소형견 (최대 ${academy.smallMaxKg}kg)`);
  if (academy.allowMedium) sizeTags.push(`🐕 중형견 (최대 ${academy.mediumMaxKg}kg)`);
  if (academy.allowLarge)  sizeTags.push(`🦮 대형견 (최대 ${academy.largeMaxKg}kg)`);

  const serviceTags: string[] = [];
  if (academy.hasShuttle) serviceTags.push("🚌 통학버스 운영");
  if (academy.allowShy)   serviceTags.push("🙈 사회성 없는 강아지 가능");
  if (academy.hasClass)   serviceTags.push("📚 교육 수업 운영");

  const openDays = academy.scheduleList
    ?.filter((s) => s.isOpen)
    .map((s) => s.dayOfWeek) ?? [];

  const firstOpenSchedule = academy.scheduleList?.find((s) => s.isOpen);

  return (
    <MainContainer bg="#f3f4f9" noPadding>
      {/* 상단 이미지 */}
      <div className="relative">
        <div className="w-full h-[220px] bg-[#e8eaff] flex items-center justify-center text-8xl overflow-hidden">
          {academy.imageUrl
            ? <img src={academy.imageUrl} alt={academy.name} className="w-full h-full object-cover" />
            : "🏫"}
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
      </div>

      <div className="px-4 sm:px-5 -mt-4 pb-10">
        {/* 기본 정보 */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-3">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">{academy.name}</h1>
          <p className="text-[13px] text-[#858585] font-medium mb-1">
            📍 {academy.address}{academy.addressDetail ? ` ${academy.addressDetail}` : ""}
          </p>
          {academy.phone && (
            <p className="text-[13px] text-[#858585] font-medium">📞 {academy.phone}</p>
          )}
        </div>

        {/* 정원 현황 */}
        <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-3">
          <p className="text-[15px] font-bold text-gray-900 mb-1">정원</p>
          <p className="text-[14px] text-[#3f59ff] font-semibold">최대 {academy.maxCapacity}마리</p>
        </div>

        {/* 받을 수 있는 견종 */}
        {sizeTags.length > 0 && (
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
        )}

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
        {academy.scheduleList && academy.scheduleList.length > 0 && (
          <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-3">
            <p className="text-[15px] font-bold text-gray-900 mb-3">운영 정보</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[13px] text-[#858585] w-16 flex-shrink-0">운영 요일</span>
              <div className="flex gap-1">
                {DAY_ORDER.map((day) => {
                  const active = openDays.includes(day);
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
            {firstOpenSchedule && (
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#858585] w-16 flex-shrink-0">운영 시간</span>
                <span className="text-[13px] font-semibold text-gray-900">
                  {firstOpenSchedule.operatingStartTime} ~ {firstOpenSchedule.operatingEndTime}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 소개 */}
        {academy.description && (
          <div className="bg-white rounded-[16px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] mb-5">
            <p className="text-[15px] font-bold text-gray-900 mb-2">유치원 소개</p>
            <p className="text-[14px] text-[#555] leading-relaxed">{academy.description}</p>
          </div>
        )}

        {/* 등록 버튼 */}
        <button
          onClick={() => alert("등록 신청 페이지로 이동")}
          className="w-full h-[56px] rounded-[12px] flex items-center justify-center font-bold text-[16px] bg-[#3f59ff] text-white shadow-[0px_4px_12px_rgba(63,89,255,0.3)] active:scale-[0.98] transition-all"
        >
          🐾 우리 아이 등록 신청하기
        </button>
      </div>
    </MainContainer>
  );
}
