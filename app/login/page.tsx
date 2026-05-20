"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkAndRedirect = async () => {
      let userInfo = authService.getCurrentUserInfo();
      const { tokenManager } = await import("../utils/cookies");
      const hasAccessToken = !!tokenManager.getAccessToken();
      const hasRefreshToken = !!tokenManager.getRefreshToken();

      if (userInfo && hasAccessToken) { redirectByRole(userInfo.role); return; }
      if (!userInfo && hasAccessToken) {
        const tokenInfo = authService.getUserInfoFromToken();
        if (tokenInfo) { redirectByRole(tokenInfo.role); return; }
      }
      if (!hasAccessToken && hasRefreshToken) {
        const refreshResult = await authService.refreshToken();
        if (refreshResult.success) {
          userInfo = authService.getCurrentUserInfo();
          if (userInfo) { redirectByRole(userInfo.role); return; }
          else { const { tokenManager: tm } = await import("../utils/cookies"); tm.clearTokens(); }
        } else {
          const { tokenManager: tm } = await import("../utils/cookies"); tm.clearTokens();
        }
      }
    };

    const redirectByRole = (role: string) => {
      if (role === "USER") window.location.href = "/parent";
      else if (role === "ACADEMY") window.location.href = "/academy";
      else if (role === "TEMP") window.location.href = "/signup/role";
      else if (role === "TEMP_ACADEMY") window.location.href = "/signup/academy/onboarding";
      else if (role === "TEMP_USER") window.location.href = "/signup/parent/onboarding";
    };

    checkAndRedirect();
  }, [router]);

  const handleLogin = async () => {
    if (!id.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.login({ memberId: id.trim(), password });
      if (result.success) {
        const role = result.data?.data.role;
        if (role === "USER") window.location.href = "/parent";
        else if (role === "ACADEMY") window.location.href = "/academy";
        else if (role === "TEMP") window.location.href = "/signup/role";
        else if (role === "TEMP_ACADEMY") window.location.href = "/signup/academy/onboarding";
        else if (role === "TEMP_USER") window.location.href = "/signup/parent/onboarding";
      } else {
        setError(result.error || "아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[720px] min-h-screen flex flex-col px-5">

        {/* 헤더 */}
        <div className="pt-14 flex items-center">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full active:bg-[#f5f6fa] transition-colors"
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* 타이틀 */}
        <div className="mt-8 mb-10">
          <h1 className="text-[26px] font-extrabold text-[#191f28] leading-tight mb-2">
            로그인
          </h1>
          <p className="text-[14px] text-[#8b95a1]">왈 아이디로 로그인해주세요</p>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-4">
          {/* 아이디 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#8b95a1]">아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="아이디를 입력해주세요"
              autoComplete="username"
              className={`w-full h-14 border-[1.5px] rounded-2xl px-4 text-[16px] font-medium outline-none transition-colors bg-white placeholder:text-[#d1d6db] ${
                id ? "border-[#3f55ff]" : "border-[#eaecf0]"
              } focus:border-[#3f55ff]`}
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#8b95a1]">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="current-password"
                className={`w-full h-14 border-[1.5px] rounded-2xl px-4 pr-12 text-[16px] font-medium outline-none transition-colors bg-white placeholder:text-[#d1d6db] ${
                  password ? "border-[#3f55ff]" : "border-[#eaecf0]"
                } focus:border-[#3f55ff]`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b0b8c1]"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20C7 20 2.73 16.39 1 12C1.93 9.73 3.63 7.84 5.76 6.61M9.9 4.24A9.12 9.12 0 0112 4C17 4 21.27 7.61 23 12C22.18 14.03 20.79 15.77 19.06 17.06" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12C2.73 7.61 7 4 12 4C17 4 21.27 7.61 23 12C21.27 16.39 17 20 12 20C7 20 2.73 16.39 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 rounded-xl">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#f04452" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="#f04452" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p className="text-[13px] font-medium text-[#f04452]">{error}</p>
            </div>
          )}
        </div>

        {/* 로그인 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleLogin}
            disabled={isLoading || !id.trim() || !password.trim()}
            className={`w-full h-14 rounded-2xl flex items-center justify-center font-bold text-[16px] transition-all ${
              isLoading || !id.trim() || !password.trim()
                ? "bg-[#eaecf0] text-[#b0b8c1] cursor-not-allowed"
                : "bg-[#3f55ff] text-white active:opacity-80"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>로그인 중...</span>
              </div>
            ) : (
              "로그인"
            )}
          </button>
        </div>

        {/* 아이디/비밀번호 찾기 */}
        <div className="flex justify-center items-center mt-5 gap-4">
          <button
            onClick={() => router.push("/find/id")}
            className="text-[13px] font-medium text-[#8b95a1] active:opacity-60"
          >
            아이디 찾기
          </button>
          <div className="w-px h-3 bg-[#d1d6db]" />
          <button
            onClick={() => router.push("/find/password")}
            className="text-[13px] font-medium text-[#8b95a1] active:opacity-60"
          >
            비밀번호 찾기
          </button>
        </div>

      </div>
    </div>
  );
}
