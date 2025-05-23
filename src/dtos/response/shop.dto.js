export const ReviewResponseDto = (body) => {
    return {
        id: body.id,
        userId: body.user_id || body.userId,
        shopId: body.shop_id || body.shopId,
        body: body.body,
        score: body.score,
        images: Array.isArray(body.images) ? body.images : [],
        createdAt: body.created_at || body.createdAt,
        updatedAt: body.updated_at || body.updatedAt,
    }
}

export const MissionResponseDto = (body) => {
    return {
        id: body.id,
        shopId: body.shop_id || body.shopId,
        point: body.point,
        priceCriterion: body.price_criterion || body.priceCriterion,
        dueDate: body.due_date || body.dueDate,
        createdAt: body.created_at || body.createdAt,
        updatedAt: body.updated_at || body.updatedAt,
    }
}

export const addReviewResponseDTO = (body) => {
    return {
        id: body.id,
        userId: body.user_id || body.userId,
        shopId: body.shop_id || body.shopId,
        rating: body.rating,
        content: body.content,
        createdAt: body.created_at || body.createdAt,
    };
}

export const addMissionResponseDTO = (body) => {
    return {
        id: body.id,
        shopId: body.shop_id || body.shopId,
        point: body.point,
        priceCriterion: body.price_criterion || body.priceCriterion,
        deadline: body.deadline,
        content: body.content,
        createdAt: body.created_at || body.createdAt,
    };
}

export const getShopReviewsResponseDTO = (reviews, totalElements, totalPages) => {
    // ...existing code...
}
