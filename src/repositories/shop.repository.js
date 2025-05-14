import { prisma } from "../db.config.js";
import { ReviewCreationError, ReviewImageCreationError, InvalidParameterError, MissionNotFoundError } from "../utils/error.util.js";

// 리뷰 생성
export const createReview = async (data) => {
    try {
        const shop = await prisma.shop.findUnique({
            where: {
                id: data.shopId,
            },
        });
        if (!shop) {
            throw new InvalidParameterError("가게를 찾을 수 없습니다.");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: data.userId,
            },
        });
        if (!user) {
            throw new InvalidParameterError("사용자를 찾을 수 없습니다.");
        }
        if (data.score < 1 || data.score > 5) {
            throw new InvalidParameterError("점수는 1에서 5 사이여야 합니다.");
        }

        const result = await prisma.review.create({
            data: {
                userId: data.userId,
                shopId: data.shopId,
                body: data.body,
                score: data.score,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        if (!result) {
            throw new ReviewCreationError("리뷰 생성에 실패했습니다.");
        }
        const reviewId = result.id;

        if (data.images && data.images.length > 0) {
            const images = await prisma.reviewImage.createMany({
                data: data.images.map((image) => ({
                    reviewId: reviewId,
                    imageUrl: image,
                })),
            });
            if (!images) {
                throw new ReviewImageCreationError("리뷰 이미지를 생성하는데 실패했습니다.");
            }
        }
        return reviewId;
    } catch (err) {
        if (err instanceof InvalidParameterError || err instanceof ReviewCreationError || err instanceof ReviewImageCreationError) {
            throw err;
        }
        throw new InvalidParameterError(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err.message})`
        );
    }
};

// 리뷰 조회
export const findReviewById = async (reviewId) => {
    const review = await prisma.review.findUnique({
        where: { id: reviewId },
        include: {
            images: {
                select: {
                    imageUrl: true,
                },
            },
        },
    });
    if (!review) {
        throw new MissionNotFoundError("리뷰를 찾을 수 없습니다.");
    }
    const images = review.images.map((image) => image.imageUrl);
    return {
        ...review,
        images: images,
    };
};

// 미션 생성
export const createMission = async (data) => {
    const mission = await prisma.mission.create({
        data: {
            shopId: data.shopId,
            point: data.point,
            priceCriterion: data.priceCriterion,
            dueDate: data.dueDate,
        },
    });
    if (!mission) {
        throw new ReviewCreationError("미션 생성에 실패했습니다.");
    }
    return mission.id;
};

// 미션 조회
export const findMissionById = async (missionId) => {
    const mission = await prisma.mission.findUnique({
        where: { id: missionId },
        include: {
            shop: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    if (!mission) {
        throw new MissionNotFoundError("미션을 찾을 수 없습니다.");
    }
    return mission;
};

// 특정 가게의 미션 목록 조회 (Prisma 사용)
export const findMissionsByShopId = async (shopId) => {
    const missions = await prisma.mission.findMany({
        where: { shopId: shopId },
        include: {
            shop: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return missions;
};

// 특정 가게의 리뷰 목록 조회 (이미지 제외)
export const findReviewByShopId = async (shopId) => {
    const reviews = await prisma.review.findMany({
        where: { shopId: shopId },
        select: {
            id: true,
            userId: true,
            body: true,
            score: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!reviews) {
        throw new MissionNotFoundError("리뷰를 찾을 수 없습니다.");
    }
    return reviews;
};
