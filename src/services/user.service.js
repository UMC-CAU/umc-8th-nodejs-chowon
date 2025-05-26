import {
    findUserMissionById,
    createUserMission,
} from "../repositories/user.repository.js";
import {
    UserMissionResponseDto,
} from "../dtos/response/user.dto.js";



export const assignMissionToUser = async (userId, data) => {
    const user_mission_id = await createUserMission({
        userId,
        missionId: data.missionId,
    });
    if (user_mission_id === null) {
        throw new Error("존재하지 않는 미션입니다.");
    }

    const user_mission = await findUserMissionById(user_mission_id);
    return UserMissionResponseDto(user_mission);
}