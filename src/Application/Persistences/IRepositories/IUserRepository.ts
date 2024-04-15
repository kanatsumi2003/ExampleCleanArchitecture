import { User } from "../../../Domain/Entities/UserEntites";
import IBaseRepository from "./IBaseRepository";

interface IUserRepository extends IBaseRepository {
    createUser(user: User): Promise<void>;
    login()
}

export default IUserRepository;