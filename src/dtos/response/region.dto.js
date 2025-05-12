export const ShopResponseDto = (body) => {
    return {
        id: String(body.id),
        name: body.name,
        address: body.address,
        foodCategoryId: String(body.foodCategoryId),
        status: body.status,
        rate: body.rate,
        ownerId: String(body.ownerId),
        regionId: String(body.regionId),
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
    }
}