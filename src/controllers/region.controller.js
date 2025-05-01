import { StatusCodes } from "http-status-codes";
import { CreateShopDto } from "../dtos/request/region.dto.js";
import { createShop } from "../services/region.service.js";

const createShopByRegionId = async (req, res) => {
    console.log("특정 지역에 가게 생성 중...");
    const regionId = req.params.region_id;
    try {
        const shopDto = CreateShopDto(req.body);
        const user = await createShop(regionId, shopDto);
        res.status(StatusCodes.OK).json({ result: user });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

export const regionController = {
    createShopByRegionId,
}