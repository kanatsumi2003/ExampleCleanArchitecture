import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { UpdatePassResponse } from "../Response/UpdatePassResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";


export async function UpdatePassHandler(data: any): Promise<UpdatePassResponse|CoreException> {
  const unitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { email, newpassword } = data;

    // Tạo một đối tượng UserRepository
    // const userRepository: IUserRepository = new UserRepository();

    // Sử dụng phương thức getUserByEmail để lấy thông tin người dùng dựa trên email
    const queryData: any = {
      isDelete: false,
      isActive: true,
    };
    const user: any = await unitOfWork.userRepository.getUserByEmail(email, queryData);

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

    const result: any = await unitOfWork.userRepository.uploadPass(updateData, session);
    await unitOfWork.commitTransaction();
    // Trả về thông báo thành công
    return new UpdatePassResponse("Password updated successfully", StatusCodeEnums.OK_200,result);
  } catch (error: any) {
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}

export default UpdatePassHandler;