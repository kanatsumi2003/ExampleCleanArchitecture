import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { UpdateImageResponse } from "../Response/UpdateImageResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";


export async function UpdateImageHandler(data: any): Promise<UpdateImageResponse | CoreException> {
  try {
    const { email, filename } = data;

    const userRepository: IUserRepository = new UserRepository();
    const queryData: any = {
      isDelete: false,
      isActive: true,
      emailConfirmed: true,
    };
    const user: any = await userRepository.getUserByEmail(email, queryData);

    if (!user) {
      return new CoreException(500, "User not found!");
    }

    const updateData = {
      email: email,
      filename: filename,
    };
    const result: any = await userRepository.uploadImage(updateData);
    const imagePathData = {
      imageUser: result,
    };
    return new UpdateImageResponse("Image updated successfully", 200, imagePathData);
  } catch (error: any) {
    return new CoreException(500, error.mesagge);
  }
}

export default UpdateImageHandler;