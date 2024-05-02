import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { LoginResponse } from "../Response/LoginResponse";
import { LoginRequest } from "../Requests/LoginRequest";
import { UserWithBase } from "../../../../Domain/Entities/UserEntites";
import { addDuration, encodejwt } from "../../../Common/Helpers/jwtUtils";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { CreateSessionHandler } from "../../Session/Handlers/CreateSessionHandler";
const { comparePassword } = require("../../../Common/Helpers/passwordUtils");
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import ISessionRepository from "../../../Persistences/IRepositories/ISessionRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";

import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";

async function LoginHandler(data: any): Promise<LoginResponse|CoreException> {
    try {
        const userRepository: IUserRepository = new UserRepository();
        const sessionRepository: ISessionRepository = new SessionRepository();
        const { deviceId, ipAddress, email, password } = data;

        const queryData: any = {
            isDelete: false,
            isActive: true,
            emailConfirmed: true,
        }
        const user: any = await userRepository.getUserByEmail(email, queryData);
        if (!user) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return new CoreException(StatusCodeEnums.Unauthorized_401, "Password is not match!")
        }

        const token = await encodejwt(user);

        const queryDataSession: any = {
            email: email.toLowerCase(),
            ipAddress: ipAddress,
            deviceId: deviceId,
            isDelete: true
        }

        const session: any = await sessionRepository.findSessionByEmailAndIP(queryDataSession);
        if (session != null) {
                await sessionRepository.deleteSession(session._id); 
        } 

        const tokenExpiryDate = addDuration(token.expiresIn || "");
        const refreshTokenExpiryDate = addDuration(process.env.REACT_APP_EXPIRE_REFRESH_TOKEN || "");

        const dataForCreateSession: any = {
            user: user,
            token: token,
            deviceId: deviceId,
            ipAddress: ipAddress,
            refreshTokenExpiryDate: refreshTokenExpiryDate,
            tokenExpiryDate: tokenExpiryDate,
        }

        await CreateSessionHandler(dataForCreateSession);

        const dataTokenResponse = {
            accessToken: token.token,
            refreshToken: token.refreshToken,
            expireIn: token.expiresIn || ""
        }

        const loginResponse = new LoginResponse("Success", StatusCodeEnums.OK_200, dataTokenResponse);

        return loginResponse

    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}

export default LoginHandler;