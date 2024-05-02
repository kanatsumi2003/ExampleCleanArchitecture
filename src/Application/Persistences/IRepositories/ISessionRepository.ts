import mongoose from "mongoose";
import { SessionWithBase } from "../../../Domain/Entities/SessionEntites";
import IBaseRepository from "./IBaseRepository";

export default interface ISessionRepository extends IBaseRepository {
    findSessionByEmailAndIP(queryData: any);
    deleteSession(_id: string): Promise<void>;
    createSession(sessionData: any);
    findSessionByToken(token: any);
    findSessionByEmail(queryData:any);
}