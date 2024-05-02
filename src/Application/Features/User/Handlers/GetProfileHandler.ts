
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { ForgotPasswordResponse } from "../Response/ForgotPasswordResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { GetProfileUserResponse } from "../Response/GetProfileUserRespone";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";

export async function getProfileHandler(userId: string): Promise<GetProfileUserResponse|CoreException> {
    try {
      const userRepository: IUserRepository = new UserRepository();
      const queryData: any = {
          isDelete: false,
          isActive: true,
          emailConfirmed: false || true,
      }
      const userProfile: any = await userRepository.getUserById(userId, queryData);
      if (!userProfile) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
      }
      return new GetProfileUserResponse("Get user profile successful", StatusCodeEnums.OK_200, userProfile);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}