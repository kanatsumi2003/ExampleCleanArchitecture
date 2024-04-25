import { VerifyEmailResponse } from './../Response/VerifyEmailResponse';
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { md5Encrypt } from "../../../Common/Helpers/passwordUtils";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';

export async function verifyEmailHandler (data : any) : Promise<VerifyEmailResponse> {
  try {
    const {email, hash} = data
    const userRepository: IUserRepository = new UserRepository();

    const queryData: any = {
        isDelete: false,
        isActive: true,
        emailConfirmed: false,
    }
    const user: any = await userRepository.getUserByEmail(email, queryData);
    if (!user) {
      throw new Error("User with email" + email + "doesn't exist!");
    }     

    const emailHash = await md5Encrypt(user.emailCode);
    console.log(emailHash);
    if (hash != emailHash) {
      throw new Error("Cannot verify please try again");
    }

    user.emailCode = Math.random().toString(36).substr(2, 5);
    user.emailConfirmed = true;
    console.log(user._id.toString());
    const result = await userRepository.updateDocument(queryData, user);
    return new VerifyEmailResponse("Verify email successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    throw new Error("Error at ForgotPasswordHandler:" + error.message);
  }
}