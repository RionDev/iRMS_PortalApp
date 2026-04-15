import { AppLayout } from "@common/components/AppLayout";
import { useAppsStore } from "@common/stores/appsStore";
import { useThemeStore } from "@common/stores/themeStore";
import type { CSSProperties, ReactNode } from "react";

interface PortalApp {
  title: string;
  description: string;
  href: string;
  renderIcon: (color: string) => ReactNode;
}

const apps: PortalApp[] = [
  {
    title: "관리자 설정",
    description: "회원 조회 · 승인 · 관리",
    href: "/admin/",
    renderIcon: (color) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={color} fillOpacity="0.1" />
        <path
          d="M17 16a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm14 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM17 24c-3.31 0-6 1.34-6 3v2h12v-2c0-1.66-2.69-3-6-3Zm14 0c-3.31 0-6 1.34-6 3v2h12v-2c0-1.66-2.69-3-6-3Z"
          fill={color}
        />
        <rect
          x="14"
          y="32"
          width="20"
          height="2"
          rx="1"
          fill={color}
          fillOpacity="0.3"
        />
      </svg>
    ),
  },
];

export function PortalPage() {
  const { theme } = useThemeStore();
  const { apps: accessibleApps } = useAppsStore();
  const visibleApps = apps.filter((app) =>
    accessibleApps.some((a) => app.href.startsWith(a.path)),
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
          gap: "48px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>
          iRMS 포털
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${visibleApps.length}, 1fr)`,
            gap: "24px",
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
