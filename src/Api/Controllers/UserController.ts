import {Request, Response} from "express";
import { Collection } from "mongoose";
import { User } from "../../Domain/Entities/UserEntites";
import { ObjectId } from "mongodb";
import UserRepository from "../../Infrastructure/Persistences/Respositories/UserRepository";
class UserController {
    async newUser(req: Request, res: Response) : Promise<void> {
        try {
            const user = new User("b", "asd", "1", "123", "123", new ObjectId(123), "123" )
            const userRepository = new UserRepository();
            await userRepository.createUser(user);
        } catch (error) {
            console.log(error);
        }

    }
}

export default UserController;