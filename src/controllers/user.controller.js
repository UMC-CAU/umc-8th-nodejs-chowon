import { StatusCodes } from "http-status-codes";
import {
    userSignUp,
    updateUserInfo,
    updateUserTerms,
    updateUserFoods,
    updateUserStatus,
} from "../services/user.service.js";
import {
    CreateUserDto,
    UpdateUserInfoDto,
    UpdateUserTermsDto,
    UpdateUserFoodsDto,
    UpdateUserStatusDto,
} from "../dtos/request/user.dto.js";

// 비활성 유저 생성
const signupUser = async (req, res) => {
    console.log("회원가입을 위한 요청이 들어왔습니다.");
    console.log("body:", req.body);

    try {
        const userDto = CreateUserDto(req.body);
        const user = await userSignUp(userDto);
        res.status(StatusCodes.OK).json({ result: user });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// 회원 정보 업데이트
const updateSignupInfo = async (req, res) => {
    console.log("회원 정보 업데이트 중...");

    try {
        const userId = req.body.id;
        const userInfoDto = UpdateUserInfoDto(req.body);
        const result = await updateUserInfo(userId, userInfoDto);
        res.status(StatusCodes.OK).json({ result });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// 약관 동의 업데이트
const updateSignupTerms = async (req, res) => {
    console.log("약관 동의 업데이트 중...");

    try {
        const userId = req.body.id;
        const userTermsDto = UpdateUserTermsDto(req.body);
        const result = await updateUserTerms(userId, userTermsDto);
        res.status(StatusCodes.OK).json({ result });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// 선호 음식 업데이트
const updateSignupFoods = async (req, res) => {
    console.log("선호 음식 업데이트 중...");

    try {
        const userId = req.body.id;
        const userFoodsDto = UpdateUserFoodsDto(req.body);
        const result = await updateUserFoods(userId, userFoodsDto);
        res.status(StatusCodes.OK).json({ result });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

// 회원 상태 업데이트 (활성화 유저로 변경)
const updateSignupStatus = async (req, res) => {
    console.log("회원 상태 업데이트 중...");

    try {
        const userId = req.body.id;
        const userStatusDto = UpdateUserStatusDto(req.body);
        const result = await updateUserStatus(userId, userStatusDto);
        res.status(StatusCodes.OK).json({ result });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

export const signupController = {
    create: signupUser,
    updateInfo: updateSignupInfo,
    updateTerms: updateSignupTerms,
    updateFoods: updateSignupFoods,
    updateStatus: updateSignupStatus,
};
