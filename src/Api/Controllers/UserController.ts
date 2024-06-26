import { CreateUserRequest } from './../../Application/Features/User/Requests/CreateUserRequest';
import { Request, Response, query } from 'express';
import LoginHandler from "../../Application/Features/User/Handlers/LoginHandler";
import { LoginRequest } from "../../Application/Features/User/Requests/LoginRequest";
import { CreateUserHandler } from '../../Application/Features/User/Handlers/CreateUserHandler';
import UserRepository from '../../Infrastructure/Persistences/Respositories/UserRepository';
export default class UserController {
    // private userRepository: UserRepository;
    // constructor() {
    //     this.userRepository = new UserRepository();
    // }
    async login(req: Request<any, any, LoginRequest>, res: Response): Promise<Response> {
    // #swagger.description = 'get role by Id'
    // #swagger.tags = ["User"]
        try {
            const { email, password } = req.body;
            const deviceId = req.headers['user-agent'] || 'Unknown Device';
            const ipAddress = req.headers['x-forwarded-for'] || (req as any).socket?.remoteAddress || 'Unknown IP';
            const data = {deviceId, ipAddress, email, password}
            const result: any = await LoginHandler(data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            console.error('Login failed:', error);
            return res.status(500).json({error: error.message});
        }
    }
    
    async createUser(req: Request<any, any, CreateUserRequest>, res: Response): Promise<Response> {
    // #swagger.description = 'get role by Id'
    // #swagger.tags = ["User"]
        try {
            const {email, fullname, password, phoneNumber, username} = req.body;
            const data: any = { 
                email: email,
                fullname: fullname,
                password: password,
                phoneNumber: phoneNumber,
                username: username,
            };
            const result: any = await CreateUserHandler(data);
            if(result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error })
            };

            return res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            return res.status(500).json({error: error.messgae});
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


