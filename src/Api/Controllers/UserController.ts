import { CreateUserRequest } from './../../Application/Features/User/Requests/CreateUserRequest';
import { Request, Response, query } from 'express';
import LoginHandler from "../../Application/Features/User/Handlers/LoginHandler";
import { LoginRequest } from "../../Application/Features/User/Requests/LoginRequest";
import { CreateUserHandler } from '../../Application/Features/User/Handlers/CreateUserHandler';
import UserRepository from '../../Infrastructure/Persistences/Respositories/UserRepository';
import { ForgotPasswordHandler } from '../../Application/Features/User/Handlers/ForgotPasswordHandler';
import { ChangePasswordRequest } from '../../Application/Features/User/Requests/ChangePasswordRequest';
import { ChangePasswordHandler } from '../../Application/Features/User/Handlers/ChangePasswordHandler';

import { md5Encrypt} from '../../Application/Common/Helpers/passwordUtils';
import IUserRepository from '../../Application/Persistences/IRepositories/IUserRepository';
import { User } from '../../Domain/Entities/UserEntites';
import { RequestWithUser } from '../../Application/Features/User/Requests/RequestWithUser';

export default class UserController {
    // private userRepository: UserRepository;
    // constructor() {
    //     this.userRepository = new UserRepository();
    // }
    async login(req: Request<any, any, LoginRequest>, res: Response): Promise<Response> {
        // #swagger.description = 'get role by id'
        // #swagger.tags = ["User"]
        try {
            const { email, password } = req.body;
            const deviceId = req.headers['user-agent'] || 'Unknown Device';
            const ipAddress = req.headers['x-forwarded-for'] || (req as any).socket?.remoteAddress || 'Unknown IP';
            const data = { deviceId, ipAddress, email, password }
            const result: any = await LoginHandler(data);

            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error });
            }
            return res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            console.error('Login failed:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    async createUser(req: Request<any, any, CreateUserRequest>, res: Response): Promise<Response> {
        // #swagger.description = 'Create new User'
        // #swagger.tags = ["User"]
        try {
            const { email, fullname, password, phoneNumber, username } = req.body;
            const data: any = {
                email: email,
                fullname: fullname,
                password: password,
                phoneNumber: phoneNumber,
                username: username,
            };
            const result: any = await CreateUserHandler(data);

            return res.status(result.statusCode).json({ data: result });
        } catch (error: any) {
            return res.status(500).json({ error: error.messgae });
        }
    }
    
    async verifyEmail(req: Request, res: Response) : Promise<Response> {
        // #swagger.description = 'Verify Email'
        // #swagger.tags = ["User"]
        try {

            const { hash, email } = req.body;
            const userRepository: IUserRepository = new UserRepository();

            const queryData: any = {
                isDelete: false,
                isActive: true,
                emailConfirmed: false,
            }
            const user: any = await userRepository.getUserByEmail(email, queryData);
            if (!user) {
             return res.status(400).json({ message: "Cannot find email" });
            }     

            const emailHash = await md5Encrypt(user.emailCode);
            console.log(emailHash);
            if (hash != emailHash) {
                return res.status(400).json({ message: "Cannot verify please try again" });
            }
            user.emailCode = Math.random().toString(36).substr(2, 5);
            user.emailConfirmed = true;
            console.log(user._id.toString());
            await userRepository.updateDocument(queryData, user);
            //active
            return res.status(200).json({ message: "xác thực mail thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error verify user', error });
        }
    }

    async getProfileUser(req: RequestWithUser, res: Response): Promise<Response> {
        // #swagger.description = 'Get Profile User'
        // #swagger.tags = ["User"]
        try {
            const userRepository: IUserRepository = new UserRepository();
            const queryData: any = {
                isDelete: false,
                isActive: true,
                emailConfirmed: false || true,
            }
            const user:User = req.user;
            const userId : any = user?.getId();
            const userProfile = await userRepository.getUserById(userId, queryData);
            if (!userProfile) {
                return res.status(400).json({ message: "Cannot find user" });
            }
            return res.status(200).json(userProfile);
        } catch (error) {
            return res.status(500).json({ message: 'Error get profile user', error});
        }

    }

    async forgotPassword(req: Request, res: Response): Promise<Response> {
        // #swagger.description = 'Forgot Password'
        // #swagger.tags = ["User"]
        try {
            const email: string = req.body.email;
            const result: any = await ForgotPasswordHandler(email);
            if (result.error != undefined || result.error) {
                return res.status(result.statusCode).json({error: result.error});
            }
            console.log(result);
            return res.status(result.statusCode).json({message: result.message});
        } catch (error: any) {
            return res.status(500).json({error: error.messgae});
        }
    }
    async changePassword(req: Request<any, any, ChangePasswordRequest>, res: Response) {
        // #swagger.description = 'User change password'
        // #swagger.tags = ["User"]
        try {
            const request: any = req;
            const userId  = request.user.userId
            console.log("==============================" + req);
            const { oldPassword, newPassword } = req.body;
            const data: any = {
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
            };
            const result: any = await ChangePasswordHandler(data);
            return res.status(result.statusCode).json( result );
        } catch (error: any) {
            return res.status(500).json({ error: error.mesagge });
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


