import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { ChangePasswordResponse } from "../../User/Response/ChangePasswordResponse";
import { comparePassword } from "../../../Common/Helpers/passwordUtils";


export async function ChangePasswordHandler(data: any): Promise<ChangePasswordResponse>{
   
    try {
        const userRepository: IUserRepository = new UserRepository();
        const {userId, oldpassword, newpassword} = data;
        const userQueryData = {
            isDelete: false,
            isActive: true,
        }
        const user: any = await userRepository.getUserById(userId, userQueryData);
        if (user == null) {
            throw new Error("Không tìm thấy user");
        }

          // So sánh mật k
        const isMatch = await comparePassword(oldpassword, user.password);
        if (!isMatch) {
            throw new Error( "Password cũ không đúng");
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
        return new ChangePasswordResponse("Đổi mật khẩu và đăng xuất thành công!", 200, result);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default ChangePasswordHandler;