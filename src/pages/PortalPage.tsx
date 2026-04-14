import type { CSSProperties, ReactNode } from 'react';
import { Layout } from '@common/components/Layout';
import { useAuthStore } from '@common/stores/authStore';
import { Role } from '@common/types/constants';
import { theme } from '@common/styles/theme';

interface PortalApp {
  title: string;
  description: string;
  href: string;
  requiredRole?: number;
  icon: ReactNode;
}

const apps: PortalApp[] = [
  {
    title: '인증',
    description: '내 정보 · 비밀번호 변경',
    href: '/auth/',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={theme.colors.primary} fillOpacity="0.1" />
        <path
          d="M24 14a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 10c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4Z"
          fill={theme.colors.primary}
        />
        <rect x="14" y="32" width="20" height="2" rx="1" fill={theme.colors.primary} fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    title: '관리자',
    description: '회원 조회 · 승인 · 관리',
    href: '/admin/',
    requiredRole: Role.ADMIN,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill={theme.colors.primary} fillOpacity="0.1" />
        <path
          d="M17 16a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm14 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM17 24c-3.31 0-6 1.34-6 3v2h12v-2c0-1.66-2.69-3-6-3Zm14 0c-3.31 0-6 1.34-6 3v2h12v-2c0-1.66-2.69-3-6-3Z"
          fill={theme.colors.primary}
        />
        <rect x="14" y="32" width="20" height="2" rx="1" fill={theme.colors.primary} fillOpacity="0.3" />
      </svg>
    ),
  },
];

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '36px 28px',
  borderRadius: theme.radius.lg,
  backgroundColor: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: theme.shadow.card,
  textDecoration: 'none',
  color: theme.colors.text,
  cursor: 'pointer',
  transition: 'box-shadow 0.2s, transform 0.2s',
  width: '180px',
};

export function PortalPage() {
  const { user } = useAuthStore();
  const visibleApps = apps.filter((app) => !app.requiredRole || user?.role === app.requiredRole);

  return (
    <Layout title="Portal" version={__APP_VERSION__}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 200px)',
          gap: '48px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>iRMS 포털</h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${visibleApps.length}, 1fr)`,
            gap: '24px',
          }}
        >
          {visibleApps.map((app) => (
            <a key={app.href} href={app.href} style={cardStyle}>
              {app.icon}
              <span style={{ fontSize: '16px', fontWeight: 600 }}>{app.title}</span>
              <span style={{ fontSize: '12px', color: theme.colors.textMuted, textAlign: 'center' }}>
                {app.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
