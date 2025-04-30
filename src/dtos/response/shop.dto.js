export const ReviewResponseDto = (body) => {
    return {
        id: body.id,
        userId: body.user_id,
        shopId: body.shop_id,
        body: body.body,
        score: body.score,
        images: Array.isArray(body.images) ? body.images : [],
        createdAt: body.created_at,
        updatedAt: body.updated_at,
    }
}

export const MissionResponseDto = (body) => {
    return {
        id: body.id,
        shopId: body.shop_id,
        point: body.point,
        priceCriterion: body.price_criterion,
        dueDate: body.due_date,
        createdAt: body.created_at,
        updatedAt: body.updated_at,
    }
}