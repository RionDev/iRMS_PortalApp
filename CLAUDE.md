# iRMS Portal App

포털 앱. 로그인 후 각 앱으로 진입하는 허브 페이지.

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

## 앱·기능 권한

- 포털은 앱 목록(`GET /api/app/me`)만 보여 주며 업무 API 를 직접 부르지 않는다. 업무 화면·버튼은 각 앱에 둔다
- 다른 앱처럼 업무 기능이 생기면 메뉴·버튼은 `useFeatures("/").can(<기능 키>)` 로 숨기고, 역할(`user.role === ...`)로 직접 분기하지 않는다
