import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { UpdateImageResponse } from "../Response/UpdateImageResponse";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";


async function UpdateImageHandler(data: any): Promise<UpdateImageResponse> {
  try {
    const { email, imageFileName  } = data;
    
    const userRepository = new UserRepository();
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
      imageUser: imageFileName,
    };
    const result: any = await userRepository.uploadImage(updateData);
    return new UpdateImageResponse("Image updated successfully", StatusCodeEnums.OK_200,result);
  } catch (error: any) {
   
    throw new Error(error.message);
  }
}

export default UpdateImageHandler;