import { ShopResponseDto } from "../dtos/response/region.dto.js";
import { createShop, getRegionById, getShopByShopId } from "../repositories/region.repository.js";

export const addShop = async (regionId, data) => {
    const region = await getRegionById(regionId);
    if (!region) {
        throw new Error("존재하지 않는 지역입니다.");
    } else {
        console.log("지역: ", region, regionId);
    }

    const shop_id = await createShop({
        regionId,
        name: data.name,
        address: data.address,
        foodCategoryId: data.foodCategoryId,
        ownerId: data.ownerId,
        status: data.status,
        rate: data.rate,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    })
    if (shop_id === null) {
        throw new Error("이미 존재하는 가게명입니다.");
    }
    const shop = await getShopByShopId(shop_id);
    return ShopResponseDto(shop);
}