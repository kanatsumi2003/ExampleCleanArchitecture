import { response } from "express";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { LoginResponse } from "../Response/LoginResponse";
import { LoginRequest } from "../Requests/LoginRequest";
import { UserWithBase } from "../../../../Domain/Entities/UserEntites";
import { comparePassword } from "../../../Common/Helpers/passwordUtils";
import { addDuration, encodejwt } from "../../../Common/Helpers/jwtUtils";
import SessionRepository from "../../../../Infrastructure/Persistences/Respositories/SessionRepository";
import { CreateSessionHandler } from "../../Session/Handlers/CreateSessionHandler";

async function LoginHandler(data: any): Promise<LoginResponse> {
    try {
        const userRepository = new UserRepository();
        const sessionRepository = new SessionRepository();
        const { deviceId, ipAddress, email, password } = data;

        const queryData: any = {
            isDelete: false,
            isActive: true,
            emailConfirmed: true,
        }
        const user: any = await userRepository.getUserByEmail(email, queryData);

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

        // await sessionRepository.createSession({
        //     userId: user._id,
        //     email: user.email,
        //     name: user.name || "unknown", 
        //     username: user.username.toLowerCase(), 
        //     jwttoken: token.token, 
        //     refreshToken: token.refreshToken,
        //     ExpireRefreshToken: refreshTokenExpiryDate,
        //     expireDate: tokenExpiryDate,
        //     deviceId: deviceId,
        //     ipAddress: ipAddress,
        // });

        const dataTokenResponse = {
            accessToken: token.token,
            refreshToken: token.refreshToken,
            expireIn: token.expiresIn || ""
        }

        const loginResponse = new LoginResponse("Success", 200, dataTokenResponse);

        return loginResponse

    } catch (error: any) {
        throw new Error(error.message)
    }

    // try {
    //     console.log("login");
    //     const { email, password } = req.body;
    //     const {email, password} = data;
    //     // Use userService to find user by email
    //     const user = await userService.getUserByEmail(email);
    //     console.log(!user);
    //     if (!user || user.emailConfirmed == false) {
    //         return res.status(401).json({ message: "Email not existed or not verify email" });
    //     }
    //     console.log(user);
    //     // Device ID and IP Address (this might require additional logic depending on your setup)
    //     const deviceId = req.headers['user-agent'] || 'Unknown Device'; // Placeholder, you should have a way to identify devices
    //     const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    //     console.log(deviceId);
    //     console.log(ipAddress);
    //     // Use passwordUtils to compare password
    //     const isMatch = await comparePassword(password, user.password);
    //     if (!isMatch) {
    //         return res.status(401).json({ message: "Mật khẩu không chính xác" });
    //     }
    //     // const user = {
    //     //     email:user.email,
    //     //     role_Id: user.role_id
    //     // }

    //     // Generate JWT token
    //     const token = await encodejwt(user); // Assuming encodeJwt generates a token and handles the setting of expiration

    //     const session = await findSessionByEmailAndIP(email, ipAddress, deviceId); // kiểm tra có login nào  trong cùng device và ip ko

    //     if (session != null && session.length >= 0) {
    //         for (const sess of session) {
    //             await deleteSession(sess._id); // Assuming each session document has an _id field
    //         }
    //     }
    //     // Assuming encodeJwt returns an object with the token and its expiry

    //     const tokenExpiryDate = addDuration(token.expiresIn);
    //     const refreshTokenExpiryDate = addDuration(process.env.REACT_APP_EXPIRE_REFRESH_TOKEN);
    //     const dbName = null;
    //     //kiểm tra có company không
    //     const myCompany = await companiesService.getCompanyByUserId(user._id);
    //     console.log(myCompany);
    //     if (myCompany) {
    //         dbName = myCompany.dbName;
    //     }
    //     // Save the session in sessionModel
    //     await createSession({
    //         userId: user._id,
    //         email: user.email,
    //         name: user.name || "unknown", // Assuming user object has a name field
    //         username: user.username.toLowerCase(), // Assuming user object has a username field
    //         jwttoken: token.token, // Assuming the token object has a token field
    //         refreshToken: token.refreshToken,
    //         ExpireRefreshToken: refreshTokenExpiryDate,
    //         expireDate: tokenExpiryDate,
    //         deviceId: deviceId,
    //         ipAddress: ipAddress,
    //         dbName: dbName
    //     });

    //     // Send token to client
    //     res.json({ token: token });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Lỗi máy chủ");
    // }
}

export default LoginHandler;