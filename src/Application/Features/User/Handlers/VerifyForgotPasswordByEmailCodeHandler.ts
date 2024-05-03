import moment from "moment-timezone";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { VerifyForgotPasswordByEmailCodeResponse } from "../Response/VerifyForgotPasswordByEmailCodeResponse";
import { addDuration, encodejwt } from "../../../Common/Helpers/jwtUtils";
import ISessionRepository from "../../../Persistences/IRepositories/ISessionRepository";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { generateTimeStamp } from "../../../Common/Helpers/stringUtils";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
const { md5Encrypt } = require("../../../Common/Helpers/passwordUtils");

export async function VerifyForgotPasswordByEmailCodeHandler(data: any): Promise<VerifyForgotPasswordByEmailCodeResponse> {
    const response = new VerifyForgotPasswordByEmailCodeResponse("", 200, {})
    const unitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
             const roleQueryData: any = {
                isDelete: false,
                isActive: true,
                emailConfirmed: true
            }
            
        const user:any = await unitOfWork.userRepository.getUserByEmail(data.email, roleQueryData);
        if (user === null) {
            const response = new VerifyForgotPasswordByEmailCodeResponse("Email not existed", 400, {})
            return response;
        }

        const currentTimeStamp:any = await generateTimeStamp();
        const differenceInSecond:any = (currentTimeStamp - data.timeStamp);


        if (differenceInSecond > 1800) {
            const response = new VerifyForgotPasswordByEmailCodeResponse("Email timeout!", 400, {})
            return response;
        }

        const emailHash = await md5Encrypt(user.emailCode)
        if (data.hash !== emailHash) {
            const response = new VerifyForgotPasswordByEmailCodeResponse("Cannot verify please try again", 400, {})
            return response;
        }
        user.emailCode = Math.random().toString(36).substring(2, 5);
        
        await unitOfWork.userRepository.updateUserById(user._id, user)

        const token = await encodejwt(user);
        const sessionQueryData:any ={
            email: data.email,
            isDelete: false,
            isActive:true
        }
        const sessionUser: any = await unitOfWork.sessionRepository.findSessionByEmail(sessionQueryData)
        if (sessionUser !== null && sessionUser.length >= 0) {
            for (const sess of sessionUser) {
                await unitOfWork.sessionRepository.deleteSession(sess._id, session);
            }
        }

        const tokenExpiryDate = addDuration(token.expiresIn || "");
        const refreshTokenExpiryDate = addDuration(process.env.REACT_APP_EXPIRE_REFRESH_TOKEN || "");

        unitOfWork.sessionRepository.createSession({
            userId: user._id,
            email: user.email,
            name: user.name || "unknown",
            username: user.username.toLowerCase(),
            jwttoken: token.token,
            refreshToken: token.refreshToken,
            ExpireRefreshToken: refreshTokenExpiryDate,
            expireDate: tokenExpiryDate,
        }, session)
        await unitOfWork.commitTransaction();
    } catch (error) {
        await unitOfWork.abortTransaction();
        const response = new VerifyForgotPasswordByEmailCodeResponse("Server error", 500, {})
        return response;
    }

    return response;

}