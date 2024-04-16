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
    async login(req: Request<any, any, LoginRequest>, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const deviceId = req.headers['user-agent'] || 'Unknown Device';
            const ipAddress = req.headers['x-forwarded-for'] || (req as any).socket?.remoteAddress || 'Unknown IP';
            const data = {deviceId, ipAddress, email, password}
            const result: any = await LoginHandler(data);

            res.status(result.statusCode).json({ data: result });
            if (result.error != undefined || result.error) {
                res.status(result.statusCode).json({ error: result.error });
            }
        } catch (error: any) {
            console.error('Login failed:', error);
             res.status(500).json({error: error.message});
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

