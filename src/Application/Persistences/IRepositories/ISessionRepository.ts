import mongoose, { ClientSession } from "mongoose";
import { SessionWithBase } from "../../../Domain/Entities/SessionEntites";
import IBaseRepository from "./IBaseRepository";

export default interface ISessionRepository extends IBaseRepository {
    findSessionByEmailAndIP(queryData: any);
    deleteSession(_id: string, session: ClientSession): Promise<void>;
    createSession(sessionData: any, session: ClientSession);
    findSessionByToken(token: any);
    findSessionByEmail(queryData:any);
}