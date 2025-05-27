import {
    createUser as createUserRepository,
    findUserById,
    findUserInfoById,
    findUserPreferencesByUserId,
    findUserStatusById,
    findUserTermsById,
    updateUserInfo as updateUserInfoRepository,
    updateUserPreference,
    updateUserStatus,
    updateUserTerms as updateUserTermsRepository,
} from "../repositories/auth.repository.js";
import {
    UserResponseDto,
    UserFoodsResponseDto,
    UserInfoResponseDto,
    UserStatusResponseDto,
    UserTermsResponseDto,
} from "../dtos/response/auth.dto.js";
import { DuplicateUserEmailError } from "../utils/error.util.js";

export const createUser = async (data) => {
    // 필수 필드 유효성 검사
    if (!data.email) {
        throw new Error("이메일은 필수입니다.");
    }
    
    if (!data.socialType) {
        throw new Error("소셜 타입은 필수입니다.");
    }
    
    const userId = await createUserRepository({
        email: data.email,
        socialType: data.socialType,
        socialId: data.socialId || "",
    });
    
    if (userId === null) {
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
    }
    
    const user = await findUserById(userId);
    return UserResponseDto(user);
};

export const updateUserInfo = async (userId, data) => {
    if (!userId) {
        throw new Error("유저 ID가 필요합니다.");
    }

    await updateUserInfoRepository({
        userId,
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
    });

    const info = await findUserInfoById(userId);
    return UserInfoResponseDto(info);
};

export const updateUserTerms = async (userId, data) => {
    await updateUserTermsRepository({
        userId,
        serviceCheck: data.serviceCheck,
        privacyCheck: data.privacyCheck,
        locationCheck: data.locationCheck,
        marketingCheck: data.marketingCheck,
        ageCheck: data.ageCheck,
    });

    const terms = await findUserTermsById(userId);
    return UserTermsResponseDto(terms);
};

export const updateUserFoods = async (userId, data) => {
    for (const foodId of data.preferences) {
        await updateUserPreference({ userId, foodId });
    }
    const preferences = await findUserPreferencesByUserId(userId);
    return UserFoodsResponseDto(userId, preferences);
};

export const activateUser = async (userId, data) => {
    await updateUserStatus({
        userId,
        status: data.status,
    });

    const status = await findUserStatusById(userId);
    return UserStatusResponseDto(status);
};