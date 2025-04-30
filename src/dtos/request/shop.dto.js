export const CreateReviewDto = (data) => {
    return {
        userId: data.userId,
        body: data.body,
        score: data.score,
        images: Array.isArray(data.images) ? data.images : [],
    }
}