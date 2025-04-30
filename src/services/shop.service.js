import { ReviewResponseDto } from "../dtos/response/shop.dto.js";
import { createReview, getReviewById } from "../repositories/shop.repository.js";

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
