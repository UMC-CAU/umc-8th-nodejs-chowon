export const CreateShopDto = (body) => {
    if (body.foodCategoryId === undefined) {
        throw new Error("foodCategoryId is required");
    }
    if (body.ownerId === undefined) {
        throw new Error("ownerId is required");
    }
    
    return {
        name: body.name,
        address: body.address,
        foodCategoryId: body.foodCategoryId,
        ownerId: body.ownerId,
        status: body.status === "OPEN" || body.status === true || body.status === 1,
        rate: body.rate || 0,
        createdAt: body.createdAt || new Date(),
        updatedAt: body.updatedAt || new Date(),
    }
}

export const addShopRequestDTO = (body) => {
    return {
        name: body.name,
        address: body.address,
        foodCategoryId: body.foodCategoryId,
        ownerId: body.ownerId,
    };
}