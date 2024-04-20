//const mongoService = require('../services/mongoService');
const mongoose = require('mongoose'); 
const collectionName: string = "users";
import { hashPassword } from "../../../../Application/Common/Helpers/passwordUtils";
const UserWithBase = require('../../../../Domain/Entities/UserEntites')

/*async function getUserById(userId) {
    try {
        const query = { _id: new mongoose.Types.ObjectId(userId), isDelete: false, isActive: true };
        const users = await mongoService.findDocuments(collectionName, query);
        if (users !== null && users.length > 0) {
            return users[0];
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Error getting user by id: ' + error.message);
    }
}

async function updateUser(userId, update) {
    try {
        update.updateTime = new Date();
        await mongoService.updateDocument(collectionName, { _id: new mongoose.Types.ObjectId(userId) }, update);
        return true;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
}
async function deleteSession(sessionId) {
    const query = {_id:new mongoose.Types.ObjectId(sessionId)}
    const result = await mongoService.deleteDocument(collectionName, query);;
    return result;
}

async function changePasswordUser(userId, oldPassword, newPassword) {
    try {
        console.log("changePasswordUser");
        const userData = await getUserById(userId);
        if (!userData) {
            console.log("userData false");
            return false;
        }
        // Tạo một thể hiện mới của User class
        let user = new UserWithBase(userData);
        console.log("changePasswordUser userData",userData);
        console.log("changePasswordUser user",user);

        // Đảm bảo bạn đang chờ hashPassword trả về
        const isValid = await user.isCorrectPassword(oldPassword);
        console.log(isValid);

        if (!isValid) {
            return false;
        }
        console.log(oldPassword);
        console.log(newPassword);
        user.password = await hashPassword(newPassword);
        console.log(user);
        await updateUser(userId, user);
        return true;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
}

module.exports = {
    getUserById,
    changePasswordUser,
    deleteSession
}*/