import { StatusCodes } from "http-status-codes";
import { addReview } from "../services/shop.service.js";
import { CreateReviewDto } from "../dtos/request/shop.dto.js";

const createMissionByShopId = async (req, res) => {
}

const createReviewByShopId = async (req, res) => {
    console.log("가게에 리뷰 생성 중...");
    const shopId = req.params.shop_id;
    try {
        const reviewDto = CreateReviewDto(req.body);
        console.log("리뷰 DTO:", reviewDto);
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