import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { ChangePasswordResponse } from "../../User/Response/ChangePasswordResponse";
import { comparePassword } from "../../../Common/Helpers/passwordUtils";
import ISessionRepository from "../../../Persistences/IRepositories/ISessionRepository";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { validationUtils } from '../../../Common/Helpers/validationUtils';
import { CreateUserResponse } from './../Response/CreateUserResponse';
export async function ChangePasswordHandler(data: any): Promise<ChangePasswordResponse|CoreException>{
   
    try {
        const sessionRepository: ISessionRepository = new SessionRepository();
        const userRepository: IUserRepository = new UserRepository();
        const {userId, oldpassword, newpassword} = data;
        const userQueryData = {
            isDelete: false,
            isActive: true,
        }

        const passwordError = validationUtils.validatePassword(newpassword);

        if (passwordError){
            return new CreateUserResponse("Validation failed", 400, {}, "New " + passwordError);
        }
        
        const user: any = await userRepository.getUserById(userId, userQueryData);
        if (user == null) {
            return new CoreException(500 , "User not found!");
        }

          // So sánh mật k
        const isMatch = await comparePassword(oldpassword, user.password);
        if (!isMatch) {
            return new CoreException(401, "Old password is incorrect!");
        }

        // Băm mật khẩu mới
        // const hashedPassword = await hashPassword(newPassword);
        // Cập nhật mật khẩu trong cơ sở dữ liệu
          const changePasswordUserQueryData = {
            userId: userId,
            newPassword: newpassword,
            isActive: true,
            isDelete: false,
          };
        const result: any = await userRepository.changePasswordUser(changePasswordUserQueryData);
        // xóa session
        const sessionQueryData:any ={
          email: user.email,
          isDelete: false,
          isActive:true
      }
        const session: any = await sessionRepository.findSessionByEmail(sessionQueryData)
        if (session !== null && session.length >= 0) {
            for (const sess of session) {
                await sessionRepository.deleteSession(sess._id);
            }
        }
        return new ChangePasswordResponse("Đổi mật khẩu và đăng xuất thành công!", 200, result);
    } catch (error: any) {
        return new CoreException(500, error.mesagge);
    }
}

export default ChangePasswordHandler;