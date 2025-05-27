import { StatusCodes } from "http-status-codes";
import {
    createMission,
    createReview,
    findReviewsByShopId,
} from "../services/shop.service.js";
import { CreateMissionDto, CreateReviewDto } from "../dtos/request/shop.dto.js";

const createMissionByShopId = async (req, res) => {
    console.log("가게에 미션 생성 중...");
    const shopId = req.params.shopId;
    try {
        const missionDto = CreateMissionDto(req.body);
        const mission = await createMission(shopId, missionDto);
        res.sendSuccess(
            StatusCodes.CREATED, // 생성 성공에 맞는 201 상태 코드 사용
            "미션이 성공적으로 생성되었습니다.",
            mission
        );
    } catch (error) {
        console.error("미션 생성 오류:", error);
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
    const shopId = req.params.shopId;
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
        const reviews = await findReviewsByShopId(req.params.shopId);
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
