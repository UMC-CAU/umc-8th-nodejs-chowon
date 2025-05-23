export const UserResponseDto = (user) => {
    return {
        id: user.id,
        email: user.email,
        socialType: user.social_type,
        socialId: user.social_id,
    };
};

export const UserInfoResponseDto = (user) => {
    return {
        id: user.id,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detail_address,
    };
};

export const UserTermsResponseDto = (user) => {
    return {
        id: user.id,
        serviceCheck: user.service_check,
        privacyCheck: user.privacy_check,
        locationCheck: user.location_check,
        marketingCheck: user.marketing_check,
        ageCheck: user.age_check,
    };
};

export const UserFoodsResponseDto = (userId, preferences) => {
    const preferFoods = preferences.map((preference) => preference.foodCategory.name);
    return {
        id: userId,
        preferCategory: preferFoods,
    };
};

export const UserStatusResponseDto = (user) => {
    return {
        id: user.id,
        status: user.status,
    };
};

export const UserMissionResponseDto = (user) => {
    return {
        id: user.id,
        userId: user.user_id,
        missionId: user.mission_id,
        status: user.status,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    };
};

export const signUpResponseDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        address: user.address,
        point: user.point,
    };
};

export const signInResponseDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        address: user.address,
        point: user.point,
    };
};

export const getUserResponseDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        address: user.address,
        point: user.point,
    };
};

export const getMyInfoResponseDTO = (userId) => {
    return {
        id: userId,
    };
};

export const completeMissionResponseDTO = (user) => {
    return {
        id: user.id,
        point: user.point,
    };
};

export const getMyMissionsResponseDTO = (user) => {
    return {
        id: user.id,
        userId: user.user_id,
        missionId: user.mission_id,
        status: user.status,
        createdAt: user.created_at,
    };
};