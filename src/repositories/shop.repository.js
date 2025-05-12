import { pool } from "../db.config.js";
import { prisma } from "../prisma.config.js";

// 리뷰 생성
export const createReview = async (data) => {
    try {
        const shop = await prisma.shop.findUnique({
            where: {
                id: data.shopId,
            },
        });
        if (!shop) {
            throw new Error("가게를 찾을 수 없습니다.");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: data.userId,
            },
        });
        if (!user) {
            throw new Error("사용자를 찾을 수 없습니다.");
        }
        if (data.score < 1 || data.score > 5) {
            throw new Error("점수는 1에서 5 사이여야 합니다.");
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
        if (!review) {
            throw new Error("리뷰 생성에 실패했습니다.");
        }
        const reviewId = result.id;

        //     if (data.images && data.images.length > 0) {
        //         const imageValues = data.images.map((image) => [reviewId, image]);
        //         await pool.query(
        //             `INSERT INTO review_image (review_id, image_url) VALUES ?`,
        //             [imageValues]
        //         );
        //     }
        //     return reviewId;

        if (data.images && data.images.length > 0) {
            const images = await prisma.reviewImage.createMany({
                data: data.images.map((image) => ({
                    reviewId: reviewId,
                    imageUrl: image,
                })),
            });
            if (!images) {
                throw new Error("리뷰 이미지를 생성하는데 실패했습니다.");
            }
        }
        return reviewId;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
};

// 리뷰 조회
export const findReviewById = async (reviewId) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [review] = await pool.query(
    //         `SELECT id, user_id, shop_id, body, score, created_at, updated_at
    //         FROM review
    //         WHERE id = ?`,
    //         [reviewId]
    //     );
    //     let result = review[0];
    //     if (review.length > 0) {
    //         const [images] = await pool.query(
    //             `SELECT id, image_url
    //             FROM review_image
    //             WHERE review_id = ?`,
    //             [reviewId]
    //         );
    //         console.log("images", images);

    //         if (images.length > 0) {
    //             result.images = images.map((image) => image.image_url);
    //         } else {
    //             result.images = [];
    //         }
    //     } else {
    //         result = null;
    //     }
    //     return result;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
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
        throw new Error("리뷰를 찾을 수 없습니다.");
    }
    const images = review.images.map((image) => image.imageUrl);
    return {
        ...review,
        images: images,
    };
};

// 미션 생성
export const createMission = async (data) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [shop] = await pool.query(`SELECT id FROM shop WHERE id = ?`, [
    //         data.shopId,
    //     ]);
    //     if (shop.length === 0) {
    //         throw new Error("가게를 찾을 수 없습니다.");
    //     }

    //     const [result] = await pool.query(
    //         `INSERT INTO mission (shop_id, point, price_criterion, due_date, created_at, updated_at)
    //         VALUES (?, ?, ?, ?, ?, ?)`,
    //         [
    //             data.shopId,
    //             data.point,
    //             data.priceCriterion,
    //             data.dueDate,
    //             new Date(),
    //             new Date(),
    //         ]
    //     );
    //     return result.insertId;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const mission = await prisma.mission.create({
        data: {
            shopId: data.shopId,
            point: data.point,
            priceCriterion: data.priceCriterion,
            dueDate: data.dueDate,
        },
    });
    if (!mission) {
        throw new Error("미션 생성에 실패했습니다.");
    }
    return mission.id;
};

// 미션 조회
export const findMissionById = async (missionId) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [mission] = await pool.query(
    //         `SELECT id, shop_id, point, price_criterion, due_date, created_at, updated_at
    //         FROM mission
    //         WHERE id = ?`,
    //         [missionId]
    //     );
    //     return mission.length > 0 ? mission[0] : null;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
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
        throw new Error("미션을 찾을 수 없습니다.");
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
        throw new Error("리뷰를 찾을 수 없습니다.");
    }
    return reviews;
};
