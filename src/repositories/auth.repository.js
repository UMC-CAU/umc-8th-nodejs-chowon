import { prisma } from "../db.config.js";
import { InvalidParameterError } from "../utils/error.util.js";

// 기본 비활성 유저 생성 (email, password)
export const createUser = async (data) => {
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    // 이미 존재하는 유저일 경우 null 리턴
    if (user) {
        return null;
    }
    
    try {
        const created = await prisma.user.create({ data: data });
        return created.id;
    } catch (error) {
        // Prisma unique constraint violation 에러 처리
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return null; // 중복 이메일로 처리
        }
        throw error; // 다른 에러는 그대로 throw
    }
};

// 유저 조회
export const findUserById = async (userId) => {
    const user = await prisma.user.findFirst({ where: { id: parseInt(userId) } });
    // 유저가 존재하지 않을 경우 null 리턴
    if (!user) {
        return null;
    }
    return user;
};

// 유저 정보 수정
export const updateUserInfo = async (data) => {
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(data.userId) },
            data: {
                name: data.name,
                gender: data.gender,
                birth: data.birth,
                address: data.address,
                detailAddress: data.detailAddress,
            },
        });
        return user;
    } catch (err) {
        throw new InvalidParameterError(`유저 정보 업데이트에 실패했습니다. : ${err.message}`);
    }
};

// 유저 정보 조회
export const findUserInfoById = async (userId) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: parseInt(userId) },
            select: {
                id: true,
                name: true,
                gender: true,
                birth: true,
                address: true,
                detailAddress: true,
                socialType: true,
                socialId: true,
            },
        });
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        throw new InvalidParameterError(`유저 정보 조회에 실패했습니다. : ${err.message}`);
    }
};

// 유저 약관 동의 수정
export const updateUserTerms = async (data) => {
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(data.userId) },
            data: {
                serviceCheck: data.serviceCheck,
                privacyCheck: data.privacyCheck,
                locationCheck: data.locationCheck,
                marketingCheck: data.marketingCheck,
                ageCheck: data.ageCheck,
            },
        });
        return user;
    } catch (err) {
        throw new InvalidParameterError(`유저 약관 동의 업데이트에 실패했습니다. : ${err.message}`);
    }
};

// 유저 약관 동의 조회
export const findUserTermsById = async (userId) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: parseInt(userId) },
            select: {
                id: true,
                serviceCheck: true,
                privacyCheck: true,
                locationCheck: true,
                marketingCheck: true,
                ageCheck: true,
            },
        });
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        throw new InvalidParameterError(`유저 약관 동의 조회에 실패했습니다. : ${err.message}`);
    }
};

// 유저 선호 음식 수정
export const updateUserPreference = async (data) => {
    try {
        await prisma.userFoodCategory.create({
            data: {
                userId: data.userId,
                foodCategoryId: data.foodId,
            },
        });
    } catch (err) {
        throw new InvalidParameterError(`유저 선호 음식 업데이트에 실패했습니다. : ${err.message}`);
    }
};

// 유저 선호 음식 조회
export const findUserPreferencesByUserId = async (userId) => {
    try {
        const preferences = await prisma.userFoodCategory.findMany({
            where: { userId: userId },
            select: {
                foodCategory: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: { foodCategoryId: "asc" },
        });
        return preferences;
    } catch (err) {
        throw new InvalidParameterError(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err.message})`
        );
    }
};

// 유저 상태 수정
export const updateUserStatus = async (data) => {
    const user = await prisma.user.update({
        where: { id: data.userId },
        data: { status: data.status },
    });
    if (!user) {
        throw new InvalidParameterError("유저 상태 업데이트에 실패했습니다.");
    }
    return user;
};

// 유저 상태 조회
export const findUserStatusById = async (userId) => {
    const user = await prisma.user.findFirst({
        where: { id: userId },
        select: { id: true, status: true },
    });
    if (!user) {
        return null;
    }
    return user;
};