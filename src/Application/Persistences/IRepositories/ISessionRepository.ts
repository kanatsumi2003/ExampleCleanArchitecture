import IBaseRepository from "./IBaseRepository";

export default interface ISessionRepository extends IBaseRepository {
    findSessionByEmailAndIP(email, ipAddress,deviceId);
}