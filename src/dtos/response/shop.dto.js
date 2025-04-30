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