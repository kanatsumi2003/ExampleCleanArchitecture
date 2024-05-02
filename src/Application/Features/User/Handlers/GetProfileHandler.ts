
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { ForgotPasswordResponse } from "../Response/ForgotPasswordResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { GetProfileUserResponse } from "../Response/GetProfileUserRespone";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";

export async function getProfileHandler(userId: string): Promise<GetProfileUserResponse|CoreException> {
    try {
      const unitOfWork = new UnitOfWork();
      await unitOfWork.startTransaction();
      const queryData: any = {
          isDelete: false,
          isActive: true,
          emailConfirmed: false || true,
      }
      const userProfile: any = await unitOfWork.userRepository.getUserById(userId, queryData);
      if (!userProfile) {
        return new CoreException(500, "User not found!");
      }
      return new GetProfileUserResponse("Get user profile successful", 200, userProfile);
    } catch (error: any) {
        return new CoreException(500, error.mesagge);
    }
}