import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

// 기본 비활성 유저 생성 (email, password)
export const createUser = async (data) => {
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    if (user) {
        return null;
    }
    const created = await prisma.user.create({ data: data });
    return created.id;

    // const conn = await pool.getConnection();
    // try {
    //     const [confirm] = await pool.query(
    //         `SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) as isExistEmail`,
    //         data.email
    //     );
    //     if (confirm[0].isExistEmail) {
    //         return null;
    //     }

    //     const [result] = await pool.query(
    //         `INSERT INTO users (email, social_type, social_id) VALUES (?, ?, ?)`,
    //         [data.email, data.socialType, data.socialId]
    //     );
    //     return result.insertId;
    // } catch (err) {
    //     throw new Error(
    //         `2오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
};

// 유저 조회
export const findUserById = async (userId) => {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
    return user;
    // const conn = await pool.getConnection();
    // try {
    //     const [user] = await pool.query(
    //         `SELECT email, social_type, social_id, id
    //         FROM users
    //         WHERE id = ?`,
    //         [userId]
    //     );
    //     return user.length > 0 ? user[0] : null;
    // } catch (err) {
    //     throw new Error(
    //         `1오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
};

// 유저 정보 수정
export const updateUserInfo = async (data) => {
    // const conn = await pool.getConnection();
    // try {
    //     await pool.query(
    //         `
    //         UPDATE users
    //         SET name = ?, gender = ?, birth = ?, address = ?, detail_address = ?
    //         WHERE id = ?`,
    //         [
    //             data.name,
    //             data.gender,
    //             data.birth,
    //             data.address,
    //             data.detailAddress,
    //             data.userId,
    //         ]
    //     );
    //     return;
    // } catch (err) {
    //     throw new Error(
    //         `3오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
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
    if (!user) {
        throw new Error("유저 정보 업데이트에 실패했습니다.");
    }
    return user;
};

// 유저 정보 조회
export const findUserInfoById = async (userId) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [user] = await pool.query(
    //         `
    //         SELECT id, name, gender, birth, address, detail_address, social_type, social_id
    //         FROM users
    //         WHERE id = ?`,
    //         [userId]
    //     );
    //     return user.length > 0 ? user[0] : null;
    // } catch (err) {
    //     throw new Error(
    //         `4오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const user = await prisma.user.findFirstOrThrow({
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
    return user;
};

// 유저 약관 동의 수정
export const updateUserTerms = async (data) => {
    // const conn = await pool.getConnection();
    // try {
    //     await pool.query(
    //         `
    //         UPDATE users
    //         SET service_check = ?, privacy_check = ?, location_check = ?, marketing_check = ?, age_check = ?
    //         WHERE id = ?`,
    //         [
    //             data.serviceCheck,
    //             data.privacyCheck,
    //             data.locationCheck,
    //             data.marketingCheck,
    //             data.ageCheck,
    //             data.userId,
    //         ]
    //     );
    //     return;
    // } catch (err) {
    //     throw new Error(
    //         `5오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
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
    if (!user) {
        throw new Error("유저 약관 동의 업데이트에 실패했습니다.");
    }
    return user;
};

// 유저 약관 동의 조회
export const findUserTermsById = async (userId) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [user] = await pool.query(
    //         `
    //         SELECT id, service_check, privacy_check, location_check, marketing_check, age_check
    //         FROM users
    //         WHERE id = ?`,
    //         [userId]
    //     );
    //     return user.length > 0 ? user[0] : null;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const user = await prisma.user.findFirstOrThrow({
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
    return user;
};

// 유저 선호 음식 수정
export const updateUserPreference = async (data) => {
    await prisma.userFoodCategory.create({
        data: {
            userId: data.userId,
            foodCategoryId: data.foodId,
        },
    });
    // const conn = await pool.getConnection();
    // try {
    //     await pool.query(
    //         `
    //         INSERT INTO user_food_category (user_id, food_id) VALUES (?, ?)`,
    //         [data.userId, data.foodId]
    //     );
    //     return;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
};

