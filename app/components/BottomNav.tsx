"use client";

import { useRouter, usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
};

const parentNav: NavItem[] = [
  {
    label: "홈",
    href: "/parent",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? "#eef0ff" : "none"}
        />
      </svg>
    ),
  },
  {
    label: "예약현황",
    href: "/parent/status",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="3" y="4" width="18" height="18" rx="3"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          fill={active ? "#eef0ff" : "none"}
        />
        <path
          d="M8 2V6M16 2V6M3 10H21"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "설정",
    href: "/parent/setting",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12" cy="8" r="4"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          fill={active ? "#eef0ff" : "none"}
        />
        <path
          d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const academyNav: NavItem[] = [
  {
    label: "홈",
    href: "/academy",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={active ? "#eef0ff" : "none"}
        />
      </svg>
    ),
  },
  {
    label: "등원관리",
    href: "/academy/status",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12L11 14L15 10"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="3" y="3" width="18" height="18" rx="3"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          fill={active ? "#eef0ff" : "none"}
        />
      </svg>
    ),
  },
  {
    label: "아이들",
    href: "/academy/manage",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="9" cy="7" r="4"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          fill={active ? "#eef0ff" : "none"}
        />
        <path
          d="M1 21C1 18.2386 4.58172 16 9 16"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18 10V16M15 13H21"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "설정",
    href: "/academy/setting",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12" cy="8" r="4"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          fill={active ? "#eef0ff" : "none"}
        />
        <path
          d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20"
          stroke={active ? "#3f55ff" : "#b0b8c1"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav({ role }: { role: "parent" | "academy" }) {
  const router = useRouter();
  const pathname = usePathname();
  const items = role === "parent" ? parentNav : academyNav;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingBottom: "var(--safe-bottom)" }}
    >
      <div className="w-full max-w-[720px] bg-white border-t border-[#eaecf0]">
        <nav className="flex items-center">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-opacity active:opacity-60"
              >
                {item.icon(isActive)}
                <span
                  className={`text-[11px] font-semibold ${
                    isActive ? "text-[#3f55ff]" : "text-[#b0b8c1]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
