import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import IUserRepository from "../../../Persistences/IRepositories/IUserRepository";
import { ChangePasswordResponse } from "../Response/ChangePasswordResponse";

export async function ChangePasswordHandler(data: any) {
    let statusCode = 500;
    let message = "";
    let error = "";
    try {
        const userRepository: IUserRepository = new UserRepository();
        const {userId, oldPassword, newPassword} = data;
        const queryData = {
            isDelete: false,
            isActive: true,
        }
        const user = await userRepository.getUserById(userId, queryData);
        if(user == null) throw new Error("User not found");

    } catch (err: any) {
        message = "Error at ChangePasswordHandler"
        error = err.message;
        return new ChangePasswordResponse(message, statusCode, {}, error);
    }

}