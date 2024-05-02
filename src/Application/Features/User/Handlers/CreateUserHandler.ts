import { CreateUserResponse } from './../Response/CreateUserResponse';
import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from '../../../Persistences/IRepositories/IUserRepository';
import IRoleRepository from '../../../Persistences/IRepositories/IRoleRepository';

import {sendMail} from '../../../../Application/Common/Helpers/emailUtils'
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';



export async function CreateUserHandler(data: any): Promise<CreateUserResponse|CoreException> {
  const unitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const {email, fullname, password, phoneNumber, username} = data;
    const roleQueryData: any = {
        isDelete: false,
        isActive: true,
    }
    const role: any = await unitOfWork.roleRepository.getRoleByName("User", roleQueryData);
    const createUserRoleData: any = {
      email: email,
      fullname: fullname,
      password: password,
      phoneNumber: phoneNumber,
      username: username,
      role_id: role._id
    };
    const result: any = await unitOfWork.userRepository.createUser(createUserRoleData, session);
    const emailHash = await md5Encrypt(result.emailCode);


    const emailData = { 
      email: email,
      fullname: fullname,
      emailCode: emailHash,
    }
    await unitOfWork.commitTransaction();
    await sendMail(email, "Welcome to Noah-Quiz!", emailData, "verifyEmailTemplate.ejs");
  
    return new CreateUserResponse("Successful", 200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(500, error.mesagge);
  }
}
