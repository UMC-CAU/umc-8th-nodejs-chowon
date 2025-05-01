import { pool } from "../db.config.js";

// 리뷰 생성
export const createReview = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [shop] = await pool.query(`SELECT id FROM shop WHERE id = ?`, [
            data.shopId,
        ]);
        if (shop.length === 0) {
            throw new Error("가게를 찾을 수 없습니다.");
        }

        const [user] = await pool.query(`SELECT id FROM users WHERE id = ?`, [
            data.userId,
        ]);
        if (user.length === 0) {
            throw new Error("사용자를 찾을 수 없습니다.");
        }
        if (data.score < 1 || data.score > 5) {
            throw new Error("점수는 1에서 5 사이여야 합니다.");
        }

        const [result] = await pool.query(
            `INSERT INTO review (user_id, shop_id, body, score, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.userId,
                data.shopId,
                data.body,
                data.score,
                new Date(),
                new Date(),
            ]
        );
        const reviewId = result.insertId;

        if (data.images && data.images.length > 0) {
            const imageValues = data.images.map((image) => [
                reviewId,
                image,
            ]);
            await pool.query(
                `INSERT INTO review_image (review_id, image_url) VALUES ?`,
                [imageValues]
            );
        }
        return reviewId;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 리뷰 조회
export const findReviewById = async (reviewId) => {
    const conn = await pool.getConnection();
    try {
        const [review] = await pool.query(
            `SELECT id, user_id, shop_id, body, score, created_at, updated_at
            FROM review
            WHERE id = ?`,
            [reviewId]
        );
        let result = review[0];
        if (review.length > 0) {
            const [images] = await pool.query(
                `SELECT id, image_url
                FROM review_image
                WHERE review_id = ?`,
                [reviewId]
            );
            console.log("images", images);

            if (images.length > 0) {
                result.images = images.map((image) => image.image_url);
            } else {
                result.images = [];
            }
        } else {
            result = null;
        }
        return result;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 미션 생성
export const createMission = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [shop] = await pool.query(`SELECT id FROM shop WHERE id = ?`, [
            data.shopId,
        ]);
        if (shop.length === 0) {
            throw new Error("가게를 찾을 수 없습니다.");
        }

        const [result] = await pool.query(
            `INSERT INTO mission (shop_id, point, price_criterion, due_date, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.shopId,
                data.point,
                data.priceCriterion,
                data.dueDate,
                new Date(),
                new Date(),
            ]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}

// 미션 조회
export const findMissionById = async (missionId) => {
    const conn = await pool.getConnection();
    try {
        const [mission] = await pool.query(
            `SELECT id, shop_id, point, price_criterion, due_date, created_at, updated_at
            FROM mission
            WHERE id = ?`,
            [missionId]
        );
        return mission.length > 0 ? mission[0] : null;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}
