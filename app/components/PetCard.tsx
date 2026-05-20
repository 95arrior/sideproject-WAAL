"use client";

import { useRouter } from "next/navigation";
import { Pet } from "../types/pet";

interface PetCardProps {
  pet: Pet;
}

function calculateAge(birthday: string): string {
  const year = parseInt(birthday.substring(0, 4));
  const month = parseInt(birthday.substring(4, 6)) - 1;
  const day = parseInt(birthday.substring(6, 8));
  const birthDate = new Date(year, month, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  if (months < 0) { years--; months += 12; }

  if (years === 0) return `${months}개월`;
  return `${years}살 ${months}개월`;
}

export default function PetCard({ pet }: PetCardProps) {
  const router = useRouter();
  const age = calculateAge(pet.petBirthday);
  const imageUrl = pet.petImage || null;

  return (
    <div
      onClick={() => router.push(`/parent/status?petId=${pet.id}&academyId=${pet.academyId}`)}
      data-card
      className="bg-white rounded-2xl shadow-sm w-[300px] flex-shrink-0 snap-center cursor-pointer active:opacity-90 transition-opacity overflow-hidden"
    >
      {/* 상단: 유치원명 + 수정 */}
      <div className="flex items-center justify-between px-5 pt-5 pb-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#3f55ff]" />
          <p className="text-[13px] font-bold text-[#3f55ff] truncate max-w-[160px]">
            {pet.academyName}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/parent/update?petId=${pet.id}`);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full active:bg-[#f5f6fa] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 이름 + 종 */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-extrabold text-[#191f28]">{pet.petName}</h2>
          <span className="text-[18px]">{pet.petGender === "MALE" ? "♂" : "♀"}</span>
        </div>
        <p className="text-[13px] text-[#8b95a1] font-medium mt-0.5">{pet.petBreed}</p>
      </div>

      {/* 사진 */}
      <div className="px-5 mt-4">
        <div className="w-full aspect-square rounded-2xl bg-[#f5f6fa] overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={pet.petName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span className="text-5xl">🐶</span>
              <p className="text-[12px] text-[#b0b8c1]">사진이 없어요</p>
            </div>
          )}
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="px-5 py-4 flex items-center gap-3">
        <div className="flex-1 bg-[#f5f6fa] rounded-xl px-4 py-3">
          <p className="text-[11px] font-semibold text-[#b0b8c1] mb-0.5">나이</p>
          <p className="text-[14px] font-bold text-[#191f28]">{age}</p>
        </div>
        <div className="flex-1 bg-[#eef0ff] rounded-xl px-4 py-3">
          <p className="text-[11px] font-semibold text-[#8b9be8] mb-0.5">등록 상태</p>
          <p className="text-[14px] font-bold text-[#3f55ff]">등원 중</p>
        </div>
      </div>
    </div>
  );
}
