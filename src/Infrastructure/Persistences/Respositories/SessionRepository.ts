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
        } catch (error: any) {
            throw new Error("Error at findSessionByEmailAndIP in SessionRepository: " + error.message);
        }
    }

    async deleteSession(_id: mongoose.Types.ObjectId): Promise<void> {
        try {
            const query = {
                id: _id,
            }
            await this.deleteDocument(query);
        } catch (error: any) {
            throw new Error("Error at deleteSession in SessionRepository: " + error.message);
        }

    }

    async createSession(sessionData: any): Promise<SessionWithBase>{

        try {
            const fullSession = new SessionWithBase(sessionData)
            await this.insertDocuments(fullSession);
            return fullSession;
        } catch (error: any) {
            throw new Error("Error at createSession in SessionRepository: " + error.message);
        }
    }
    
    async findSessionByToken(token: any): Promise<any>{
        try {
            const query = {
                jwttoken: token,
                isDelete: false,
            };
            const sessions: SessionWithBase[] = await this.findDocuments(query, null, {});
            return sessions[0];
        } catch (error: any) {
            throw new Error("Error at findSessionByToken in SessionRepository: " + error.message);
        }

    }
}

export default SessionRepository;