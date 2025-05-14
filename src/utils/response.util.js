import { StatusCodes } from "http-status-codes";
class ApiResponse {
    static success(
        statusCode = StatusCodes.OK,
        message = "요청이 성공적으로 처리되었습니다.",
        data = null
    ) {
        return {
            status: "SUCCESS",
            statusCode,
            message,
            data,
        };
    }
    static error(
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
        message = "요청 처리 중 오류가 발생했습니다.",
        error = null,
        data = null
    ) {
        return {
            status: "FAIL",
            statusCode,
            message,
            error,
            data,
        };
    }
}

export const responseHandler = (req, res, next) => {
    // 성공 응답을 위한 메서드
    res.sendSuccess = function (
        statusCode = StatusCodes.OK,
        message = "요청이 성공적으로 처리되었습니다.",
        data = null
    ) {
        const response = ApiResponse.success(statusCode, message, data);
        return this.status(statusCode).json(response);
    };

    // 에러 응답을 위한 메서드
    res.sendError = function (
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
        message = "요청 처리 중 오류가 발생했습니다.",
        error = null,
        data = null,
    ) {
        const response = ApiResponse.error(statusCode, message, error, data);
        return this.status(statusCode).json(response);
    };

    next();
};

// 글로벌 에러 핸들러 미들웨어
export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    // 기본 에러 메시지와 상태 코드
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || "서버 내부 오류가 발생했습니다.";

    // 개발 환경에서는 스택 트레이스를 포함
    const error =
        process.env.NODE_ENV === "development" ? { stack: err.stack } : null;

    res.status(statusCode).json(ApiResponse.error(message, statusCode, error));
};

export default {
    ApiResponse,
    responseHandler,
    errorHandler,
};
