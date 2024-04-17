import mongoose from "mongoose";
import ISessionRepository from "../../../Application/Persistences/IRepositories/ISessionRepository";
import { SessionLogin, SessionWithBase } from "../../../Domain/Entities/SessionEntites";
import BaseRepository from "./BaseRepository";

class SessionRepository extends BaseRepository<SessionLogin> implements ISessionRepository {
    constructor() {
        const collectionName: string = "sessions";
        super(collectionName);
    }
    async findSessionByEmailAndIP(queryData: any): Promise<SessionWithBase[]> {
        try {
            const query = {
                email: queryData.email,
                ipAddress: queryData.ipAddress,
                deviceId: queryData.deviceId,
                isDelete: queryData.isDelete
            }
            const sessions: SessionWithBase[] = await this.findDocuments(query, null, {});
            // if (sessions === null || sessions.length <= 0) {
            //     throw new Error('No session found!');
            // }
            return sessions;
        } catch (error) {
            throw error;
        }
    }

    async deleteSession(_id: mongoose.Types.ObjectId): Promise<void> {
        try {
            const query = {
                id: _id,
            }
            const result = await this.deleteDocument(query);
        } catch (error) {
            throw error;
        }

    }

    async createSession(sessionData: any) {
        const fullSession = new SessionWithBase(sessionData)
        await this.insertDocuments(fullSession);
        return fullSession;
    }
}

export default SessionRepository;