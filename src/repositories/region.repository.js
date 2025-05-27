import { prisma } from "../db.config.js"; // prisma import 확인
import { InvalidParameterError } from "../utils/error.util.js";

// 가게 생성 (regionId)
export const createShop = async (data) => {
    try {
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
    } catch (err) {
        // Prisma 에러 코드 등을 활용하여 더 구체적인 에러를 throw 할 수 있습니다.
        // 예를 들어, 고유 제약 조건 위반 시 DuplicateShopNameError 등을 정의하고 사용할 수 있습니다.
        throw new InvalidParameterError(
            `가게 생성 중 오류가 발생했습니다. (${err.message})`
        );
    }
};

// 가게 조회
export const findShopById = async (shopId) => {
    try {
        const shop = await prisma.shop.findUnique({
            where: {
                id: shopId,
            },
        });
        // shop이 null일 경우, 여기서 NotFoundError 등을 throw 할 수 있습니다.
        // service 계층에서 처리할 수도 있습니다.
        return shop;
    } catch (err) {
        throw new InvalidParameterError(
            `가게 조회 중 오류가 발생했습니다. (${err.message})`
        );
    }
};

// 지역 조회
export const findRegionById = async (regionId) => {
    try {
        const region = await prisma.region.findUnique({
            where: {
                id: regionId,
            },
        });
        // region이 null일 경우, 여기서 NotFoundError 등을 throw 할 수 있습니다.
        // service 계층에서 처리할 수도 있습니다.
        return region;
    } catch (err) {
        throw new InvalidParameterError(
            `지역 조회 중 오류가 발생했습니다. (${err.message})`
        );
    }
};
