"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DatePickerModal from "../components/DatePickerModal";
import { useAuth } from "../components/CombinedProvider";
import { api } from "../utils/api";
import { formatApiDate, formatDate } from "../utils/date";
import { useStateStore } from "../store/stateStore";
import BottomNav from "../components/BottomNav";

export default function Academy() {
  const userInfo = useAuth();
  const router = useRouter();
  const { getSelectedDate, updateSelectedDate } = useStateStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [totalDogs, setTotalDogs] = useState(0);
  const [hasWaiting, setHasWaiting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDate = getSelectedDate();
      if (storedDate) {
        setSelectedDate(storedDate);
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        updateSelectedDate(today);
        setSelectedDate(today);
      }
    }
  }, [getSelectedDate, updateSelectedDate]);

  const fetchScheduleData = async (date: Date) => {
    if (!userInfo?.academyId) return;
    try {
      const searchDay = formatApiDate(date);
      const response = await api.get(
        `/api/v1/academies/${userInfo.academyId}/schedules/date/${searchDay}`,
      );
      if (response.success && response.data) {
        const data = (response.data as any).data;
        setTotalDogs(data?.currentReservations || 0);
      }
    } catch (error) {
      console.error("일정 조회 실패:", error);
    }
  };

  const fetchHasWaiting = async () => {
    if (!userInfo?.academyId) return;
    try {
      const response = await api.get(
        `/api/v1/academies/${userInfo.academyId}/has-waiting-pets`,
      );
      if (response.success && response.data) {
        setHasWaiting((response.data as any).data === true);
      }
    } catch {}
  };

  useEffect(() => {
    if (selectedDate) fetchScheduleData(selectedDate);
  }, [selectedDate, userInfo?.academyId]);

  useEffect(() => {
    fetchHasWaiting();
  }, [userInfo?.academyId]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    updateSelectedDate(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const statusUrl = useMemo(() => {
    if (!selectedDate) return "/academy/status";
    const yy = selectedDate.getFullYear().toString().substring(2);
    const mm = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const dd = selectedDate.getDate().toString().padStart(2, "0");
    return `/academy/status?date=${yy}${mm}${dd}`;
  }, [selectedDate]);

  return (
    <>
      <div className="w-full min-h-screen bg-[#f5f6fa] flex justify-center">
        <div className="w-full max-w-[720px] min-h-screen flex flex-col pb-24">

          {/* 상단 헤더 */}
          <div className="px-5 pt-16 pb-6">
            <p className="text-[14px] font-medium text-[#8b95a1] mb-1">안녕하세요 👋</p>
            <div className="flex items-center justify-between">
              <h1 className="text-[24px] font-extrabold text-[#191f28]">
                {userInfo?.academyName || "유치원"} 선생님
              </h1>
              <button
                onClick={() => router.push("/academy/setting")}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:opacity-70 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#8b95a1" strokeWidth="2" />
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C20.1245 17.2138 20.3125 17.6643 20.3125 18.1325C20.3125 18.6007 20.1245 19.0512 19.79 19.385C19.4562 19.7195 19.0057 19.9075 18.5375 19.9075C18.0693 19.9075 17.6188 19.7195 17.285 19.385L17.225 19.325C16.99 19.0942 16.6903 18.9393 16.3656 18.8803C16.0409 18.8214 15.706 18.8612 15.404 18.994C15.1077 19.1213 14.8558 19.3323 14.6785 19.6007C14.5013 19.8692 14.4067 20.1831 14.406 20.504V20.6C14.406 21.0896 14.2122 21.5592 13.8684 21.903C13.5246 22.2468 13.055 22.4406 12.5654 22.4406C12.0758 22.4406 11.6062 22.2468 11.2624 21.903C10.9186 21.5592 10.7248 21.0896 10.7248 20.6V20.554C10.7169 20.2229 10.6097 19.9018 10.4172 19.6325C10.2246 19.3632 9.95545 19.1582 9.645 19.044C9.343 18.9112 9.00815 18.8714 8.68341 18.9303C8.35868 18.9892 8.05916 19.1439 7.824 19.374L7.764 19.434C7.43025 19.7685 6.97975 19.9565 6.5115 19.9565C6.04325 19.9565 5.59275 19.7685 5.259 19.434C4.92525 19.1002 4.73725 18.6497 4.73725 18.1815C4.73725 17.7132 4.92525 17.2628 5.259 16.929L5.319 16.869C5.54946 16.6338 5.70421 16.3341 5.76302 16.0093C5.82183 15.6846 5.78213 15.3496 5.649 15.048C5.52169 14.7517 5.31076 14.4995 5.04247 14.3218C4.77419 14.1441 4.46003 14.0494 4.139 14.048H4.039C3.54942 14.048 3.07978 13.8542 2.73597 13.5104C2.39217 13.1666 2.19843 12.697 2.19843 12.2074C2.19843 11.7178 2.39217 11.2482 2.73597 10.9044C3.07978 10.5606 3.54942 10.3668 4.039 10.3668H4.085C4.41609 10.359 4.73722 10.2517 5.00652 10.0592C5.27581 9.86663 5.48094 9.5976 5.595 9.287C5.72813 8.985 5.76782 8.65015 5.70901 8.32541C5.6502 8.00068 5.49555 7.70116 5.265 7.466L5.205 7.406C4.87125 7.07225 4.68325 6.62175 4.68325 6.1535C4.68325 5.68525 4.87125 5.23475 5.205 4.901C5.53875 4.56725 5.98925 4.37925 6.4575 4.37925C6.92575 4.37925 7.37625 4.56725 7.71 4.901L7.77 4.961C8.00516 5.19146 8.30468 5.34621 8.62941 5.40502C8.95415 5.46383 9.28917 5.42413 9.591 5.291H9.637C9.93327 5.16369 10.1855 4.95276 10.3632 4.68447C10.5408 4.41619 10.6355 4.10203 10.637 3.781V3.681C10.637 3.19142 10.8308 2.72178 11.1746 2.37797C11.5184 2.03417 11.988 1.84043 12.4776 1.84043C12.9672 1.84043 13.4368 2.03417 13.7806 2.37797C14.1244 2.72178 14.3182 3.19142 14.3182 3.681V3.727C14.3194 4.0482 14.4148 4.36218 14.5925 4.63047C14.7701 4.89876 15.0223 5.10924 15.319 5.237C15.621 5.37013 15.956 5.40982 16.2807 5.35101C16.6054 5.2922 16.9049 5.13755 17.14 4.907L17.2 4.847C17.5338 4.51325 17.9842 4.32525 18.4525 4.32525C18.9208 4.32525 19.3713 4.51325 19.705 4.847C20.0388 5.18075 20.2268 5.63125 20.2268 6.0995C20.2268 6.56775 20.0388 7.01825 19.705 7.352L19.645 7.412C19.4145 7.64716 19.2598 7.94668 19.201 8.27141C19.1422 8.59615 19.1819 8.93117 19.315 9.233V9.279C19.4423 9.57527 19.6532 9.82749 19.9215 10.0052C20.1898 10.1828 20.504 10.2775 20.825 10.279H20.925C21.4146 10.279 21.8842 10.4727 22.228 10.8166C22.5718 11.1604 22.7655 11.63 22.7655 12.1196C22.7655 12.6092 22.5718 13.0788 22.228 13.4226C21.8842 13.7664 21.4146 13.9601 20.925 13.9601H20.879C20.5578 13.9616 20.2438 14.0569 19.9756 14.2346C19.7073 14.4122 19.4968 14.6644 19.369 14.961L19.4 15Z" stroke="#8b95a1" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-5 flex flex-col gap-4">
            {/* 대기 알림 배너 (대기 동물 있을 때만) */}
            {hasWaiting && (
              <button
                onClick={() => router.push("/academy/accept")}
                className="w-full bg-[#fff8ec] border border-[#ffe0a0] rounded-2xl px-5 py-4 flex items-center gap-3 active:opacity-80 transition-opacity animate-fade-in"
              >
                <span className="text-xl">🐾</span>
                <div className="flex-1 text-left">
                  <p className="text-[14px] font-bold text-[#c47d00]">신규 등록 대기 중</p>
                  <p className="text-[12px] text-[#c47d00]/80 mt-0.5">승인 대기 중인 아이가 있어요</p>
                </div>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1L6 6L1 11" stroke="#c47d00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* 오늘 등원 현황 카드 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* 날짜 선택 헤더 */}
              <button
                onClick={() => setIsDatePickerOpen(true)}
                className="w-full flex items-center justify-between px-5 pt-5 pb-3 active:opacity-70 transition-opacity"
              >
                <div className="flex items-center gap-2">
                  {selectedDate && isToday(selectedDate) && (
                    <span className="px-2 py-0.5 bg-[#eef0ff] rounded-full text-[11px] font-bold text-[#3f55ff]">오늘</span>
                  )}
                  <span className="text-[15px] font-semibold text-[#191f28]">
                    {selectedDate ? formatDate(selectedDate) : ""}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[13px] font-medium text-[#8b95a1]">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 6H14M5 1V3M11 1V3M2.5 2H13.5C13.7761 2 14 2.22386 14 2.5V13.5C14 13.7761 13.7761 14 13.5 14H2.5C2.22386 14 2 13.7761 2 13.5V2.5C2 2.22386 2.22386 2 2.5 2Z" stroke="#8b95a1" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  날짜 변경
                </div>
              </button>

              {/* 숫자 강조 영역 */}
              <button
                onClick={() => router.push(statusUrl)}
                className="w-full px-5 pb-5 flex items-end justify-between active:opacity-70 transition-opacity"
              >
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-[56px] font-black text-[#191f28] leading-none">{totalDogs}</span>
                    <span className="text-[20px] font-bold text-[#8b95a1] mb-2">마리</span>
                  </div>
                  <p className="text-[13px] font-medium text-[#8b95a1] mt-1">
                    등원 신청한 아이들이에요
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#eef0ff] rounded-xl flex items-center justify-center mb-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="#3f55ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>

            {/* 메뉴 그리드 */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: "🐶", label: "아이들\n관리", href: "/academy/manage", color: "#eef5ff" },
                { emoji: "✅", label: "승인\n관리", href: "/academy/accept", color: "#fff0f0" },
                { emoji: "🏫", label: "유치원\n설정", href: "/academy/setting", color: "#f0fff4" },
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className="bg-white rounded-2xl shadow-sm py-5 flex flex-col items-center gap-2 active:opacity-70 transition-opacity"
                >
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.emoji}
                  </span>
                  <p className="text-[13px] font-semibold text-[#191f28] text-center whitespace-pre-line leading-tight">
                    {item.label}
                  </p>
                </button>
              ))}
            </div>

            {/* 안내 문구 */}
            <div className="flex items-center gap-2 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d1d6db]" />
              <p className="text-[12px] text-[#b0b8c1]">
                보호자가 등원 신청하면 바로 확인할 수 있어요
              </p>
            </div>
          </div>

        </div>
      </div>

      <BottomNav role="academy" />

      {selectedDate && (
        <DatePickerModal
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      )}
    </>
  );
}
