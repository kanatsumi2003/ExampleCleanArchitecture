import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { UpdatePassResponse } from "../Response/UpdatePassResponse";


async function UpdatePassHandler(data: any): Promise<UpdatePassResponse> {
  try {
    const { email, newpassword } = data;

    // Tạo một đối tượng UserRepository
    const userRepository = new UserRepository();

    // Sử dụng phương thức getUserByEmail để lấy thông tin người dùng dựa trên email
    const queryData: any = {
      isDelete: false,
      isActive: true,
    };
    const user: any = await userRepository.getUserByEmail(email, queryData);

    if (!user) {
      throw new Error("User not found");
    }
    const updateData = {
      email: email,
      newPassword: newpassword,
    };

    const result: any = await userRepository.uploadPass(updateData);

    // Trả về thông báo thành công
    return new UpdatePassResponse("Password updated successfully", 200,result);
  } catch (error: any) {
   
    throw new Error(error.message);
  }
}

export default UpdatePassHandler;