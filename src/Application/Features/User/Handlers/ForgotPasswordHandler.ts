import moment from "moment";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { ForgotPasswordResponse } from "../Response/ForgotPasswordResponse";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
const { md5Encrypt } = require("../../../Common/Helpers/passwordUtils");
const { sendMail } = require("../../../Common/Helpers/emailUtils")

export async function ForgotPasswordHandler(email: string): Promise<ForgotPasswordResponse> {
    try {
        const userRepository: IUserRepository = new UserRepository();
        const queryData: any = {
            isDelete: false,
            isActive: true,
            emailConfirmed: true,
        }

        const user: any = await userRepository.getUserByEmail(email, queryData);
        if (!user) {
            throw new Error("User with email" + email + "doesn't exist!");
        }

        user.emailCode = await md5Encrypt(user.emailCode);
        user.password = moment().valueOf();
        const sendMailResponse: string = await sendMail(user.email, "Welcome to NoahQuiz", user, "forgotPasswordEmailTemplate.ejs");

        return new ForgotPasswordResponse("Sent Mail Successfully", 201, sendMailResponse)
    } catch (error: any) {
        throw new Error("Error at ForgotPasswordHandler:" + error.message);
    }
}