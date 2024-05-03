import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CreateSessionDTO } from "../DTO/CreateSessionDTO";

export async function CreateSessionHandler(data: any): Promise<void> {
    const unitOfWork = new UnitOfWork();
    try {
        await unitOfWork.startTransaction();
        const session = await unitOfWork.startTransaction();
        const createSessionDTO = new CreateSessionDTO(
            data.user._id,
            data.user.email,
            data.user.name || "unknown", 
            data.user.username.toLowerCase(), 
            data.token.token, 
            data.token.refreshToken,
            data.refreshTokenExpiryDate,
            data.tokenExpiryDate,
            data.deviceId,
            data.ipAddress,
        )
        await unitOfWork.sessionRepository.createSession(createSessionDTO, session);
        await unitOfWork.commitTransaction();
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        throw new Error("Error at CreateSessionHandler in CreateSessionHandler: " + error.message);
    }
}