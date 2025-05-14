export class DuplicateUserEmailError extends Error {
    errorCode = "U001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
    }
}

export class MissionNotFoundError extends Error {
    errorCode = "M001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
    }
}

export class AlreadyInProgressMissionError extends Error {
    errorCode = "M002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
    }
}

export class ReviewCreationError extends Error {
    errorCode = "R001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
    }
}

export class ReviewImageCreationError extends Error {
    errorCode = "R002";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
    }
}

export class MissionQueryError extends Error {
    errorCode = "M003";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
    }
}

export class MissionUpdateError extends Error {
    errorCode = "M004";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
    }
}

export class InvalidParameterError extends Error {
    errorCode = "G001"; // General error

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
    }
}
