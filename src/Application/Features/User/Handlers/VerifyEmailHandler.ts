import { VerifyEmailResponse } from './../Response/VerifyEmailResponse';
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { md5Encrypt } from "../../../Common/Helpers/passwordUtils";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';

export async function verifyEmailHandler (data : any) : Promise<VerifyEmailResponse|CoreException> {
  const unitOfWork = new UnitOfWork();
  try {
    const {email, hash} = data
    // const userRepository: IUserRepository = new UserRepository();


    const queryData: any = {
        isDelete: false,
        isActive: true,
        emailConfirmed: false,
    }
    const user: any = await unitOfWork.userRepository.getUserByEmail(email, queryData);
    if (!user) {
      return new CoreException(500, "User not found!");
    }     

    const emailHash = await md5Encrypt(user.emailCode);
    console.log(emailHash);
    if (hash != emailHash) {
      return new CoreException(500, "Can not verify");
    }

    user.emailCode = Math.random().toString(36).substr(2, 5);
    user.emailConfirmed = true;
    console.log(user._id.toString());
    // const result = await userRepository.updateDocument(queryData, user);
    // return new VerifyEmailResponse("Verify email successful", 200, result);
    return new VerifyEmailResponse("Verify email successful", 200, "");
  } catch (error: any) {
    return new CoreException(500, error.mesagge);
  }
}