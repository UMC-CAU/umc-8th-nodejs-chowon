import { prisma } from "../db.config.js";

// 기본 비활성 유저 생성 (email, password)
export const createUser = async (data) => {
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    // 이미 존재하는 유저일 경우 null 리턴
    if (user) {
        return null;
    }
    const created = await prisma.user.create({ data: data });
    return created.id;
};

// 유저 조회
export const findUserById = async (userId) => {
    const user = await prisma.user.findFirst({ where: { id: userId } });
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
            where: { id: data.userId },
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
        throw new Error(`유저 정보 업데이트에 실패했습니다. : ${err}`);
    }
};

// 유저 정보 조회
export const findUserInfoById = async (userId) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: userId },
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
        throw new Error(`유저 정보 조회에 실패했습니다. : ${err}`);
    }
};

// 유저 약관 동의 수정
export const updateUserTerms = async (data) => {
    try {
        const user = await prisma.user.update({
            where: { id: data.userId },
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
        throw new Error(`유저 약관 동의 업데이트에 실패했습니다. : ${err}`);
    }
};

// 유저 약관 동의 조회
export const findUserTermsById = async (userId) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: userId },
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
        throw new Error(`유저 약관 동의 조회에 실패했습니다. : ${err}`);
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
        throw new Error(`유저 선호 음식 업데이트에 실패했습니다. : ${err}`);
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
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
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
        throw new Error("유저 상태 업데이트에 실패했습니다.");
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

// 유저 전체 조회
export const findAllUserById = async (userId) => {
    const user = await prisma.user.findFirst({
        where: { id: userId },
    });
    if (!user) {
        return null;
    }
    return user;
};

// 유저 선호 음식 조회
export const findUserPreferenceByUserId = async (userId) => {
    try {
        const preferences = await prisma.userFoodCategory.findMany({
            where: { userId: userId },
            include: {
                foodCategory: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: { foodCategoryId: "asc" },
            select: {
                id: true,
                userId: true,
                foodCategoryId: true,
                foodCategory: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!preferences) {
            throw new Error("유저 선호 음식 조회에 실패했습니다.");
        }
        return preferences;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
};

// 유저 미션 생성
export const createUserMission = async (data) => {
    try {
        const isExistMission = await prisma.mission.findUnique({
            where: { id: data.missionId },
        });
        // 미션이 존재하지 않을 경우 에러 발생
        if (!isExistMission) {
            throw new Error("존재하지 않는 미션입니다.");
        }

        // 이미 진행 중인 미션인지 확인
        const existingUserMission = await prisma.userMission.findFirst({
            where: {
                userId: data.userId,
                missionId: data.missionId,
            },
        });
        if (existingUserMission) {
            throw new Error("이미 진행 중인 미션입니다.");
        }

        const user_mission = await prisma.userMission.create({
            data: {
                userId: data.userId,
                missionId: data.missionId,
            },
        });
        if (!user_mission) {
            throw new Error("미션 생성에 실패했습니다.");
        }
        return user_mission.id;
    } catch (err) {
        throw new Error(`미션 생성 중 오류가 발생했습니다. (${err})`);
    }
};

// 유저 미션 조회
export const findUserMissionById = async (user_mission_id) => {
    try {
        const mission = await prisma.userMission.findFirstOrThrow({
            where: { id: user_mission_id },
            select: {
                id: true,
                userId: true,
                missionId: true,
                status: true,
                finishDate: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return mission;
    } catch (err) {
        throw new Error(`미션 조회에 실패했습니다. (${err})`);
    }
};

// 내가 작성한 리뷰 목록 조회 (Prisma 사용)
export const findUserReviewsById = async (userId) => {
    try {
        const reviews = await prisma.review.findMany({
            where: { userId: userId },
            include: {
                shop: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return reviews;
    } catch (err) {
        throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
    }
};

// 내가 진행 중인 미션 목록 조회 (Prisma 사용)
export const findUserMissionsById = async (userId) => {
    try {
        const missions = await prisma.userMission.findMany({
            where: { userId: userId },
            include: {
                mission: {
                    select: {
                        id: true,
                        point: true,
                        priceCriterion: true,
                        dueDate: true,
                    },
                },
            },
        });
        if (!missions) {
            throw new Error("미션 조회에 실패했습니다.");
        }
        return missions;
    } catch (err) {
        throw new Error(`미션 조회 중 오류가 발생했습니다. (${err})`);
    }
};

// 내가 진행 중인 미션을 진행 완료로 바꾸기 (Prisma 사용)
export const updateUserMission = async (user_mission_id) => {
    try {
        const mission = await prisma.userMission.update({
            where: { id: user_mission_id },
            data: { status: "complete", finishDate: new Date() },
        });
        return mission;
    } catch (err) {
        throw new Error(`미션 업데이트 중 오류가 발생했습니다. (${err})`);
    }
};
