# iRMS Portal App

포털 앱. 로그인 후 각 앱(인증, 관리자)으로 진입하는 허브 페이지.

## 책임

- 로그인/회원가입 (common에서 제공)
- 앱 목록 카드 표시 및 진입

## 공통 규칙

- 계층 분리: pages / components / services / types
- common 모듈은 `@common/` alias로 import
- 인증 상태는 `useAuth` 훅으로만 접근

## 고유 규칙

- 독립 실행 시 Vite dev server 포트 3003 사용
- 새 앱 추가 시 `PortalPage.tsx`의 `apps` 배열에 항목 추가
