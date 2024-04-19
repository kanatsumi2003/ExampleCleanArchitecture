import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { UpdatePassResponse } from "../Response/UpdatePassResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";


async function UpdatePassHandler(data: any): Promise<UpdatePassResponse> {
  try {
    const { email, newpassword } = data;

    // Tạo một đối tượng UserRepository
    const userRepository: IUserRepository = new UserRepository();

    // Sử dụng phương thức getUserByEmail để lấy thông tin người dùng dựa trên email
    const queryData: any = {
      isDelete: false,
      isActive: true,
    };
    const user: any = await userRepository.getUserByEmail(email, queryData);

    // Kiểm tra xem người dùng có tồn tại hay không
    if (!user) {
      throw new Error("User not found");
    }
    let emailConfirmed = user.emailConfirmed;
    if(!emailConfirmed) emailConfirmed = true;
    const updateData = {
      email: email,
      newPassword: newpassword,
      emailConfirmed: emailConfirmed
    };
    // Gọi phương thức uploadPass để cập nhật mật khẩu
    const result: any = await userRepository.uploadPass(updateData);

    // Trả về thông báo thành công
    return new UpdatePassResponse("Password updated successfully", 200,result);
  } catch (error: any) {
    // Nếu có lỗi xảy ra, ném lỗi và thông báo lỗi
    throw new Error(error.message);
  }
}

export default UpdatePassHandler;