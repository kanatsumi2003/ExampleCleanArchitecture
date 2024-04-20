import { UpdatePassRequest } from "./../../Application/Features/User/Requests/UpdatePassRequest";
import { CreateUserRequest } from "./../../Application/Features/User/Requests/CreateUserRequest";
import { Request, Response, query } from "express";
import LoginHandler from "../../Application/Features/User/Handlers/LoginHandler";
import { LoginRequest } from "../../Application/Features/User/Requests/LoginRequest";
import { UpdateImageRequest } from "../../Application/Features/User/Requests/UpdateImageRequest";
import { CreateUserHandler } from "../../Application/Features/User/Handlers/CreateUserHandler";
import UpdatePassHandler from "../../Application/Features/User/Handlers/UpdatePassHandler";
import UserRepository from "../../Infrastructure/Persistences/Respositories/UserRepository";
import UpdateImageHandler from "../../Application/Features/User/Handlers/UpdateImageHandler";
import { ForgotPasswordHandler } from "../../Application/Features/User/Handlers/ForgotPasswordHandler";
import { ChangePasswordRequest } from "../../Application/Features/User/Requests/ChangePasswordRequest";
import { ChangePasswordHandler } from "../../Application/Features/User/Handlers/ChangePasswordHandler";
import { VerifyForgotPasswordByEmailCodeRequest } from "../../Application/Features/User/Requests/VerifyForgotPasswordByEmailCodeRequest";
import { VerifyForgotPasswordByEmailCodeHandler } from "../../Application/Features/User/Handlers/VerifyForgotPasswordByEmailCodeHandler";
export default class UserController {
  // private userRepository: UserRepository;
  // constructor() {
  //     this.userRepository = new UserRepository();
  // }
  async login(
    req: Request<any, any, LoginRequest>,
    res: Response
  ): Promise<Response> {
    // #swagger.description = 'Login with email and password'
    // #swagger.tags = ["User"]
    try {
      const { email, password } = req.body;
      const deviceId = req.headers["user-agent"] || "Unknown Device";
      const ipAddress =
        req.headers["x-forwarded-for"] ||
        (req as any).socket?.remoteAddress ||
        "Unknown IP";
      const data = { deviceId, ipAddress, email, password };
      const result: any = await LoginHandler(data);

      if (result.error != undefined || result.error) {
        return res.status(result.statusCode).json({ error: result.error });
      }
      return res.status(result.statusCode).json({ data: result });
    } catch (error: any) {
      console.error("Login failed:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async createUser(
    req: Request<any, any, CreateUserRequest>,
    res: Response
  ): Promise<Response> {
    // #swagger.description = 'get role by Id'
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
      if (result.error != undefined || result.error) {
        return res.status(result.statusCode).json({ error: result.error });
      }

      return res.status(result.statusCode).json({ data: result });
    } catch (error: any) {
      return res.status(500).json({ error: error.messgae });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<Response> {
    // #swagger.description = 'Forgot old password'
    // #swagger.tags = ["User"]
    try {
      const email: string = req.body.email;
      const result: any = await ForgotPasswordHandler(email);
      if (result.error != undefined || result.error) {
        return res.status(result.statusCode).json({ error: result.error });
      }
      console.log(result);
      return res.status(result.statusCode).json({ message: result.message });
    } catch (error: any) {
      return res.status(500).json({ error: error.messgae });
    }
  }

  async updatePassword(
    req: Request<any, any, UpdatePassRequest>,
    res: Response
  ): Promise<Response> {
    // #swagger.description = 'Update new Password'
    // #swagger.tags = ["User"]
    try {
      const { email, newpassword } = req.body;

      const data = { email, newpassword };
      const result: any = await UpdatePassHandler(data);

      return res.status(result.statusCode).json({ data: result });
    } catch (error: any) {
      console.error("Update Password failed:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async updateImage(
    req: Request<any, any, UpdateImageRequest>,
    res: Response
  ): Promise<Response> {
    // #swagger.description = 'Update Password'
    // #swagger.tags = ["User"]
    /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['filename'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
        },
        #swagger.parameters['email'] = {
    in: 'formData',
    type: 'string',
    required: 'true',
    description: 'Email of the user'
}
    } */
    try {
      const { email } = req.body;
      if (!(req as any).file) {
        return res.status(400).json({ error: "No image uploaded" });
      }
      const filename = (req as any).file.filename;
      const fullUploadFolderPath = `uploads${req.url}/${filename}`;
      const data = {
        email: email,
        filename: fullUploadFolderPath,
      };
      const result: any = await UpdateImageHandler(data);

      return res.status(result.statusCode).json({ data: result });
    } catch (error: any) {
      console.error("Update Image failed:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  async verifyForgotPasswordByEmailCode(
    req: Request<any, any, VerifyForgotPasswordByEmailCodeRequest>,
    res: Response
  ) {
    // #swagger.description = 'Verify forgot password'
    // #swagger.tags = ["User"]
    try {
      const { hash, email, timeStamp } = req.body;
      const data: any = {
        hash: hash,
        email: email,
        timeStamp: timeStamp,
      };
      const result: any = await VerifyForgotPasswordByEmailCodeHandler(data);
      return res.status(result.statusCode).json(result);
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
