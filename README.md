# iRMS Portal App

로그인 후 각 앱(인증, 관리자)으로 진입하는 허브 페이지.

## 기술 스택

- React 18 + TypeScript
- Vite (빌드 도구)
- React Router DOM (라우팅)
- Zustand (상태 관리 — common에서 제공)
- Axios (HTTP 클라이언트 — common에서 제공)

## 라우트

| 경로      | 페이지                | 설명                |
| --------- | --------------------- | ------------------- |
| `/login`  | `LoginPage` (common)  | 로그인              |
| `/signup` | `SignupPage` (common) | 회원가입            |
| `/`       | `PortalPage`          | 앱 목록 허브 페이지 |

## 앱 목록

| 앱     | 경로      | 설명                    |
| ------ | --------- | ----------------------- |
| 인증   | `/auth/`  | 내 정보 · 비밀번호 변경 |
| 관리자 | `/admin/` | 회원 조회 · 승인 · 관리 |

## 사전 준비

```bash
# submodule 초기화
git submodule update --init --recursive
```

## 실행

```bash
docker compose up -d    # http://localhost:3003/
docker compose down
```
