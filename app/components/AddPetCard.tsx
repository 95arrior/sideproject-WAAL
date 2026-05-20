"use client";

import { useRouter } from "next/navigation";
import { useSignupStore } from "../store/signupStore";

export default function AddPetCard() {
  const router = useRouter();
  const { setIsAddingPet, resetPetData } = useSignupStore();

  const handleAddPet = () => {
    setIsAddingPet(true);
    resetPetData();
    router.push("/signup/parent/info");
  };

  return (
    <button
      onClick={handleAddPet}
      data-card
      className="bg-white rounded-2xl shadow-sm w-[300px] min-h-[420px] flex-shrink-0 snap-center flex flex-col items-center justify-center gap-4 active:opacity-70 transition-opacity border-2 border-dashed border-[#eaecf0]"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#f5f6fa] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="#b0b8c1" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-[16px] font-bold text-[#191f28]">아이 추가하기</p>
        <p className="text-[13px] text-[#b0b8c1] mt-1">반려동물을 등록해보세요</p>
      </div>
    </button>
  );
}
