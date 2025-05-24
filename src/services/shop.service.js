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
    try {
        const missionId = await createMissionInDB({
            shopId,
            point: missionDto.point,
            priceCriterion: missionDto.priceCriterion,
            dueDate: missionDto.dueDate,
        });
        
        try {
            const mission = await findMissionById(missionId);
            console.log('Created mission:', mission);
            return MissionResponseDto(mission);
        } catch (findError) {
            console.error('Error finding created mission:', findError);
            return {
                id: String(missionId),
                shopId: String(shopId),
                point: missionDto.point,
                priceCriterion: String(missionDto.priceCriterion),
                dueDate: missionDto.dueDate,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        }
    } catch (error) {
        console.error('Error in createMission service:', error);
        throw error;
    }
};

export const findReviewsByShopId = async (shopId) => {
    const reviews = await findReviewById(shopId);
    return reviews.map((review) => ReviewResponseDto(review));
}