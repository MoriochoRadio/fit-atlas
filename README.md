# Fit Atlas

**운동 백과사전 · 개인화 루틴 · 기록 분석 · 회복 가이드를 한 화면에서 다루는 로컬 우선 웹앱.**
서버도 계정도 없이, 브라우저만으로 동작합니다.

### 👉 **[바로 사용하기 — moriochoradio.github.io/fit-atlas](https://moriochoradio.github.io/fit-atlas/)**

---

## 무엇을 하는 앱인가

| 영역 | 내용 |
|---|---|
| **운동 백과사전** | 9개 카테고리 **96개 종목**. 종목마다 자세 단서, 타깃 부위, 기대 효과, 주의 사항, 공신력 있는 출처 링크 |
| **바디 맵** | 신체 부위를 눌러 해당 부위 운동과 회복 가이드로 이동 |
| **개인화** | 연령·체중·성별·목표·경험 수준을 반영한 보수적 시작안과 목표별 4주 루틴 |
| **세션 설계** | 시간·환경(집/헬스장)·목표를 고르면 그날 할 세션을 구성 |
| **일일 체크인** | 컨디션(에너지·수면·스트레스·통증)을 기록하면 그날 강도 제안에 반영 |
| **주간 계획** | 목표별 세션 체크, 계획 카드에서 바로 기록 시작, 기록 저장 시 자동 완료 처리 |
| **기록·분석** | 세트·횟수·중량·시간·강도 입력, 날짜별 캘린더, 볼륨·빈도 추이, 개인 최고 기록(PR) |
| **회복·웰니스** | 통증 부위별 스트레칭·폼롤러·마사지건 프로토콜, 식단·수면·사우나 활용 가이드 |

카테고리 구성: 헬스기구 22 · 프리웨이트 15 · 맨몸운동 14 · 모빌리티 11 · 유산소 10 · 균형·협응 7 · 파워·민첩성 6 · 러닝 6 · 요가·필라테스 5

## 데이터와 프라이버시

운동 기록·프로필·컨디션 체크인·주간 계획은 **브라우저의 `localStorage`에만** 저장됩니다. 서버로 전송되는 데이터가 없고, 계정도 데이터베이스도 필요하지 않습니다.

기기를 옮길 때는 상단 **백업** 버튼으로 JSON 파일을 내려받아 다른 브라우저에서 복원하면 됩니다. 백업 포맷은 v3까지 하위 호환됩니다.

> **의학적 고지** — 이 앱은 일반적인 운동·웰니스 정보를 제공할 뿐, 의료 진단이나 치료를 대체하지 않습니다. 통증·질환·임신 등 개별 상황에서는 전문가와 상담하세요. 콘텐츠의 근거 기준은 [`docs/research_sources.md`](./docs/research_sources.md)에 정리했습니다.

## 기술 구성

정적 HTML·CSS·JavaScript만 배포하며 API 서버, 데이터베이스, 인증 런타임을 포함하지 않습니다. 런타임 의존성은 5개뿐입니다.

| 의존성 | 사용처 |
|---|---|
| `react`, `react-dom` | 단일 페이지 렌더링과 로컬 상태 |
| `lucide-react` | 탐색·운동·안전 아이콘 |
| `sonner` | 저장·백업 복원 결과 알림 |
| `tw-animate-css` | 빌드 시 스타일 처리 (`tailwindcss`는 devDependency) |

풀스택 스캐폴드에서 **tRPC, React Query, Express, MySQL, Drizzle, AWS SDK, OAuth, Recharts, Framer Motion, Radix UI, class-variance-authority, clsx, tailwind-merge**를 제거했습니다. 정적 배포와 로컬 저장 방식에 필요하지 않습니다.

### 번들 크기

`pnpm build` 실측값입니다. 벤더 코드를 React 런타임·아이콘 청크로 분리해 재방문 시 캐시가 유지되도록 했습니다.

| 청크 | 크기 | gzip |
|---|---:|---:|
| React 런타임 | 227.65 kB | 69.93 kB |
| 앱 코드 | 165.50 kB | 45.71 kB |
| CSS | 41.25 kB | 10.09 kB |
| 아이콘 | 8.50 kB | 2.20 kB |
| **합계** | **약 443 kB** | **약 128 kB** |

## 로컬 실행

```bash
pnpm install
pnpm dev
```

검증 명령:

```bash
pnpm check   # 타입 검사
pnpm test    # Vitest 33개
pnpm build   # 프로덕션 정적 번들
```

## 배포

`main`에 푸시하면 [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)이 타입 검사 → 테스트 → 빌드를 거쳐 GitHub Pages로 배포합니다. 운영비는 들지 않습니다.

Pages 경로(`/fit-atlas/`)는 `vite.config.ts`의 `GITHUB_PAGES_BASE`가 결정합니다. 저장소 이름을 바꾸면 이 값도 함께 갱신하세요.

## 문서

| 문서 | 내용 |
|---|---|
| [`docs/research_sources.md`](./docs/research_sources.md) | 콘텐츠 근거 및 안전 원칙 (WHO·CDC 권고 기준) |
| [`docs/content_expansion_sources.md`](./docs/content_expansion_sources.md) | 콘텐츠 확장에 참조한 출처 목록 |
| [`docs/content_model.md`](./docs/content_model.md) | 운동·회복 항목의 데이터 표준 |
| [`docs/qa_requirements.md`](./docs/qa_requirements.md) | 최초 요구사항 대비 충족 기준 |
| [`docs/qa_report.md`](./docs/qa_report.md) | QA 검증 결과 |
| [`docs/todo.md`](./docs/todo.md) | 작업 이력과 남은 과제 |

## 라이선스

[MIT](./LICENSE)
