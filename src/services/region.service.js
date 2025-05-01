import { ShopResponseDto } from "../dtos/response/region.dto.js";
import {
    createShop as createShopRepository,
    findRegionById,
    findShopById,
} from "../repositories/region.repository.js";

export const createShop = async (regionId, data) => {
    const region = await findRegionById(regionId);
    if (!region) {
        throw new Error("존재하지 않는 지역입니다.");
    } else {
        console.log("지역: ", region, regionId);
    }

    const shop_id = await createShopRepository({
        regionId,
        name: data.name,
        address: data.address,
        foodCategoryId: data.foodCategoryId,
        ownerId: data.ownerId,
        status: data.status,
        rate: data.rate,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    });
    if (shop_id === null) {
        throw new Error("이미 존재하는 가게명입니다.");
    }
    const shop = await findShopById(shop_id);
    return ShopResponseDto(shop);
};
