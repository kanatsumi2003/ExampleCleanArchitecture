import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
import IBaseRepository from "./IBaseRepository";

interface IUserRepository extends IBaseRepository {
    getUserByEmail(email: string, queryData: UserWithBase);
    getUserById(userId: string, queryData: any): Promise<UserWithBase>;
    changePasswordUser(queryData: any): Promise<void>;
}

export default IUserRepository;