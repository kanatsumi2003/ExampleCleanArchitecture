import moment from "moment-timezone";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { VerifyForgotPasswordByEmailCodeResponse } from "../Response/VerifyForgotPasswordByEmailCodeResponse";
import { addDuration, encodejwt } from "../../../Common/Helpers/jwtUtils";
import ISessionRepository from "../../../Persistences/IRepositories/ISessionRepository";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { generateTimeStamp } from "../../../Common/Helpers/stringUtils";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
const { md5Encrypt } = require("../../../Common/Helpers/passwordUtils");

export async function VerifyForgotPasswordByEmailCodeHandler(data: any): Promise<VerifyForgotPasswordByEmailCodeResponse> {
    const response = new VerifyForgotPasswordByEmailCodeResponse("", StatusCodeEnums.InternalServerError_500, {})
    try {
        const userRepository: IUserRepository = new UserRepository();
        const sessionRepository: ISessionRepository = new SessionRepository();
             const roleQueryData: any = {
                isDelete: false,
                isActive: true,
                emailConfirmed: true
            }
            
        const user:any = await userRepository.getUserByEmail(data.email, roleQueryData);
        if (user === null) {
            const response = new VerifyForgotPasswordByEmailCodeResponse("Email not existed",  StatusCodeEnums.BadRequest_400, {})
            return response;
        }

        const currentTimeStamp:any = await generateTimeStamp();
        const differenceInSecond:any = (currentTimeStamp - data.timeStamp);


        if (differenceInSecond > 1800) {
            const response = new VerifyForgotPasswordByEmailCodeResponse("Email timeout!",  StatusCodeEnums.BadRequest_400, {})
            return response;
        }

        const emailHash = await md5Encrypt(user.emailCode)
        if (data.hash !== emailHash) {
            const response = new VerifyForgotPasswordByEmailCodeResponse("Cannot verify please try again", StatusCodeEnums.BadRequest_400, {})
            return response;
        }
        user.emailCode = Math.random().toString(36).substring(2, 5);
        
        await userRepository.updateUserById(user._id, user)

        const token = await encodejwt(user);
        const sessionQueryData:any ={
            email: data.email,
            isDelete: false,
            isActive:true
        }
        const session: any = await sessionRepository.findSessionByEmail(sessionQueryData)
        if (session !== null && session.length >= 0) {
            for (const sess of session) {
                await sessionRepository.deleteSession(sess._id);
            }
        }

        const tokenExpiryDate = addDuration(token.expiresIn || "");
        const refreshTokenExpiryDate = addDuration(process.env.REACT_APP_EXPIRE_REFRESH_TOKEN || "");

        sessionRepository.createSession({
            userId: user._id,
            email: user.email,
            name: user.name || "unknown",
            username: user.username.toLowerCase(),
            jwttoken: token.token,
            refreshToken: token.refreshToken,
            ExpireRefreshToken: refreshTokenExpiryDate,
            expireDate: tokenExpiryDate,
        })

    } catch (error) {
        const response = new VerifyForgotPasswordByEmailCodeResponse("Server error", StatusCodeEnums.InternalServerError_500, {})
        return response;
    }

    return response;

}