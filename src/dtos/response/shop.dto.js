export const ReviewResponseDto = (body) => {
    return {
        id: body.id,
        userId: body.userId,
        shopId: body.shopId,
        body: body.body,
        score: body.score,
        images: Array.isArray(body.images) ? body.images : [],
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
    }
}

export const MissionResponseDto = (body) => {
    return {
        id: body.id,
        shopId: body.shopId,
        point: body.point,
        priceCriterion: body.priceCriterion,
        dueDate: body.dueDate,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
    }
}

export const addReviewResponseDTO = (body) => {
    return {
        id: body.id,
        userId: body.userId,
        shopId: body.shopId,
        rating: body.rating,
        content: body.content,
        createdAt: body.createdAt,
    };
}

export const addMissionResponseDTO = (body) => {
    return {
        id: body.id,
        shopId: body.shopId,
        point: body.point,
        priceCriterion: body.priceCriterion,
        deadline: body.deadline,
        content: body.content,
        createdAt: body.createdAt,
    };
}

export const getShopReviewsResponseDTO = (reviews, totalElements, totalPages) => {
    // ...existing code...
}
