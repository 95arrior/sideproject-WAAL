"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainContainer from "../../../components/MainContainer";
import Icons from "../../../components/Icons";

interface FeaturesState {
  allowSmall: boolean;
  smallMaxKg: string;
  allowMedium: boolean;
  mediumMaxKg: string;
  allowLarge: boolean;
  largeMaxKg: string;
  hasShuttle: boolean;
  allowShy: boolean;
  hasClass: boolean;
}

function ToggleCard({
  emoji, title, desc, active, onToggle, children,
}: {
  emoji: string; title: string; desc: string;
  active: boolean; onToggle: () => void; children?: React.ReactNode;
}) {
  return (
    <div className={`rounded-[12px] border-[1.5px] p-4 transition-all ${active ? "border-[#3f59ff] bg-[rgba(63,89,255,0.04)]" : "border-[#e8e8e8] bg-white"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[28px]">{emoji}</span>
          <div>
            <p className="text-[15px] font-bold text-gray-900">{title}</p>
            <p className="text-[12px] text-[#858585] font-medium">{desc}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`relative w-[46px] h-[26px] rounded-full transition-colors flex-shrink-0 ${active ? "bg-[#3f59ff]" : "bg-[#d2d2d2]"}`}
        >
          <div className={`absolute top-[3px] w-[20px] h-[20px] bg-white rounded-full shadow-sm transition-transform ${active ? "translate-x-[23px]" : "translate-x-[3px]"}`} />
        </button>
      </div>
      {active && children && (
        <div className="mt-3 pt-3 border-t border-[#f0f0f0]">{children}</div>
      )}
    </div>
  );
}

function WeightInput({
  value, onChange, placeholder, hintLabel,
}: {
  value: string; onChange: (v: string) => void; placeholder: string; hintLabel: string;
}) {
  return (
    <>
      <div className="flex items-center gap-2">
        <p className="text-[13px] font-semibold text-gray-900 whitespace-nowrap">최대 허용 무게</p>
        <div className="flex items-center gap-1 flex-1">
          <input
            type="number" min={1} max={200}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 h-[42px] border-[1.5px] border-[#d2d2d2] rounded-[8px] px-3 text-[15px] font-bold text-gray-900 outline-none focus:border-[#3f59ff] transition-colors text-right"
          />
          <span className="text-[14px] font-semibold text-[#858585]">kg</span>
        </div>
      </div>
      {value && Number(value) > 0 && (
        <p className="text-[12px] text-[#3f59ff] font-medium mt-2">
          {value}kg 이하 {hintLabel}을 받을 수 있어요
        </p>
      )}
    </>
  );
}

export default function AcademyFeaturesPage() {
  const router = useRouter();
  const [features, setFeatures] = useState<FeaturesState>({
    allowSmall: false,  smallMaxKg: "",
    allowMedium: false, mediumMaxKg: "",
    allowLarge: false,  largeMaxKg: "",
    hasShuttle: false,
    allowShy: false,
    hasClass: false,
  });

  const toggle = (key: keyof FeaturesState) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setKg = (key: "smallMaxKg" | "mediumMaxKg" | "largeMaxKg", val: string) => {
    setFeatures((prev) => ({ ...prev, [key]: val }));
  };

  const isSizeSelected = features.allowSmall || features.allowMedium || features.allowLarge;
  const isSmallValid   = !features.allowSmall  || (features.smallMaxKg.trim()  !== "" && Number(features.smallMaxKg)  > 0);
  const isMediumValid  = !features.allowMedium || (features.mediumMaxKg.trim() !== "" && Number(features.mediumMaxKg) > 0);
  const isLargeValid   = !features.allowLarge  || (features.largeMaxKg.trim()  !== "" && Number(features.largeMaxKg)  > 0);
  const canProceed = isSizeSelected && isSmallValid && isMediumValid && isLargeValid;

  const handleNext = () => {
    // TODO: signupStore에 저장 후 이동
    // updateAcademyFeatures({ ... });
    router.push("/signup/academy/picture");
  };

  return (
    <MainContainer>
      {/* 헤더 */}
      <div className="flex items-center pt-[45px] pb-[20px]">
        <button
          onClick={() => router.back()}
          className="p-[18px] w-[57px] h-[57px] flex items-center justify-center -ml-[18px]"
        >
          <Icons.Prev className="w-[26px] h-[22px]" />
        </button>
      </div>

      {/* 제목 */}
      <div className="mb-[32px]">
        <h2 className="text-[25px] font-bold text-gray-900 leading-[30px] mb-[8px]">
          유치원 특징을 알려주세요!
        </h2>
        <p className="text-[15px] font-medium text-[#858585] leading-[22px]">
          보호자가 우리 유치원을 쉽게 찾을 수 있어요 🐾
        </p>
      </div>

      {/* 견종 크기 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[14px] font-bold text-gray-900">받을 수 있는 강아지 크기</p>
          <span className="text-[11px] text-[#ff6b6b] font-semibold">* 1개 이상 선택</span>
        </div>
        <div className="flex flex-col gap-3">
          <ToggleCard emoji="🐩" title="소형견" desc="최대 허용 무게를 입력해 주세요"
            active={features.allowSmall} onToggle={() => toggle("allowSmall")}>
            <WeightInput value={features.smallMaxKg} onChange={(v) => setKg("smallMaxKg", v)} placeholder="예) 10" hintLabel="소형견" />
          </ToggleCard>
          <ToggleCard emoji="🐕" title="중형견" desc="최대 허용 무게를 입력해 주세요"
            active={features.allowMedium} onToggle={() => toggle("allowMedium")}>
            <WeightInput value={features.mediumMaxKg} onChange={(v) => setKg("mediumMaxKg", v)} placeholder="예) 20" hintLabel="중형견" />
          </ToggleCard>
          <ToggleCard emoji="🦮" title="대형견" desc="최대 허용 무게를 입력해 주세요"
            active={features.allowLarge} onToggle={() => toggle("allowLarge")}>
            <WeightInput value={features.largeMaxKg} onChange={(v) => setKg("largeMaxKg", v)} placeholder="예) 45" hintLabel="대형견" />
          </ToggleCard>
        </div>
        {!isSizeSelected && (
          <p className="text-[12px] text-[#ff6b6b] mt-2 font-medium">견종 크기를 1개 이상 선택해 주세요</p>
        )}
      </div>

      {/* 서비스 옵션 */}
      <div className="mb-8">
        <p className="text-[14px] font-bold text-gray-900 mb-3">제공 서비스</p>
        <div className="flex flex-col gap-3">
          <ToggleCard emoji="🚌" title="통학버스 운영" desc="픽업·하원 셔틀 서비스 제공"
            active={features.hasShuttle} onToggle={() => toggle("hasShuttle")} />
          <ToggleCard emoji="🙈" title="사회성 없는 강아지 가능" desc="다견 환경 적응이 어려운 강아지도 OK"
            active={features.allowShy} onToggle={() => toggle("allowShy")} />
          <ToggleCard emoji="📚" title="교육 수업 운영" desc="훈련·교육 프로그램 제공"
            active={features.hasClass} onToggle={() => toggle("hasClass")} />
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="pb-[30px]">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full h-[59px] rounded-[10px] flex items-center justify-center font-bold text-[16px] transition-all ${
            canProceed ? "bg-[#3f59ff] text-white" : "bg-[#f0f0f0] text-[#b4b4b4] cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </div>
    </MainContainer>
  );
}
