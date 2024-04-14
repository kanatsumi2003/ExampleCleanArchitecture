import { Collection, Db } from "mongodb";
import BaseRepository from "./BaseRepository";
import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
class UserRepository extends BaseRepository<User>{
    public static collection: Collection<User>;
    constructor(collection: Collection<User>){
        super(collection);
    }
    // public userRepository;
    // public UserRepository() {
    //     this.userRepository = new UserRepository(this.collection);
    // }
    public async createUser(user: User): Promise<void>{
        try {
            const result = await this.insertDocuments(user);
            console.log(result);
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;
