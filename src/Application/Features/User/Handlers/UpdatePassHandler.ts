import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { UpdatePassResponse } from "../Response/UpdatePassResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";


export async function UpdatePassHandler(data: any): Promise<UpdatePassResponse|CoreException> {
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

    if (!user) {
      return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
    }
    let emailConfirmed = user.emailConfirmed;
    if(!emailConfirmed) emailConfirmed = true;
    const updateData = {
      email: email,
      newPassword: newpassword,
      emailConfirmed: emailConfirmed
    };

    const result: any = await userRepository.uploadPass(updateData);

    // Trả về thông báo thành công
    return new UpdatePassResponse("Password updated successfully", StatusCodeEnums.OK_200,result);
  } catch (error: any) {
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}

export default UpdatePassHandler;