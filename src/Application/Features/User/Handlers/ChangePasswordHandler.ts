import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { ChangePasswordResponse } from "../../User/Response/ChangePasswordResponse";
import { comparePassword } from "../../../Common/Helpers/passwordUtils";


export async function ChangePasswordHandler(data: any): Promise<ChangePasswordResponse>{
   
    try {
        const userRepository = new UserRepository();
        const {userId, oldPassword, newPassword} = data;
        const queryData = {
            isDelete: false,
            isActive: true,
        }
        const user = await userRepository.getUserById(userId, queryData);
        if (user == null) {
            throw new Error("Không tìm thấy user");
        }

          // So sánh mật k
        const isMatch = await comparePassword(oldPassword, user.getPassword());
        if (!isMatch) {
            throw new Error( "Password cũ không đúng");
        }

        // Băm mật khẩu mới
        // const hashedPassword = await hashPassword(newPassword);
        // Cập nhật mật khẩu trong cơ sở dữ liệu
        const updateData = {
            userId: userId,
            oldPassword: oldPassword,
            newPassword: newPassword
          };
        const result: any = await userRepository.changePasswordUser(updateData);

        // xóa session
        if (result) {
            return new ChangePasswordResponse("Đổi mật khẩu và đăng xuất thành công!", 200, result);
        } else {
            throw new Error("Không thể cập nhật mật khẩu");
        }

        
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default ChangePasswordHandler;