import mongoose, { ClientSession } from "mongoose";
import ISessionRepository from "../../../Application/Persistences/IRepositories/ISessionRepository";
import { SessionLogin, SessionWithBase } from "../../../Domain/Entities/SessionEntites";
import BaseRepository from "./BaseRepository";

class SessionRepository extends BaseRepository<typeof SessionLogin> implements ISessionRepository {
    constructor() {
        const collectionName: string = "sessions";
        super(collectionName);
    }
    async findSessionByEmail(queryData: any) {
        try {
            const {email, isDelete, isActive} = queryData;
            const query = {
                email: email,
                isDelete: isDelete,
                isActive: isActive
            }
            const session = await SessionWithBase.find(query);
            if(session == null) return null;
            return session[0];
          
        } catch (error:any) {
            throw new Error("Error at findSessionByEmail in SessionRepository: " + error.message);
        }
    }

    async findSessionByEmailAndIP(queryData: any) {
        try {
            const query = {
                email: queryData.email,
                ipAddress: queryData.ipAddress,
                deviceId: queryData.deviceId,
                isDelete: queryData.isDelete
            }
            // if (sessions === null || sessions.length <= 0) {
            //     throw new Error('No session found!');
            // }
            const session: typeof SessionWithBase[] = await SessionWithBase.find(query);
            if(session == null) return null;
            return session[0];
        } catch (error: any) {
            throw new Error("Error at findSessionByEmailAndIP in SessionRepository: " + error.message);
        }
    }



    
    async deleteSession(_id: string, session: ClientSession): Promise<void> {
        try {
            // const query = {
            //     _id: new mongoose.Types.ObjectId(_id)
            // }
            await SessionWithBase.findByIdAndDelete(_id, {session});
        } catch (error: any) {
            throw new Error("Error at deleteSession in SessionRepository: " + error.message);
        }

    }

    async createSession(sessionData: any, session: ClientSession){

        try {
            const fullSession = new SessionWithBase({
                userId: sessionData.userId,
                email: sessionData.email,
                name: sessionData.name || "unknown", 
                username: sessionData.username.toLowerCase(), 
                jwttoken: sessionData.jwttoken, 
                refreshToken: sessionData.refreshToken,
                ExpireRefreshToken: sessionData.ExpireRefreshToken,
                expireDate: sessionData.expireDate,
                deviceId: sessionData.deviceId,
                ipAddress: sessionData.ipAddress,
            });
            console.log(fullSession);
            await SessionWithBase.create([fullSession], {session});
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
            const session = await SessionWithBase.find(query);
            if(session == null) return null;
            return session[0];
        } catch (error: any) {
            throw new Error("Error at findSessionByToken in SessionRepository: " + error.message);
        }

    }
}

export default SessionRepository;