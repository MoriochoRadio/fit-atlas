# Fit Atlas

개인·소수 사용자용 **로컬 우선 운동 및 웰니스 가이드**입니다. 운동 카탈로그, 바디 맵, 개인화 시작안, 기록·분석, 회복·웰니스 콘텐츠는 모두 브라우저에서 작동합니다.

## 데이터와 프라이버시

운동 기록·프로필·안전 모드는 브라우저의 `localStorage`에만 저장됩니다. 서버 계정이나 데이터베이스가 필요하지 않습니다. 상단의 **백업** 버튼으로 JSON 파일을 내려받아 다른 브라우저로 옮길 수 있습니다.

## GitHub Pages 배포

1. GitHub 저장소의 **Settings → Pages**에서 Source를 **GitHub Actions**로 선택합니다.
2. `main` 브랜치에 푸시하면 `.github/workflows/deploy-pages.yml`이 정적 번들을 배포합니다.
3. 저장소 이름을 변경하면 `vite.config.ts`의 `GITHUB_PAGES_BASE` 값도 같은 이름으로 갱신합니다.

```bash
pnpm install
pnpm dev
pnpm build
```

## 경량화 원칙

배포 결과물은 정적 HTML·CSS·JavaScript만 포함하며, API 서버·DB·인증 런타임은 포함하지 않습니다. 벤더 코드는 React 런타임, 아이콘, 피드백 UI 청크로 분리해 초기 다운로드를 작게 유지합니다.

| 항목 | 이전 | 경량화 후 |
|---|---:|---:|
| 단일 JavaScript 번들 | 596.60 kB / gzip 171.98 kB | 없음 — 분할 배포 |
| 앱 코드 청크 | — | 89.04 kB / gzip 18.38 kB |
| React 런타임 청크 | — | 424.86 kB / gzip 126.09 kB |
| 아이콘 청크 | — | 8.50 kB / gzip 2.20 kB |
| CSS | 29.90 kB / gzip 8.03 kB | 28.71 kB / gzip 7.66 kB |

측정값은 `pnpm build`의 Vite 프로덕션 번들 결과입니다. 서버 코드는 정적 빌드에서 제외되며, 사용자 데이터는 브라우저에만 저장됩니다.

### 남은 클라이언트 의존성

| 의존성 | 실제 사용처 |
|---|---|
| `react`, `react-dom` | 단일 페이지 렌더링과 로컬 상태 |
| `lucide-react` | 탐색·운동·안전 아이콘 |
| `sonner` | 로컬 저장·백업 복원 결과 알림 |
| `tailwindcss`, `tw-animate-css` | 빌드 시 스타일 처리 |

제거한 항목에는 **tRPC, React Query, Express, MySQL, Drizzle, AWS SDK, OAuth, Recharts, Framer Motion, Radix Tooltip, class-variance-authority, clsx, tailwind-merge**가 포함됩니다. 이들은 정적 배포·개인용 로컬 저장 사용 방식에 필요하지 않습니다.
