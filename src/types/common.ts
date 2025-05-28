// 프로젝트 전반에서 사용할 공통 타입 정의

// Express 요청/응답 타입 확장
export interface CustomRequest extends Request {
  user?: any; // 인증된 사용자 정보 (나중에 구체적인 User 타입으로 대체 예정)
}

// API 응답 공통 형태
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 에러 타입
export interface CustomError extends Error {
  status?: number;
  code?: string;
}

// 환경 변수 타입 (나중에 구체화 예정)
export interface EnvConfig {
  NODE_ENV: string;
  PORT: string;
  DATABASE_URL: string;
  SESSION_SECRET: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
}

// 점진적 마이그레이션을 위한 유틸리티 타입
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> 
  & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys];
