export const ShopResponseDto = (body) => {
    return {
        id: body.id,
        name: body.name,
        address: body.address,
        foodCategoryId: body.foodCategoryId,
        status: body.status,
        rate: body.rate,
        ownerId: body.ownerId,
        regionId: body.regionId,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
    }
}