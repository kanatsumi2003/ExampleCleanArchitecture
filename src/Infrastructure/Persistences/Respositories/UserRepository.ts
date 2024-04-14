import { Collection, Db } from "mongodb";
import BaseRepository from "./BaseRepository";
import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";

class UserRepository extends BaseRepository<User> {
    private static collection: Collection<User> = new Collection<User>();

    constructor() {
        super(UserRepository.collection);
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
