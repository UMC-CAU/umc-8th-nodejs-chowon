// 기본 커스텀 에러 인터페이스
interface CustomErrorData {
  [key: string]: any;
}

// 기본 커스텀 에러 클래스
abstract class BaseCustomError extends Error {
  abstract readonly errorCode: string;
  public readonly reason: string;
  public readonly data?: CustomErrorData;

  constructor(reason: string, data?: CustomErrorData) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.name = this.constructor.name;
    
    // 스택 트레이스 정리
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// 사용자 관련 에러
export class DuplicateUserEmailError extends BaseCustomError {
  readonly errorCode = "U001";

  constructor(reason: string, data?: CustomErrorData) {
    super(reason, data);
  }
}

// 미션 관련 에러들
export class MissionNotFoundError extends BaseCustomError {
  readonly errorCode = "M001";

  constructor(reason: string, data?: CustomErrorData) {
    super(reason, data);
  }
}

export class AlreadyInProgressMissionError extends BaseCustomError {
  readonly errorCode = "M002";

  constructor(reason: string, data?: CustomErrorData) {
    super(reason, data);
  }
}

export class MissionQueryError extends BaseCustomError {
  readonly errorCode = "M003";

  constructor(reason: string, data?: CustomErrorData) {
    super(reason, data);
  }
}

export class MissionUpdateError extends BaseCustomError {
  readonly errorCode = "M004";

  constructor(reason: string, data?: CustomErrorData) {
    super(reason, data);
  }
}

// 리뷰 관련 에러들
export class ReviewCreationError extends BaseCustomError {
  readonly errorCode = "R001";

  constructor(reason: string, data?: CustomErrorData) {
    super(reason, data);
  }
}

export class ReviewImageCreationError extends BaseCustomError {
  readonly errorCode = "R002";

  constructor(reason: string, data?: CustomErrorData) {
    super(reason, data);
  }
}

// 일반 에러
export class InvalidParameterError extends BaseCustomError {
  readonly errorCode = "G001"; // General error

  constructor(reason: string, data?: CustomErrorData) {
    super(reason, data);
  }
}

// 에러 타입 유니온 (타입 가드에서 사용)
export type AppError = 
  | DuplicateUserEmailError
  | MissionNotFoundError
  | AlreadyInProgressMissionError
  | MissionQueryError
  | MissionUpdateError
  | ReviewCreationError
  | ReviewImageCreationError
  | InvalidParameterError;

// 에러 코드 상수
export const ERROR_CODES = {
  // User errors
  DUPLICATE_USER_EMAIL: "U001",
  
  // Mission errors
  MISSION_NOT_FOUND: "M001",
  ALREADY_IN_PROGRESS_MISSION: "M002",
  MISSION_QUERY_ERROR: "M003",
  MISSION_UPDATE_ERROR: "M004",
  
  // Review errors
  REVIEW_CREATION_ERROR: "R001",
  REVIEW_IMAGE_CREATION_ERROR: "R002",
  
  // General errors
  INVALID_PARAMETER: "G001"
} as const;

// 에러 코드 타입
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// 에러 팩토리 함수 (선택적 사용)
export const createError = {
  duplicateUserEmail: (reason: string, data?: CustomErrorData) => 
    new DuplicateUserEmailError(reason, data),
  
  missionNotFound: (reason: string, data?: CustomErrorData) => 
    new MissionNotFoundError(reason, data),
  
  alreadyInProgressMission: (reason: string, data?: CustomErrorData) => 
    new AlreadyInProgressMissionError(reason, data),
  
  missionQuery: (reason: string, data?: CustomErrorData) => 
    new MissionQueryError(reason, data),
  
  missionUpdate: (reason: string, data?: CustomErrorData) => 
    new MissionUpdateError(reason, data),
  
  reviewCreation: (reason: string, data?: CustomErrorData) => 
    new ReviewCreationError(reason, data),
  
  reviewImageCreation: (reason: string, data?: CustomErrorData) => 
    new ReviewImageCreationError(reason, data),
  
  invalidParameter: (reason: string, data?: CustomErrorData) => 
    new InvalidParameterError(reason, data)
};

// 에러 타입 가드
export const isAppError = (error: any): error is AppError => {
  return error instanceof BaseCustomError;
};

export const isErrorCode = (code: string): code is ErrorCode => {
  return Object.values(ERROR_CODES).includes(code as ErrorCode);
};
