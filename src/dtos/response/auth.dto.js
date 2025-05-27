export const UserResponseDto = (user) => {
    return {
        id: user.id,
        email: user.email,
        socialType: user.socialType,
        socialId: user.socialId,
    };
};

export const UserInfoResponseDto = (user) => {
    return {
        id: user.id,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        address: user.address,
        detailAddress: user.detailAddress,
    };
};

export const UserTermsResponseDto = (user) => {
    return {
        id: user.id,
        serviceCheck: user.serviceCheck,
        privacyCheck: user.privacyCheck,
        locationCheck: user.locationCheck,
        marketingCheck: user.marketingCheck,
        ageCheck: user.ageCheck,
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