import mongoose from "mongoose";
import { SessionWithBase } from "../../../Domain/Entities/SessionEntites";
import IBaseRepository from "./IBaseRepository";
import { ClientSession } from "mongoose";
// export default interface ISessionRepository extends IBaseRepository {
//     findSessionByEmailAndIP(queryData: any): Promise<SessionWithBase[]>;
//     deleteSession(_id: string): Promise<void>;
//     createSession(sessionData: any): Promise<SessionWithBase>;
//     findSessionByToken(token: any): Promise<any>
//     findSessionByEmail(queryData:any): Promise<SessionWithBase[]>
// }

export default interface ISessionRepository {
    findSessionByEmailAndIP(queryData: any): Promise<typeof SessionWithBase>;
    deleteSession(_id: string, session: ClientSession): Promise<void>;
    createSession(sessionData: any, session: ClientSession): Promise<typeof SessionWithBase>;
    findSessionByToken(token: any): Promise<any>;
    findSessionByEmail(queryData:any): Promise<typeof SessionWithBase>;
}