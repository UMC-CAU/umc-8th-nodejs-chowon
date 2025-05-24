// 1. 기본 회원가입용 DTO (이메일, 비밀번호)
export const CreateUserDto = (body) => {
    return {
        email: body.email,
        socialType: body.social_type,
        socialId: body.social_id,
    };
};

// 2. 회원 정보 업데이트용 DTO
export const UpdateUserInfoDto = (body) => {
    // ISO 형식 문자열을 Date 객체로 변환
    const birth = new Date(body.birth);
    
    return {
        name: body.name,
        gender: body.gender || null, // true/false로 성별 표현
        birth: birth,
        address: body.address,
        detailAddress: body.detailAddress,
    };
};

// 3. 약관 동의 업데이트용 DTO
export const UpdateUserTermsDto = (body) => {
    return {
        serviceCheck: Boolean(body.serviceCheck), // 서비스 이용약관
        privacyCheck: Boolean(body.privacyCheck), // 개인정보 처리방침
        locationCheck: Boolean(body.locationCheck) || false, // 위치정보 이용약관
        marketingCheck: Boolean(body.marketingCheck) || false, // 마케팅 수신 동의
        ageCheck: Boolean(body.ageCheck), // 연령 확인
    };
};

// 4. 음식 선호도 업데이트용 DTO
export const UpdateUserFoodsDto = (body) => {
    return {
        preferences: Array.isArray(body.foodSelect) ? body.foodSelect : [],
    };
};

// 5. 계정 상태 업데이트용 DTO
export const UpdateUserStatusDto = (body) => {
    return {
        status: Boolean(body.status), // true: 활성화, false: 비활성화
    };
};

export const AddMissionDto = (body) => {
    return {
        missionId: body.missionId,
    };
}

export const completeMissionRequestDTO = (body) => {
    return {
        missionId: body.missionId,
    };
}