import { pool } from "../db.config.js";

// 기본 비활성 유저 생성 (email, password)
export const addUser = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) as isExistEmail`,
            data.email
        );
        if (confirm[0].isExistEmail) {
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO users (email, social_type, social_id) VALUES (?, ?, ?)`,
            [data.email, data.socialType, data.socialId]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(
            `2오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
export const getUserById = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [user] = await pool.query(
            `SELECT email, social_type, social_id, id
            FROM users
            WHERE id = ?`,
            [userId]
        );
        return user.length > 0 ? user[0] : null;
    } catch (err) {
        throw new Error(
            `1오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const setUserInfo = async (data) => {
    const conn = await pool.getConnection();
    try {
        await pool.query(
            `
            UPDATE users
            SET name = ?, gender = ?, birth = ?, address = ?, detail_address = ?
            WHERE id = ?`,
            [
                data.name,
                data.gender,
                data.birth,
                data.address,
                data.detailAddress,
                data.userId,
            ]
        );
        return;
    } catch (err) {
        throw new Error(
            `3오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
export const getUserInfoById = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [user] = await pool.query(
            `
            SELECT id, name, gender, birth, address, detail_address, social_type, social_id
            FROM users
            WHERE id = ?`,
            [userId]
        );
        return user.length > 0 ? user[0] : null;
    } catch (err) {
        throw new Error(
            `4오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const setUserTerms = async (data) => {
    const conn = await pool.getConnection();
    try {
        await pool.query(
            `
            UPDATE users
            SET service_check = ?, privacy_check = ?, location_check = ?, marketing_check = ?, age_check = ?
            WHERE id = ?`,
            [
                data.serviceCheck,
                data.privacyCheck,
                data.locationCheck,
                data.marketingCheck,
                data.ageCheck,
                data.userId,
            ]
        );
        return;
    } catch (err) {
        throw new Error(
            `5오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
export const getUserTermsById = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [user] = await pool.query(
            `
            SELECT id, service_check, privacy_check, location_check, marketing_check, age_check
            FROM users
            WHERE id = ?`,
            [userId]
        );
        return user.length > 0 ? user[0] : null;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const setUserPreference = async (data) => {
    const conn = await pool.getConnection();
    try {
        await pool.query(
            `
            INSERT INTO user_food_category (user_id, food_id) VALUES (?, ?)`,
            [data.userId, data.foodId]
        );
        return;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
export const getUserPreferencesByUserId = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [preferences] = await pool.query(
            `
            SELECT fc.id, fc.name
            FROM user_food_category ufc
            JOIN food_category fc ON ufc.food_id = fc.id
            WHERE ufc.user_id = ?`,
            [userId]
        );
        console.log(preferences)
        return preferences;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const setUserStatus = async (data) => {
    const conn = await pool.getConnection();
    try {
        await pool.query(
            `
            UPDATE users
            SET status = ?
            WHERE id = ?`,
            [data.status, data.userId]
        );
        return;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
export const getUserStatusById = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [user] = await pool.query(
            `SELECT id, status FROM users WHERE id = ?`,
            [userId]
        );
        return user.length > 0 ? user[0] : null;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const getAllUserById = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [user] = await pool.query(
            `SELECT * FROM users WHERE id = ?`,
            [userId]
        );
        console.log(user);

        if (user.length == 0) {
            return null;
        }

        return user;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const getUserPreferenceByUserId = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const [preferences] = await pool.query(
            `
            SELECT ufc.id, ufc.food_id, ufc.user_id, fc.name
            FROM user_food_category ufc
            JOIN food_category fc ON ufc.food_id = fc.id
            WHERE ufc.user_id = ?
            ORDER BY ufc.food_id ASC`,
            [userId]
        );
        return preferences;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const addUserMission = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [mission] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM mission WHERE id = ?) as isExistMission`,
            data.missionId
        );
        if (!mission[0].isExistMission) {
            return null;
        }

        const [user_mission] = await pool.query(
            `
            INSERT INTO user_mission (user_id, mission_id) VALUES (?, ?)`,
            [data.userId, data.missionId]
        );
        return user_mission.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}
export const getUserMissionById = async (user_mission_id) => {
    const conn = await pool.getConnection();
    try {
        const [mission] = await pool.query(
            `SELECT id, user_id, mission_id, status, finish_date, created_at, updated_at
            FROM user_mission WHERE id = ?`,
            [user_mission_id]
        );
        return mission.length > 0 ? mission[0] : null;
    } catch (err) {
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};