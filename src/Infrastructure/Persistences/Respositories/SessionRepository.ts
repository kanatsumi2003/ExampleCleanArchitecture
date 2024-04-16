import mongoose from "mongoose";
import ISessionRepository from "../../../Application/Persistences/IRepositories/ISessionRepository";
import { SessionLogin, SessionWithBase } from "../../../Domain/Entities/SessionEntites";
import BaseRepository from "./BaseRepository";

class SessionRepository extends BaseRepository<SessionLogin> implements ISessionRepository {
    constructor() {
        const collectionName: string = "sessions";
        super(collectionName);
    }
    async findSessionByEmailAndIP(queryData: SessionWithBase): Promise<SessionWithBase> {
        try {
            const query = {
                email: queryData.getEmail,
                ipAddress: queryData.getIpAddress,
                deviceId: queryData.getDeviceId,
                isDelete: queryData.isIsDelete
            }
            const sessions: SessionWithBase[] = await this.findDocuments(query, null, {});
            if (sessions === null || sessions.length <= 0) {
                throw new Error('No session found!');
            }
            return sessions[0];
        } catch (error) {
            throw error;
        }
    }

    async deleteSession(_id: mongoose.Types.ObjectId, queryData: SessionWithBase): Promise<void> {
        try {
            const query = {
                id: _id,
            }
            const result = await this.deleteDocument(query);
        } catch (error) {
            throw error;
        }

    }

    async createSession(sessionData) {
        const fullSession = new SessionWithBase(sessionData)
        await this.insertDocuments(fullSession);
        return fullSession;
    }
}

export default SessionRepository;