import mongoose from "mongoose";
import { SessionWithBase } from "../../../Domain/Entities/SessionEntites";
import IBaseRepository from "./IBaseRepository";

export default interface ISessionRepository extends IBaseRepository {
    findSessionByEmailAndIP(queryData: any): Promise<SessionWithBase[]>;
    deleteSession(_id: mongoose.Types.ObjectId): Promise<void>;
    createSession(sessionData: any): Promise<SessionWithBase>;
    findSessionByToken(token: any): Promise<any>
}