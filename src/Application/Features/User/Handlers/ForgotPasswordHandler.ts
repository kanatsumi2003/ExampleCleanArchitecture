import moment from "moment";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { ForgotPasswordResponse } from "../Response/ForgotPasswordResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
const { md5Encrypt } = require("../../../Common/Helpers/passwordUtils");
const { sendMail } = require("../../../Common/Helpers/emailUtils")

export async function ForgotPasswordHandler(email: string): Promise<ForgotPasswordResponse|CoreException> {
    try {
        const userRepository: IUserRepository = new UserRepository();
        const queryData: any = {
            isDelete: false,
            isActive: true,
            emailConfirmed: true,
        }

        const user: any = await userRepository.getUserByEmail(email, queryData);
        if (user == null) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, "User Not Found!");
        }

        user.emailCode = await md5Encrypt(user.emailCode);
        user.password = moment().valueOf();
        const emailData: any = {
            fullname: user.fullname,
            email: user.email,
            emailCode: user.emailCode,
            password: user.password,
        }
        const sendMailResponse: string = await sendMail(user.email, "Welcome to NoahQuiz", emailData, "forgotPasswordEmailTemplate.ejs");

        return new ForgotPasswordResponse("Sent Mail Successfully", StatusCodeEnums.Created_201, sendMailResponse)
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}