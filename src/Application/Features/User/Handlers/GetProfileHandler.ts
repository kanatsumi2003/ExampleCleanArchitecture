
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { ForgotPasswordResponse } from "../Response/ForgotPasswordResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { GetProfileUserResponse } from "../Response/GetProfileUserRespone";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";

export async function getProfileHandler(userId: string): Promise<GetProfileUserResponse|CoreException> {
    try {
      const unitOfWork = new UnitOfWork();
      await unitOfWork.startTransaction();
     
      const queryData: any = {
          userId: userId,
          isDelete: false,
          isActive: true,
          emailConfirmed: false || true,
      }
      const userProfile: any = await unitOfWork.userRepository.getUserById(queryData);
      if (!userProfile) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
      }
      return new GetProfileUserResponse("Get user profile successful", StatusCodeEnums.OK_200, userProfile);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}