import moment from "moment-timezone";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { VerifyForgotPasswordByEmailCodeResponse } from "../Response/VerifyForgotPasswordByEmailCodeResponse";
import { addDuration, encodejwt } from "../../../Common/Helpers/jwtUtils";
import ISessionRepository from "../../../Persistences/IRepositories/ISessionRepository";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { generateTimeStamp } from "../../../Common/Helpers/stringUtils";
const { md5Encrypt } = require("../../../Common/Helpers/passwordUtils");

export async function VerifyForgotPasswordByEmailCodeHandler(data: any): Promise<VerifyForgotPasswordByEmailCodeResponse> {
    const response = new VerifyForgotPasswordByEmailCodeResponse("", 200, {})
    try {
        const repo: IUserRepository = new UserRepository();
        const sessionRepo: ISessionRepository = new SessionRepository();
             const roleQueryData: any = {
                isDelete: false,
                isActive: true,
                emailConfirmed: true
            }
            
        const user:any = await repo.getUserByEmail(data.email, roleQueryData);
        if (user === null) {
            const response = new VerifyForgotPasswordByEmailCodeResponse("Email not existed", 400, {})
            return response;
        }

        const currentTimeStamp:any = await generateTimeStamp();
        const differenceInSecond:any = (currentTimeStamp - data.t);


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
        
        await repo.updateUserById(user._id, user)

        const token = await encodejwt(user);
        const sessionQueryData:any ={
            email: data.email,
            isDelete: false,
            isActive:true
        }
        const session: any = await sessionRepo.findSessionByEmail(sessionQueryData)
        if (session !== null && session.length >= 0) {
            for (const sess of session) {
                await sessionRepo.deleteSession(sess._id);
            }
        }

        const tokenExpiryDate = addDuration(token.expiresIn || "");
        const refreshTokenExpiryDate = addDuration(process.env.REACT_APP_EXPIRE_REFRESH_TOKEN || "");

        sessionRepo.createSession({
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
        const response = new VerifyForgotPasswordByEmailCodeResponse("Server error", 500, {})
        return response;
    }

    return response;

}