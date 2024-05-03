import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { ChangePasswordResponse } from "../../User/Response/ChangePasswordResponse";
import { comparePassword } from "../../../Common/Helpers/passwordUtils";
import ISessionRepository from "../../../Persistences/IRepositories/ISessionRepository";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";


export async function ChangePasswordHandler(data: any): Promise<ChangePasswordResponse|CoreException>{
    const unitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
      
        // const sessionRepository: ISessionRepository = new SessionRepository();
        // const userRepository: IUserRepository = new UserRepository();
        const {userId, oldpassword, newpassword} = data;
        const userQueryData: any = {
            userId: userId,
            isDelete: false,
            isActive: true,
        }
        // const user: any = await userRepository.getUserById(userId, userQueryData);
         const user: any = await unitOfWork.userRepository.getUserById(userQueryData);
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
        // const result: any = await userRepository.changePasswordUser(changePasswordUserQueryData);

        const result: any = await unitOfWork.userRepository.changePasswordUser(changePasswordUserQueryData, session);

        // xóa session
        const sessionQueryData:any ={
          email: user.email,
          isDelete: false,
          isActive:true
      }
        const sessionUser: any = await unitOfWork.sessionRepository.findSessionByEmail(sessionQueryData)
        if (sessionUser !== null && sessionUser.length >= 0) {
            for (const sess of sessionUser) {
                await unitOfWork.sessionRepository.deleteSession(sess._id);
            }
        }
        await unitOfWork.commitTransaction();
        return new ChangePasswordResponse("Change password successfully!", 200, result);
    } catch (error: any) {
        return new CoreException(500, error.mesagge);
    }
}

export default ChangePasswordHandler;