import { User } from "../../../Domain/Entities/UserEntites";
import IBaseRepository from "./IBaseRepository";

interface IUserRepository extends IBaseRepository {
    getUserSession();
    getUserByEmail(email: string);
}

export default IUserRepository;