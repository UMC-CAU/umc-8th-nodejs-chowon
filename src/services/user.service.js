import {
    addUser,
    getUserById,
    getUserInfoById,
    getUserPreferencesByUserId,
    getUserStatusById,
    getUserTermsById,
    setUserInfo,
    setUserPreference,
    setUserStatus,
    setUserTerms,
} from "../repositories/user.repository.js";
import {
    responseFromUser,
    responseFromUserFoods,
    responseFromUserInfo,
    responseFromUserStatus,
    responseFromUserTerms,
} from "./user.dto.js";

export const userSignUp = async (data) => {
    const userId = await addUser({
        email: data.email,
        socialType: data.socialType,
        socialId: data.socialId,
    });
    if (userId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }
    const user = await getUserById(userId);
    return responseFromUser(user);
};

export const updateUserInfo = async (userId, data) => {
    if (!userId) {
        throw new Error("유저 ID가 필요합니다.");
    }

    await setUserInfo({
        userId,
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
    });

    const info = await getUserInfoById(userId);
    return responseFromUserInfo(info);
};

export const updateUserTerms = async (userId, data) => {
    await setUserTerms({
        userId,
        serviceCheck: data.serviceCheck,
        privacyCheck: data.privacyCheck,
        locationCheck: data.locationCheck,
        marketingCheck: data.marketingCheck,
        ageCheck: data.ageCheck,
    });

    const terms = await getUserTermsById(userId);
    return responseFromUserTerms(terms);
};

export const updateUserFoods = async (userId, data) => {
    for (const food_id of data.preferences) {
        await setUserPreference({ userId, foodId: food_id });
    }
    const preferences = await getUserPreferencesByUserId(userId);
    return responseFromUserFoods(userId, preferences);
};

export const updateUserStatus = async (userId, data) => {
    await setUserStatus({
        userId,
        status: data.status,
    });

    const status = await getUserStatusById(userId);
    return responseFromUserStatus(status);
};
