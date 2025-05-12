export const UserResponseDto = (user) => {
    return {
        id: String(user.id),
        email: user.email,
        socialType: user.social_type,
        socialId: user.social_id,
    };
};

export const UserInfoResponseDto = (user) => {
    return {
        id: String(user.id),
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detail_address,
    };
};

export const UserTermsResponseDto = (user) => {
    return {
        id: String(user.id),
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
        id: String(userId),
        preferCategory: preferFoods,
    };
};

export const UserStatusResponseDto = (user) => {
    return {
        id: String(user.id),
        status: user.status,
    };
};

export const UserMissionResponseDto = (user) => {
    return {
        id: String(user.id),
        userId: String(user.user_id),
        missionId: String(user.mission_id),
        status: user.status,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
    };
};