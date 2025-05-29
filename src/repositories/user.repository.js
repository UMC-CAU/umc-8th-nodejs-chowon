import { prisma } from "../db.config.js";
import { AlreadyInProgressMissionError, InvalidParameterError, MissionNotFoundError, MissionQueryError, MissionUpdateError } from "../utils/error.util.js";



// 유저 미션 생성
export const createUserMission = async (data) => {
    try {
        const isExistMission = await prisma.mission.findUnique({
            where: { id: parseInt(data.missionId) },
        });
        // 미션이 존재하지 않을 경우 에러 발생
        if (!isExistMission) {
            throw new MissionNotFoundError("존재하지 않는 미션입니다.");
        }

        // 이미 진행 중인 미션인지 확인
        const existingUserMission = await prisma.userMission.findFirst({
            where: {
                userId: parseInt(data.userId),
                missionId: parseInt(data.missionId),
            },
        });
        if (existingUserMission) {
            throw new AlreadyInProgressMissionError("이미 진행 중인 미션입니다.");
        }

        const user_mission = await prisma.userMission.create({
            data: {
                userId: parseInt(data.userId),
                missionId: parseInt(data.missionId),
            },
        });
        if (!user_mission) {
            throw new MissionUpdateError("미션 생성에 실패했습니다."); // MissionCreationError가 없으므로 MissionUpdateError로 대체
        }
        return user_mission.id;
    } catch (err) {
        if (err instanceof MissionNotFoundError || err instanceof AlreadyInProgressMissionError || err instanceof MissionUpdateError) {
            throw err;
        }
        throw new MissionUpdateError(`미션 생성 중 오류가 발생했습니다. (${err.message})`); // MissionCreationError가 없으므로 MissionUpdateError로 대체
    }
};

// 유저 미션 조회
export const findUserMissionById = async (userMissionId) => {
    try {
        const mission = await prisma.userMission.findFirstOrThrow({
            where: { id: parseInt(userMissionId) },
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
        throw new MissionQueryError(`미션 조회에 실패했습니다. (${err.message})`);
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
        throw new InvalidParameterError(`리뷰 조회 중 오류가 발생했습니다. (${err.message})`);
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
            throw new MissionQueryError("미션 조회에 실패했습니다.");
        }
        return missions;
    } catch (err) {
        if (err instanceof MissionQueryError) {
            throw err;
        }
        throw new MissionQueryError(`미션 조회 중 오류가 발생했습니다. (${err.message})`);
    }
};

// 내가 진행 중인 미션을 진행 완료로 바꾸기 (Prisma 사용)
export const updateUserMission = async (userMissionId) => {
    try {
        const mission = await prisma.userMission.update({
            where: { id: userMissionId },
            data: { status: "complete", finishDate: new Date() },
        });
        return mission;
    } catch (err) {
        throw new MissionUpdateError(`미션 업데이트 중 오류가 발생했습니다. (${err.message})`);
    }
};
