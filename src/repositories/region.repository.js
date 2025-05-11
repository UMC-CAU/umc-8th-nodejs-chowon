import { pool } from "../db.config.js";

// 가게 생성 (region_id)
export const createShop = async (data) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [shop] = await pool.query(
    //         `
    //         SELECT EXISTS(SELECT 1 FROM shop WHERE name = ?) as isExistShop`,
    //         data.name
    //     );
    //     if (shop[0].isExistShop) {
    //         return null;
    //     }

    //     const [result] = await pool.query(
    //         `INSERT INTO shop (name, address, food_category_id, owner_id, region_id, status, rate, created_at, updated_at)
    //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //         [
    //             data.name,
    //             data.address,
    //             data.foodCategoryId,
    //             data.ownerId,
    //             data.regionId,
    //             data.status,
    //             data.rate,
    //             data.createdAt,
    //             data.updatedAt,
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
    const shop = await prisma.shop.create({
        data: {
            name: data.name,
            address: data.address,
            foodCategoryId: data.foodCategoryId,
            ownerId: data.ownerId,
            regionId: data.regionId,
            status: data.status,
            rate: data.rate,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        },
    });
    return shop.id;
};

// 가게 조회
export const findShopById = async (shopId) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [shop] = await pool.query(
    //         `SELECT id, name, address, food_category_id, owner_id, region_id, status, rate, created_at, updated_at
    //         FROM shop
    //         WHERE id = ?`,
    //         [shopId]
    //     );
    //     return shop.length > 0 ? shop[0] : null;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const shop = await prisma.shop.findUnique({
        where: {
            id: shopId,
        },
    });
    return shop;
};

// 지역 조회
export const findRegionById = async (regionId) => {
    // const conn = await pool.getConnection();
    // try {
    //     const [region] = await pool.query(
    //         `SELECT id, name, created_at, updated_at
    //         FROM region
    //         WHERE id = ?`,
    //         [regionId]
    //     );
    //     return region.length > 0 ? region[0] : null;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const region = await prisma.region.findUnique({
        where: {
            id: regionId,
        },
    });
    return region;
};