// 유저 선호 음식 조회
export const findUserPreferencesByUserId = async (userId) => {
    const preferences = await prisma.userFoodCategory.findMany({
        select: {
            id: true,
            userId: true,
            foodCategoryId: true,
            foodCategory: true,
        },
        where: {
            userId: userId,
        },
        orderBy: { foodCategoryId: "asc" },
    });
    return preferences;
    // const conn = await pool.getConnection();
    // try {
    //     const [preferences] = await pool.query(
    //         `
    //         SELECT fc.id, fc.name
    //         FROM user_food_category ufc
    //         JOIN food_category fc ON ufc.food_id = fc.id
    //         WHERE ufc.user_id = ?`,
    //         [userId]
    //     );
    //     console.log(preferences);
    //     return preferences;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
};

// 유저 상태 수정
export const updateUserStatus = async (data) => {
    // const conn = await pool.getConnection();
    // try {
    //     await pool.query(
    //         `
    //         UPDATE users
    //         SET status = ?
    //         WHERE id = ?`,
    //         [data.status, data.userId]
    //     );
    //     return;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
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
    // const conn = await pool.getConnection();
    // try {
    //     const [user] = await pool.query(
    //         `SELECT id, status FROM users WHERE id = ?`,
    //         [userId]
    //     );
    //     return user.length > 0 ? user[0] : null;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const user = await prisma.user.findFirstOrThrow({
        where: { id: userId },
        select: { id: true, status: true },
    });
    return user;
};

// 유저 전체 조회
export const findAllUserById = async (userId) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [user] = await pool.query(`SELECT * FROM users WHERE id = ?`, [
    //         userId,
    //     ]);
    //     console.log(user);

    //     if (user.length == 0) {
    //         return null;
    //     }

    //     return user;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const user = await prisma.user.findFirstOrThrow({
        where: { id: userId },
    });
    return user;
};

// 유저 선호 음식 조회
export const findUserPreferenceByUserId = async (userId) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [preferences] = await pool.query(
    //         `
    //         SELECT ufc.id, ufc.food_id, ufc.user_id, fc.name
    //         FROM user_food_category ufc
    //         JOIN food_category fc ON ufc.food_id = fc.id
    //         WHERE ufc.user_id = ?
    //         ORDER BY ufc.food_id ASC`,
    //         [userId]
    //     );
    //     return preferences;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
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
    });
    return preferences;
};

// 유저 미션 생성
export const createUserMission = async (data) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [mission] = await pool.query(
    //         `SELECT EXISTS(SELECT 1 FROM mission WHERE id = ?) as isExistMission`,
    //         data.missionId
    //     );
    //     if (!mission[0].isExistMission) {
    //         return null;
    //     }

    //     const [user_mission] = await pool.query(
    //         `
    //         INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)`,
    //         [data.userId, data.missionId]
    //     );
    //     return user_mission.insertId;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
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
};
// 유저 미션 조회
export const findUserMissionById = async (user_mission_id) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [mission] = await pool.query(
    //         `SELECT id, user_id, mission_id, status, finish_date, created_at, updated_at
    //         FROM user_mission WHERE id = ?`,
    //         [user_mission_id]
    //     );
    //     return mission.length > 0 ? mission[0] : null;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const mission = await prisma.userMission.findFirstOrThrow({
        where: { id: user_mission_id },
    });
    return mission;
};

// 내가 작성한 리뷰 목록 조회 (Prisma 사용)
export const findUserReviewsById = async (userId) => {
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
};

// 내가 진행 중인 미션 목록 조회 (Prisma 사용)
export const findUserMissionsById = async (userId) => {
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
    return missions;
};

// 내가 진행 중인 미션을 진행 완료로 바꾸기 (Prisma 사용)
export const updateUserMission = async (user_mission_id) => {
    const mission = await prisma.userMission.update({
        where: { id: user_mission_id },
        data: { status: "complete", finishDate: new Date() },
    });
    return mission;
};