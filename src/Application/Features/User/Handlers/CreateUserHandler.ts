import { CreateUserResponse } from './../Response/CreateUserResponse';
import {sendMail} from '../../../../Application/Common/Helpers/emailUtils';
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';



export async function CreateUserHandler(data: any): Promise<CreateUserResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const {email, fullname, password, phoneNumber, username} = data;
    const roleQueryData: any = {
        isDelete: false,
        isActive: true,
    }

    // Validate fields
    // const emailError = validationUtils.validateEmail(email);
    // const fullnameError = validationUtils.validateName(fullname);
    // const passwordError = validationUtils.validatePassword(password);
    // const phoneNumberError = validationUtils.validatePhoneNumber(phoneNumber);
    // const usernameError = validationUtils.validateUsername(username);

    // if (emailError || fullnameError || passwordError || phoneNumberError || usernameError) {
    //   // Construct error message with appropriate separators
    //   let errorMessage = '';
    //   if (emailError) errorMessage += emailError + '; ';
    //   if (fullnameError) errorMessage += fullnameError + '; ';
    //   if (passwordError) errorMessage += passwordError + '; ';
    //   if (phoneNumberError) errorMessage += phoneNumberError + '; ';
    //   if (usernameError) errorMessage += usernameError + '; ';
      
    //   // Remove trailing ';' and return error response
    //   errorMessage = errorMessage.trim().replace(/;+$/, '');
    //   return new CreateUserResponse("Validation failed", 400, {}, errorMessage);
    // }


        
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
  
    return new CreateUserResponse("Successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
