export const CreateReviewDto = (data) => {
    return {
        userId: data.userId,
        body: data.body,
        score: data.score,
        images: Array.isArray(data.images) ? data.images : [],
    }
}

export const CreateMissionDto = (data) => {
    const dueDate = new Date(data.dueDate);

    return {
        point: data.point,
        priceCriterion: data.priceCriterion,
        dueDate,
    }
}

export const addReviewRequestDTO = (data) => {
    return {
        userId: data.userId,
        shopId: data.shopId,
        rating: data.rating,
        content: data.content,
    };
}

export const addMissionRequestDTO = (data) => {
    return {
        shopId: data.shopId,
        point: data.point,
        priceCriterion: data.priceCriterion,
        deadline: data.deadline,
        content: data.content,
    };
}