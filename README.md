# umc-8th-nodejs-chowon
UMC CAU 8th Node.js Study

## 🚀 TypeScript 점진적 마이그레이션

이 프로젝트는 JavaScript에서 TypeScript로의 점진적 마이그레이션을 진행하고 있습니다.

### 📋 마이그레이션 현황

현재 마이그레이션 진행 상황을 확인하려면:
```bash
npm run migration:check
```

### 🛠️ 개발 스크립트

#### JavaScript 개발 (기존)
```bash
npm run dev          # JavaScript 개발 서버 실행
npm start           # JavaScript 프로덕션 실행
```

#### TypeScript 개발 (새로운)
```bash
npm run dev:ts      # TypeScript 개발 서버 실행
npm run start:ts    # TypeScript 실행
npm run build       # TypeScript 빌드
npm run type-check  # 타입 체크만 실행
```

### 📁 프로젝트 구조

```
src/
├── types/           # 공통 타입 정의
├── utils/           # 유틸리티 함수들 (우선 마이그레이션 대상)
├── dtos/            # 데이터 전송 객체
├── config/          # 설정 파일들
├── repositories/    # 데이터 접근 계층
├── services/        # 비즈니스 로직 계층
├── controllers/     # 컨트롤러 계층
└── routes/          # 라우터 정의
```

### 📖 마이그레이션 가이드

1. **1단계**: 유틸리티 파일들부터 시작 (`src/utils/`)
2. **2단계**: DTO 파일들 마이그레이션 (`src/dtos/`)
3. **3단계**: 설정 파일들 (`src/config/`)
4. **4단계**: 레포지토리 계층 (`src/repositories/`)
5. **5단계**: 서비스 계층 (`src/services/`)
6. **6단계**: 컨트롤러 계층 (`src/controllers/`)
7. **7단계**: 라우터 파일들 (`src/routes/`)
8. **8단계**: 메인 진입점 (`src/index.js`)

### 🔧 TypeScript 설정

- **점진적 마이그레이션**: JS와 TS 파일 동시 지원
- **엄격한 타입 체킹**: `strict: true`
- **ES Modules**: ES2022 문법 지원
- **경로 별칭**: `@/`, `@config/`, `@utils/` 등 사용 가능

### 💡 마이그레이션 팁

1. 파일 확장자를 `.js`에서 `.ts`로 변경
2. 기본 타입 어노테이션 추가
3. 인터페이스와 타입 정의 활용
4. `npm run type-check`로 타입 오류 확인
5. 점진적으로 `any` 타입 제거

### 📚 도움말

마이그레이션 도구 사용법:
```bash
npm run migration:help
```
