import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { UpdateImageResponse } from "../Response/UpdateImageResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";


export async function UpdateImageHandler(data: any): Promise<UpdateImageResponse | CoreException> {
  const unitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { email, filename } = data;

    // const userRepository: IUserRepository = new UserRepository();
    const queryData: any = {
      isDelete: false,
      isActive: true,
      emailConfirmed: true,
    };
    const user: any = await unitOfWork.userRepository.getUserByEmail(email, queryData);

    if (!user) {
      return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
    }

    const updateData = {
      email: email,
      filename: filename,
    };
    const result: any = await unitOfWork.userRepository.uploadImage(updateData, session);

    return new UpdateImageResponse("Image updated successfully", StatusCodeEnums.OK_200,result);
  } catch (error: any) {
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}

export default UpdateImageHandler;