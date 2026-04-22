import { AppLayout } from "@common/components/AppLayout";
import { useAppsStore } from "@common/stores/appsStore";
import { useThemeStore } from "@common/stores/themeStore";
import { hasAppAccess } from "@common/utils/appPath";
import type { CSSProperties, ReactNode } from "react";

interface PortalApp {
  title: string;
  description: string;
  href: string;
  renderIcon: (color: string) => ReactNode;
}

// Lucide 24x24 아이콘을 48x48 rounded 배경에 가운데 배치하는 헬퍼.
const renderBoxedIcon = (paths: ReactNode) => (color: string) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="12" fill={color} fillOpacity="0.1" />
    <g
      transform="translate(12, 12)"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {paths}
    </g>
  </svg>
);

const apps: PortalApp[] = [
  {
    title: "샘플",
    description: "샘플 조회 · 관리",
    href: "/sample/",
    renderIcon: renderBoxedIcon(
      <>
        <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2" />
        <path d="M8.5 2h7" />
        <path d="M14.5 16h-5" />
      </>,
    ),
  },
  {
    title: "패턴",
    description: "패턴 관리",
    href: "/pattern/",
    renderIcon: renderBoxedIcon(
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    ),
  },
  {
    title: "빌드",
    description: "빌드 관리",
    href: "/build/",
    renderIcon: renderBoxedIcon(
      <>
        <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
        <path d="M17.64 15 22 10.64" />
        <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
      </>,
    ),
  },
  {
    title: "업데이트",
    description: "업데이트 관리",
    href: "/update/",
    renderIcon: renderBoxedIcon(
      <>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </>,
    ),
  },
  {
    title: "서버",
    description: "서버 현황 · 관리",
    href: "/server/",
    renderIcon: renderBoxedIcon(
      <>
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </>,
    ),
  },
  {
    title: "통계",
    description: "서비스 통계 조회",
    href: "/statistics/",
    renderIcon: renderBoxedIcon(
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </>,
    ),
  },
  {
    title: "위협정보",
    description: "위협정보 조회",
    href: "/threat/",
    renderIcon: renderBoxedIcon(
      <>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </>,
    ),
  },
  {
    title: "전용 백신",
    description: "전용 백신 관리",
    href: "/vaccine/",
    renderIcon: renderBoxedIcon(
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    ),
  },
  {
    title: "관리자 설정",
    description: "회원 조회 · 승인 · 관리",
    href: "/admin/",
    renderIcon: renderBoxedIcon(
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>,
    ),
  },
];

export function PortalPage() {
  const { theme } = useThemeStore();
  const { apps: accessibleApps } = useAppsStore();
  const visibleApps = apps.filter((app) =>
    hasAppAccess(accessibleApps, app.href),
  );

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "36px 28px",
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.card,
    textDecoration: "none",
    color: theme.colors.text,
    cursor: "pointer",
    transition: "box-shadow 0.2s, transform 0.2s",
    width: "180px",
  };

  return (
    <AppLayout appName="Portal" version={__APP_VERSION__}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(visibleApps.length, 4)}, 180px)`,
            justifyContent: "center",
            alignContent: "start",
            columnGap: "100px",
            rowGap: "40px",
          }}
        >
          {visibleApps.map((app) => (
            <a key={app.href} href={app.href} style={cardStyle}>
              {app.renderIcon(theme.colors.primary)}
              <span style={{ fontSize: "16px", fontWeight: 600 }}>
                {app.title}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: theme.colors.textMuted,
                  textAlign: "center",
                }}
              >
                {app.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
