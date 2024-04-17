import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
import IBaseRepository from "./IBaseRepository";

interface IUserRepository extends IBaseRepository {
    getUserByEmail(email: string, queryData: UserWithBase);
    getUserByEmailAndName(email: string, username: string, queryData: any): Promise<UserWithBase | null>;
    createUser(userData: any): Promise<void>;
    getUserById(userId: string, queryData: any): Promise<UserWithBase>;
}

export default IUserRepository;