import { Request, Response, query } from "express";
import mongoose, { Collection } from "mongoose";
import { User } from "../../Domain/Entities/UserEntites";
import { ObjectId } from "mongodb";
import UserRepository from "../../Infrastructure/Persistences/Respositories/UserRepository";
class UserController {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    async login(req: Request, res: Response): Promise<void> {
        
        const {email, password} = req.body;
        const data = {
            email: email,
            password: password
        };
        const result = await LoginHandler(data);
        res.status(200).json({data: result})
    }
//     async newUser(req: Request, res: Response): Promise<void> {
//         try {
//             const user = new User("b", "asd", "1", "123", "123", new ObjectId(123), "123")
//             const userRepository = new UserRepository();
//             await userRepository.createUser(user);
//         } catch (error) {
//             console.log(error);
//         }

//     }
//     async findAll(req: Request, res: Response): Promise<User[]> {
//         try {
//             const user: User[] = await this.userRepository.getAllUser();
//             console.log(user);
//             return user;
//         } catch (error) {
//             throw error;
//         }
//     }
//     async findUser(req: Request, res: Response): Promise<User[]> {
//         try {
//             const user: User[] = await this.userRepository.findUser("b");
//             return user;
//         } catch (error) {
//             throw error;
//         }
//     }
//     async update(req: Request, res: Response): Promise<void> {
//         try {
//             const user = new User("c", "aasdsadasdsd", "1", "123", "123", new ObjectId(123), "123");
//             await this.userRepository.updateUser(user);
//         } catch (error) {
//             throw error;
//         }
//     }
//     async delete(req: Request, res: Response): Promise<void> {
//         try {
//             await this.userRepository.deleteUser("661cc964499a8cf655c96d2b");
//         } catch (error) {
//             throw error;
//         }
//     }
}

export default UserController;