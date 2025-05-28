import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// 응답 타입 정의
interface BaseResponse {
  status: "SUCCESS" | "FAIL";
  statusCode: number;
  message: string;
}

interface SuccessResponse<T = any> extends BaseResponse {
  status: "SUCCESS";
  data: T;
}

interface ErrorResponse extends BaseResponse {
  status: "FAIL";
  error?: any;
  data?: any;
}

// Express Response 타입 확장
declare global {
  namespace Express {
    interface Response {
      sendSuccess<T = any>(
        statusCode?: number,
        message?: string,
        data?: T
      ): Response;
      
      sendError(
        statusCode?: number,
        message?: string,
        error?: any,
        data?: any
      ): Response;
    }
  }
}

// API 응답 클래스
class ApiResponse {
  /**
   * 성공 응답 생성
   * @param statusCode HTTP 상태 코드 (기본값: 200)
   * @param message 응답 메시지
   * @param data 응답 데이터
   * @returns 성공 응답 객체
   */
  static success<T = any>(
    statusCode: number = StatusCodes.OK,
    message: string = "요청이 성공적으로 처리되었습니다.",
    data: T = null as T
  ): SuccessResponse<T> {
    return {
      status: "SUCCESS",
      statusCode,
      message,
      data,
    };
  }

  /**
   * 에러 응답 생성
   * @param statusCode HTTP 상태 코드 (기본값: 500)
   * @param message 에러 메시지
   * @param error 에러 상세 정보
   * @param data 추가 데이터
   * @returns 에러 응답 객체
   */
  static error(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = "요청 처리 중 오류가 발생했습니다.",
    error: any = null,
    data: any = null
  ): ErrorResponse {
    return {
      status: "FAIL",
      statusCode,
      message,
      error,
      data,
    };
  }
}

/**
 * 응답 헬퍼 메서드를 Express Response에 추가하는 미들웨어
 */
export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // 성공 응답을 위한 메서드
  res.sendSuccess = function <T = any>(
    statusCode: number = StatusCodes.OK,
    message: string = "요청이 성공적으로 처리되었습니다.",
    data: T = null as T
  ): Response {
    const response = ApiResponse.success(statusCode, message, data);
    return this.status(statusCode).json(response);
  };

  // 에러 응답을 위한 메서드
  res.sendError = function (
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = "요청 처리 중 오류가 발생했습니다.",
    error: any = null,
    data: any = null
  ): Response {
    const response = ApiResponse.error(statusCode, message, error, data);
    return this.status(statusCode).json(response);
  };

  next();
};

/**
 * 글로벌 에러 핸들러 미들웨어
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  // 이미 응답이 전송된 경우 처리하지 않음
  if (res.headersSent) {
    return next(err);
  }

  // 기본 에러 메시지와 상태 코드
  const statusCode: number = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message: string = err.message || "서버 내부 오류가 발생했습니다.";

  // 개발 환경에서는 스택 트레이스를 포함
  const error = process.env.NODE_ENV === "development" 
    ? { stack: err.stack } 
    : null;

  res.status(statusCode).json(ApiResponse.error(statusCode, message, error));
};

// 타입 안전한 응답 헬퍼 함수들
export const createSuccessResponse = <T>(
  data: T,
  message?: string,
  statusCode?: number
): SuccessResponse<T> => {
  return ApiResponse.success(statusCode, message, data);
};

export const createErrorResponse = (
  message: string,
  statusCode?: number,
  error?: any,
  data?: any
): ErrorResponse => {
  return ApiResponse.error(statusCode, message, error, data);
};

// 기본 내보내기
export default {
  ApiResponse,
  responseHandler,
  errorHandler,
  createSuccessResponse,
  createErrorResponse,
};

// 타입 내보내기
export type { BaseResponse, ErrorResponse, SuccessResponse };

