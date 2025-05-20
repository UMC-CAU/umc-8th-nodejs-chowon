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
        // 문자열로 넘어온 shopId를 숫자로 변환
        const parsedShopId = parseInt(shopId, 10);
        
        const missionId = await createMissionInDB({
            shopId: parsedShopId,
            point: missionDto.point,
            priceCriterion: missionDto.priceCriterion,
            dueDate: missionDto.dueDate,
        });
        
        // 미션 정보 조회 및 응답 생성을 별도의 try-catch로 분리
        try {
            const mission = await findMissionById(missionId);
            console.log('Created mission:', mission);
            return MissionResponseDto(mission);
        } catch (findError) {
            console.error('Error finding created mission:', findError);
            // 미션은 성공적으로 생성되었지만 조회에 실패한 경우 기본 응답 반환
            return {
                id: String(missionId),
                shopId: String(parsedShopId),
                point: missionDto.point,
                priceCriterion: String(missionDto.priceCriterion),
                dueDate: missionDto.dueDate,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        }
    } catch (error) {
        console.error('Error in createMission service:', error);
        throw error; // 컨트롤러에서 처리하도록 오류를 다시 throw
    }
};

export const findReviewsByShopId = async (shopId) => {
    const reviews = await findReviewById(shopId);
    return reviews.map((review) => ReviewResponseDto(review));
}