import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
import IBaseRepository from "./IBaseRepository";

interface IUserRepository extends IBaseRepository {
    getUserByEmail(email: string, queryData: UserWithBase);
}

export default IUserRepository;