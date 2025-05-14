import { StatusCodes } from "http-status-codes";
import { CreateShopDto } from "../dtos/request/region.dto.js";
import { createShop } from "../services/region.service.js";

const createShopByRegionId = async (req, res) => {
    console.log("특정 지역에 가게 생성 중...");
    const regionId = req.params.region_id;
    try {
        const shopDto = CreateShopDto(req.body);
        const shop = await createShop(regionId, shopDto);
        res.sendSuccess(
            StatusCodes.OK,
            "가게 생성이 성공적으로 완료되었습니다.",
            shop
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "가게 생성에 실패했습니다.",
            error,
            req.body
        );
    }
};

export const regionController = {
    createShopByRegionId,
}