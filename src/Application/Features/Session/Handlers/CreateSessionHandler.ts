import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { CreateSessionDTO } from "../DTO/CreateSessionDTO";

export async function CreateSessionHandler(data: any) {
    try {
        const sessionRepository = new SessionRepository();
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
        await sessionRepository.createSession(createSessionDTO);

    } catch (error) {

    }
}