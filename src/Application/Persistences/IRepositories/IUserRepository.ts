import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
import { ForgotPasswordResponse } from "../../Features/User/Response/ForgotPasswordResponse";
import { UpdateImageResponse } from "../../Features/User/Response/UpdateImageResponse";
import IBaseRepository from "./IBaseRepository";

interface IUserRepository extends IBaseRepository {
    getUserByEmail(email: string, queryData: UserWithBase);
    getUserByEmailAndName(email: string, username: string, queryData: any): Promise<UserWithBase | null>;
    createUser(userData: any): Promise<UserWithBase>;
    getUserById(userId: string, queryData: any): Promise<UserWithBase>;
    updateUserById(userId:string,  userData: any):Promise<void>;
    uploadPass(data: any): Promise<void>;
    uploadImage(data: any): Promise<string>;
}

export default IUserRepository;