import {
    MissionResponseDto,
    ReviewResponseDto,
} from "../dtos/response/shop.dto.js";
import {
    createMission as createMissionInDB,
    createReview as createReviewInDB,
    findMissionById,
    findReviewById,
} from "../repositories/shop.repository.js";

export const createReview = async (shopId, reviewDto) => {
    const reviewId = await createReviewInDB({
        shopId,
        userId: reviewDto.userId,
        body: reviewDto.body,
        score: reviewDto.score,
        images: reviewDto.images,
    });

    const review = await findReviewById(reviewId);
    return ReviewResponseDto(review);
};

export const createMission = async (shopId, missionDto) => {
    const missionId = await createMissionInDB({
        shopId,
        point: missionDto.point,
        priceCriterion: missionDto.priceCriterion,
        dueDate: missionDto.dueDate,
    });
    const mission = await findMissionById(missionId);
    console.log(mission);
    return MissionResponseDto(mission);
};

export const findReviewsByShopId = async (shopId) => {
    const reviews = await findReviewById(shopId);
    return reviews.map((review) => ReviewResponseDto(review));
}