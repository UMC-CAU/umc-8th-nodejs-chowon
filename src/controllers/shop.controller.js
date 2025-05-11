import { StatusCodes } from "http-status-codes";
import { createMission, createReview } from "../services/shop.service.js";
import { CreateMissionDto, CreateReviewDto } from "../dtos/request/shop.dto.js";

const createMissionByShopId = async (req, res) => {
    console.log("가게에 미션 생성 중...");
    const shopId = req.params.shop_id;
    try {
        const missionDto = CreateMissionDto(req.body);
        const mission = await createMission(shopId, missionDto);
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
        const review = await createReview(shopId, reviewDto);
        res.status(StatusCodes.OK).json({ result: review });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}

const getReviewsByShopId = async (req, res, next) => {
    console.log("가게 리뷰 조회 중...");
    try {
        const reviews = await findReviewsByShopId(req.params.shop_id);
        res.status(StatusCodes.OK).json({ result: reviews });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}

export const shopController = {
    createMissionByShopId,
    createReviewByShopId,
    getReviewsByShopId
}