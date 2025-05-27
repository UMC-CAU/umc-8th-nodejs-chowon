import { StatusCodes } from "http-status-codes";
import {
    assignMissionToUser,
} from "../services/user.service.js";
import {
    AddMissionDto,
} from "../dtos/request/user.dto.js";

const createUserMission = async (req, res) => {
    console.log("유저에게 미션 추가 중...");
    const userId = req.params.userId;
    try {
        const missionDto = AddMissionDto(req.body);
        const mission = await assignMissionToUser(userId, missionDto);
        res.sendSuccess(
            StatusCodes.OK,
            "미션이 성공적으로 추가되었습니다.",
            mission
        );
    } catch (error) {
        res.sendError(
            StatusCodes.BAD_REQUEST,
            "미션 추가에 실패했습니다.",
            error,
            req.body
        );
    }
};

export const userController = {
    addMissionToUser: createUserMission,
};
