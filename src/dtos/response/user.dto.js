// filepath: d:\coding\2026\umc-8th-nodejs-chowon\src\dtos\response\user.dto.js

export const UserMissionResponseDto = (user) => {
    return {
        id: user.id,
        userId: user.userId,
        missionId: user.missionId,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

export const signUpResponseDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        address: user.address,
        point: user.point,
    };
};

export const signInResponseDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        address: user.address,
        point: user.point,
    };
};

export const getUserResponseDTO = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        address: user.address,
        point: user.point,
    };
};

export const getMyInfoResponseDTO = (userId) => {
    return {
        id: userId,
    };
};

export const completeMissionResponseDTO = (user) => {
    return {
        id: user.id,
        point: user.point,
    };
};

export const getMyMissionsResponseDTO = (user) => {
    return {
        id: user.id,
        userId: user.userId,
        missionId: user.missionId,
        status: user.status,
        createdAt: user.createdAt,
    };
};