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