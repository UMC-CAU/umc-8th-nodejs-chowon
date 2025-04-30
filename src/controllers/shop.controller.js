import { StatusCodes } from "http-status-codes";
import { addMission, addReview } from "../services/shop.service.js";
import { CreateMissionDto, CreateReviewDto } from "../dtos/request/shop.dto.js";

const createMissionByShopId = async (req, res) => {
    console.log("가게에 미션 생성 중...");
    const shopId = req.params.shop_id;
    try {
        const missionDto = CreateMissionDto(req.body);
        const mission = await addMission(shopId, missionDto);
        res.status(StatusCodes.OK).json({ result: mission });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}

const createReviewByShopId = async (req, res) => {
    console.log("가게에 리뷰 생성 중...");
    const shopId = req.params.shop_id;
    try {
        const reviewDto = CreateReviewDto(req.body);
        const review = await addReview(shopId, reviewDto);
        res.status(StatusCodes.OK).json({ result: review });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}

export const shopController = {
    createMissionByShopId,
    createReviewByShopId,
}