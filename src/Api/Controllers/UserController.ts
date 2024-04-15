import { Request, Response, query } from "express";
import mongoose, { Collection } from "mongoose";
import { User } from "../../Domain/Entities/UserEntites";
import { ObjectId } from "mongodb";
import UserRepository from "../../Infrastructure/Persistences/Respositories/UserRepository";
import LoginHandler from "../../Application/Features/User/Handlers/LoginHandler";
import { LoginRequest } from "../../Application/Features/User/Requests/LoginRequest";
import { LoginResponse } from "../../Application/Features/User/Response/LoginResponse";
import { error } from "console";
class UserController {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();

    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const loginRequest = new LoginRequest();
            loginRequest.setEmail(email);
            loginRequest.setPassword(password);
            const result: LoginResponse = await LoginHandler(loginRequest);

            res.status(result.getStatusCode()).json({ data: result });
            if (result.getError) {
                res.status(result.getStatusCode()).json({ error: result.getError });
            }
        } catch (error) {
            console.error('Login failed:', error);
            res.status(500).json({ error: 'Login failed', message: error.message });
        }
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

