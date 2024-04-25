import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { UpdateImageResponse } from "../Response/UpdateImageResponse";
<<<<<<< HEAD
=======
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
>>>>>>> duc
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";


export async function UpdateImageHandler(data: any): Promise<UpdateImageResponse> {
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
      throw new Error("User not found");
    }
   
    const updateData = {
      email: email,
      filename: filename,
    };
    const result: any = await userRepository.uploadImage(updateData);
<<<<<<< HEAD
    return new UpdateImageResponse("Image updated successfully", StatusCodeEnums.OK_200,result);
=======
    const imagePathData = {
      imageUser: result,
    };
    return new UpdateImageResponse("Image updated successfully", StatusCodeEnums.OK_200, imagePathData);
>>>>>>> duc
  } catch (error: any) {
   
    throw new Error(error.message);
  }
}

export default UpdateImageHandler;