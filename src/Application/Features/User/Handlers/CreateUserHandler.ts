import { CreateUserResponse } from './../Response/CreateUserResponse';
import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from '../../../Persistences/IRepositories/IUserRepository';
import IRoleRepository from '../../../Persistences/IRepositories/IRoleRepository';

import {sendMail} from '../../../../Application/Common/Helpers/emailUtils'
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { CoreException } from '../../../Common/Exceptions/CoreException';



export async function CreateUserHandler(data: any): Promise<CreateUserResponse|CoreException> {
  try {
    const userRepository: IUserRepository = new UserRepository();
    const roleRepository: IRoleRepository = new RoleRepository();
    const {email, fullname, password, phoneNumber, username} = data;
    const roleQueryData: any = {
        isDelete: false,
        isActive: true,
    }
    const role: any = await roleRepository.getRoleByName("User", roleQueryData);
    const createUserRoleData: any = {
      email: email,
      fullname: fullname,
      password: password,
      phoneNumber: phoneNumber,
      username: username,
      role_id: role._id
    };
    const result: any = await userRepository.createUser(createUserRoleData);

    const emailHash = await md5Encrypt(result.emailCode);


    const emailData = { 
      email: email,
      fullname: fullname,
      emailCode: emailHash,
    }

    await sendMail(email, "Welcome to Noah-Quiz!", emailData, "verifyEmailTemplate.ejs");


    return new CreateUserResponse("Successful", 200, result);

  } catch (error: any) {
    return new CoreException(500, error.mesagge);
  }
}
