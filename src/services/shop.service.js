import { MissionResponseDto, ReviewResponseDto } from "../dtos/response/shop.dto.js";
import { createMission, createReview, getMissionById, getReviewById } from "../repositories/shop.repository.js";

export const addReview = async (shopId, reviewDto) => {
    const reviewId = await createReview({
        shopId,
        userId: reviewDto.userId,
        body: reviewDto.body,
        score: reviewDto.score,
        images: reviewDto.images,
    });

    const review = await getReviewById(reviewId);
    return ReviewResponseDto(review);
};

export const addMission = async (shopId, missionDto) => {
    const missionId = await createMission({
        shopId,
        point: missionDto.point,
        priceCriterion: missionDto.priceCriterion,
        dueDate: missionDto.dueDate,
    });
    const mission = await getMissionById(missionId);
    console.log(mission)
    return MissionResponseDto(mission);
}