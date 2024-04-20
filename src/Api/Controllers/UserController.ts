import { CreateUserRequest } from './../../Application/Features/User/Requests/CreateUserRequest';
import { Request, Response, query } from 'express';
import LoginHandler from "../../Application/Features/User/Handlers/LoginHandler";
import { LoginRequest } from "../../Application/Features/User/Requests/LoginRequest";
import { CreateUserHandler } from '../../Application/Features/User/Handlers/CreateUserHandler';
import {ChangePasswordRequest} from '../../Application/Features/User/Requests/ChangePasswordRequest'
import UserRepository from '../../Infrastructure/Persistences/Respositories/UserRepository';
import {comparePassword} from '../../Application/Common/Helpers/passwordUtils';
import SessionRepository from "../../Infrastructure/Persistences/Respositories/SessionRepository";
const changePasswordHandler = require ('../../Application/Features/User/Handlers/ChangePasswordHandler')
const sessionRepository = new SessionRepository();
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

   /* async  logoutSessions(userId, req) {
        const user = await changePasswordHandler.getUserById(userId);
        if (!user) {
            throw new Error("Không tìm thấy user");
        }
    
        // Lấy Device ID và IP Address từ request
        const deviceId = req.headers['user-agent'] || 'Unknown Device';
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
        // Tìm và xóa các session liên quan
        const sessions = await sessionRepository.findSessionByEmailAndIP({ email: user.email, ipAddress, deviceId });
        if (sessions && sessions.length > 0) {
            for (const session of sessions) {
                await sessionRepository.deleteSession(session._id); // Xóa từng session
            }
        }
    }
    
    async  changePassword(req: Request<any, any, ChangePasswordRequest>, res: Response): Promise<Response> {
        try {
            const { oldPassword, newPassword } = req.body;

            const data: any = {
                oldPassword: oldPassword,
                newPassword: newPassword
            };
            const result: any = await changePasswordHandler(data);
            if(result.error != undefined || result.error) {
                return res.status(result.statusCode).json({ error: result.error })
            };

            const userId = req.user.userId; // Giả sử 'req.user' đã được set bởi middleware xác thực JWT
            const user = await changePasswordHandler.getUserById(userId);
            if (user == null) {
                return res.status(404).json({ message: "Không tìm thấy user" });
            }
            // So sánh mật k
            const isMatch = await comparePassword(oldPassword, user.password);
    
            if (!isMatch) {
                return res.status(401).json({ message: "Password cũ không đúng" });
            }
            // Băm mật khẩu mới
            // const hashedPassword = await hashPassword(newPassword);
            // Cập nhật mật khẩu trong cơ sở dữ liệu
            console.log("updateResult ");
            const updateResult = await changePasswordHandler.changePasswordUser(userId, oldPassword, newPassword);
            console.log("updateResult ", updateResult);
            if (!updateResult) {
                throw new Error("Không thể cập nhật mật khẩu");
            }
            // xóa session
            if (updateResult) {
                // Đăng xuất các session sau khi đổi mật khẩu thành công
                //await this.logoutSessions(userId, req);
                res.status(200).json({ message: "Đổi mật khẩu và đăng xuất thành công!" });
            } else {
                throw new Error("Không thể cập nhật mật khẩu");
            }

            
        } catch (error) {
            console.error(error);
            res.status(500).send("Lỗi máy chủ");
        }
        return res.status(500);
    }*/
}


