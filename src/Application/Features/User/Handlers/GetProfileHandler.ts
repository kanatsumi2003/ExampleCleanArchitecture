
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { ForgotPasswordResponse } from "../Response/ForgotPasswordResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { GetProfileUserResponse } from "../Response/GetProfileUserRespone";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";

export async function getProfileHandler(userId: string): Promise<GetProfileUserResponse> {
    try {
      const userRepository: IUserRepository = new UserRepository();
      const queryData: any = {
          isDelete: false,
          isActive: true,
          emailConfirmed: false || true,
      }
      const userProfile: any = await userRepository.getUserById(userId, queryData);
      if (!userProfile) {
        throw new Error("User with email can't get profile");
      }
      return new GetProfileUserResponse("Get user profile successful", StatusCodeEnums.OK_200, userProfile);
    } catch (error: any) {
        throw new Error("Error at ForgotPasswordHandler:" + error.message);
    }
}