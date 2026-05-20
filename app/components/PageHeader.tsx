"use client";

import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title?: string;
  variant?: "back" | "close";
  onBack?: () => void;
}

export default function PageHeader({ title, variant = "back", onBack }: PageHeaderProps) {
  const router = useRouter();
  const handleGoBack = onBack || (() => router.back());

  return (
    <div className={`relative flex items-center pt-14 ${title ? "justify-center" : ""}`}>
      <button
        onClick={handleGoBack}
        className={`w-10 h-10 flex items-center justify-center rounded-full active:bg-[#f5f6fa] transition-colors -ml-2 ${
          title ? "absolute left-0" : ""
        }`}
      >
        {variant === "close" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#191f28" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      {title && (
        <h1 className="text-[18px] font-bold text-[#191f28]">{title}</h1>
      )}
    </div>
  );
}
