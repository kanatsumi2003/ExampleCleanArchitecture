import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CreateSessionDTO } from "../DTO/CreateSessionDTO";

export async function CreateSessionHandler(data: any): Promise<void|CoreException> {
    const unitOfWork = new UnitOfWork();
    try {
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
        await unitOfWork.sessionRepository.createSession(createSessionDTO, session);
        await unitOfWork.commitTransaction();
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}