import {
    findUserMissionById,
    createUserMission,
} from "../repositories/user.repository.js";
import {
    UserMissionResponseDto,
} from "../dtos/response/user.dto.js";



export const assignMissionToUser = async (userId, data) => {
    const userMissionId = await createUserMission({
        userId,
        missionId: data.missionId,
    });
    if (userMissionId === null) {
        throw new Error("존재하지 않는 미션입니다.");
    }

    const userMission = await findUserMissionById(userMissionId);
    return UserMissionResponseDto(userMission);
}