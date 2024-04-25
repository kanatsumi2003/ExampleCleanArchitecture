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
    import { validationUtils } from '../../../Common/Helpers/validationUtils';
    async function LoginHandler(data: any): Promise<LoginResponse> {
        try {
            const userRepository: IUserRepository = new UserRepository();
            const sessionRepository: ISessionRepository = new SessionRepository();
            const { deviceId, ipAddress, email, password } = data;

            const queryData: any = {
                isDelete: false,
                isActive: true,
                emailConfirmed: true,
            }

            const emailError = validationUtils.validateEmail(email);
            const passwordError = validationUtils.validatePassword(password);
            if (emailError ||  passwordError) {
                // Construct error message with appropriate separators
                let errorMessage = '';
                if (emailError) errorMessage += emailError + '; ';
                if (passwordError) errorMessage += passwordError + '; '
                errorMessage = errorMessage.trim().replace(/;+$/, '');
                return new LoginResponse("Validation failed", 400, data, errorMessage);
            }

            const user: any = await userRepository.getUserByEmail(email, queryData);
            if (!user) {
                throw new Error("User with email" + email + "doesn't exist!");
            }
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                throw new Error("Password is not match!");
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

            const loginResponse = new LoginResponse("Success", 200, dataTokenResponse);

            return loginResponse

        } catch (error: any) {
            throw new Error("Error at LoginHandler: " + error.message)
        }
    }

    export default LoginHandler;