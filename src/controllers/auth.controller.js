import { StatusCodes } from "http-status-codes";
import {
    createUser,
    updateUserInfo,
    updateUserTerms,
    updateUserFoods,
    activateUser,
} from "../services/auth.service.js";
import {
    CreateUserDto,
    UpdateUserInfoDto,
    UpdateUserTermsDto,
    UpdateUserFoodsDto,
    UpdateUserStatusDto,
} from "../dtos/request/auth.dto.js";

// 비활성 유저 생성
const signupUser = async (req, res) => {
    console.log("회원가입을 위한 요청이 들어왔습니다.");
    console.log("body:", req.body);

    try {
        const userDto = CreateUserDto(req.body);
        const user = await createUser(userDto);
        console.log(user, typeof user);
        res.sendSuccess(
            StatusCodes.CREATED,
            "회원가입이 성공적으로 완료되었습니다.",
            user
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "회원가입에 실패했습니다.",
            error,
            req.body
        );
    }
};

// 회원 정보 업데이트
const updateSignupInfo = async (req, res) => {
    console.log("회원 정보 업데이트 중...");

    try {
        const userId = req.body.id;
        const userInfoDto = UpdateUserInfoDto(req.body);
        const result = await updateUserInfo(userId, userInfoDto);
        res.sendSuccess(
            StatusCodes.OK,
            "회원 정보가 성공적으로 업데이트되었습니다.",
            result
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "회원 정보 업데이트에 실패했습니다.",
            error,
            req.body
        );
    }
};

// 약관 동의 업데이트
const updateSignupTerms = async (req, res) => {
    console.log("약관 동의 업데이트 중...");

    try {
        const userId = req.body.id;
        const userTermsDto = UpdateUserTermsDto(req.body);
        const result = await updateUserTerms(userId, userTermsDto);
        res.sendSuccess(
            StatusCodes.OK,
            "약관 동의가 성공적으로 업데이트되었습니다.",
            result
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "약관 동의 업데이트에 실패했습니다.",
            error,
            req.body
        );
    }
};

// 선호 음식 업데이트
const updateSignupFoods = async (req, res) => {
    console.log("선호 음식 업데이트 중...");

    try {
        const userId = req.body.id;
        const userFoodsDto = UpdateUserFoodsDto(req.body);
        const result = await updateUserFoods(userId, userFoodsDto);
        res.sendSuccess(
            StatusCodes.OK,
            "선호 음식이 성공적으로 업데이트되었습니다.",
            result
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "선호 음식 업데이트에 실패했습니다.",
            error,
            req.body
        );
    }
};

// 회원 상태 업데이트 (활성화 유저로 변경)
const updateSignupStatus = async (req, res) => {
    console.log("회원 상태 업데이트 중...");

    try {
        const userId = req.body.id;
        const userStatusDto = UpdateUserStatusDto(req.body);
        const result = await activateUser(userId, userStatusDto);
        res.sendSuccess(
            StatusCodes.OK,
            "회원 상태가 성공적으로 업데이트되었습니다.",
            result
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "회원 상태 업데이트에 실패했습니다.",
            error,
            req.body
        );
    }
};

export const authController = {
    signup: {
        create: signupUser,
        updateInfo: updateSignupInfo,
        updateTerms: updateSignupTerms,
        updateFoods: updateSignupFoods,
        updateStatus: updateSignupStatus,
    }
};