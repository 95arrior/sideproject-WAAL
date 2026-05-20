"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "./utils/auth";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAndRedirect = async () => {
      let userInfo = authService.getCurrentUserInfo();
      const { tokenManager } = await import("./utils/cookies");
      const hasAccessToken = !!tokenManager.getAccessToken();
      const hasRefreshToken = !!tokenManager.getRefreshToken();

      if (userInfo && hasAccessToken) {
        redirectByRole(userInfo.role);
        return;
      }

      if (!userInfo && hasAccessToken) {
        const tokenInfo = authService.getUserInfoFromToken();
        if (tokenInfo) {
          redirectByRole(tokenInfo.role);
          return;
        }
      }

      if (!hasAccessToken && hasRefreshToken) {
        const refreshResult = await authService.refreshToken();
        if (refreshResult.success) {
          userInfo = authService.getCurrentUserInfo();
          if (userInfo) {
            redirectByRole(userInfo.role);
            return;
          } else {
            authService.logout();
          }
        } else {
          authService.logout();
        }
      }
    };

    const redirectByRole = (role: string) => {
      if (role === "USER") router.push("/parent");
      else if (role === "ACADEMY") router.push("/academy");
      else if (role === "TEMP") router.push("/signup/role");
      else if (role === "TEMP_ACADEMY") router.push("/signup/academy/onboarding");
      else if (role === "TEMP_USER") router.push("/signup/parent/onboarding");
    };

    checkAndRedirect();
  }, [router]);

  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[720px] min-h-screen flex flex-col px-5">

        {/* 상단 로고 */}
        <div className="pt-16 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#3f55ff] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">왈</span>
          </div>
          <span className="font-bold text-[#191f28] text-lg">WAAL</span>
        </div>

        {/* 히어로 타이틀 */}
        <div className="mt-10">
          <p className="text-[13px] font-semibold text-[#3f55ff] mb-3 tracking-wide uppercase">
            반려견 케어스페이스
          </p>
          <h1 className="text-[32px] font-extrabold text-[#191f28] leading-[1.25] mb-4">
            우리 아이의 유치원,<br />
            이제 앱으로 간편하게
          </h1>
          <p className="text-[15px] text-[#8b95a1] leading-relaxed">
            예약부터 등원 확인까지<br />
            유치원·호텔·놀이방을 한 곳에서
          </p>
        </div>

        {/* 이미지 */}
        <div className="mt-10 w-full">
          <div className="relative w-full aspect-[335/280] rounded-2xl overflow-hidden bg-[#f5f6fa]">
            <Image
              src="/images/로그인 및 회원가입_img.png"
              alt="WAAL 서비스 이미지"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 피처 뱃지 */}
        <div className="mt-6 flex gap-2 flex-wrap">
          {["실시간 등원 알림", "간편 예약", "아이 사진 공유"].map((f) => (
            <span
              key={f}
              className="px-3 py-1.5 bg-[#eef0ff] rounded-full text-[12px] font-semibold text-[#3f55ff]"
            >
              {f}
            </span>
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="mt-auto pb-10 pt-8 flex flex-col gap-3">
          <button
            onClick={() => router.push("/login")}
            className="w-full h-14 bg-[#3f55ff] rounded-2xl flex items-center justify-center font-bold text-white text-[16px] active:opacity-80 transition-opacity"
          >
            로그인
          </button>
          <button
            onClick={() => router.push("/signup/terms")}
            className="w-full h-14 bg-[#f5f6fa] rounded-2xl flex items-center justify-center font-bold text-[#191f28] text-[16px] active:opacity-80 transition-opacity"
          >
            회원가입
          </button>
        </div>

      </div>
    </div>
  );
}
