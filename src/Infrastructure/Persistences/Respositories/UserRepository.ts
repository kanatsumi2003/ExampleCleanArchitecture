import { Collection, Db } from "mongodb";
import BaseRepository from "./BaseRepository";
import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
<<<<<<< HEAD

class UserRepository extends BaseRepository<User> {
    private static collection: Collection<User> = new Collection<User>();

    constructor() {
        super(UserRepository.collection);
=======
class UserRepository extends BaseRepository<User>{
    constructor() {
        const collectionName: string = "User";
        super(collectionName);
>>>>>>> 83cd109c9d2530caccd96a352f21bea4c9bd8282
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

export default UserRepository
 