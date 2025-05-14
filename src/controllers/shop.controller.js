import { StatusCodes } from "http-status-codes";
import {
    createMission,
    createReview,
    findReviewsByShopId,
} from "../services/shop.service.js";
import { CreateMissionDto, CreateReviewDto } from "../dtos/request/shop.dto.js";

const createMissionByShopId = async (req, res) => {
    console.log("가게에 미션 생성 중...");
    const shopId = req.params.shop_id;
    try {
        const missionDto = CreateMissionDto(req.body);
        const mission = await createMission(shopId, missionDto);
        res.sendSuccess(
            StatusCodes.OK,
            "미션이 성공적으로 생성되었습니다.",
            mission
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "미션 생성에 실패했습니다.",
            error,
            req.body
        );
    }
};

const createReviewByShopId = async (req, res) => {
    console.log("가게에 리뷰 생성 중...");
    const shopId = req.params.shop_id;
    try {
        const reviewDto = CreateReviewDto(req.body);
        const review = await createReview(shopId, reviewDto);
        res.sendSuccess(
            StatusCodes.OK,
            "리뷰가 성공적으로 생성되었습니다.",
            review
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "리뷰 생성에 실패했습니다.",
            error,
            req.body
        );
    }
};

const getReviewsByShopId = async (req, res, next) => {
    console.log("가게 리뷰 조회 중...");
    try {
        const reviews = await findReviewsByShopId(req.params.shop_id);
        res.sendSuccess(
            StatusCodes.OK,
            "리뷰가 성공적으로 조회되었습니다.",
            reviews
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "리뷰 조회에 실패했습니다.",
            error
        );
    }
};

export const shopController = {
    createMissionByShopId,
    createReviewByShopId,
    getReviewsByShopId,
};
