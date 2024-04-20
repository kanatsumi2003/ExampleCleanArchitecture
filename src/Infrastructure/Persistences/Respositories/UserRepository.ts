import { Collection, Db } from "mongodb";
import BaseRepository from "./BaseRepository";
import { User, UserWithBase } from "../../../Domain/Entities/UserEntites";
import IUserRepository from "../../../Application/Persistences/IRepositories/IUserRepository";
import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
import { hashPassword } from "../../../Application/Common/Helpers/passwordUtils";
class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    const collectionName: string = "users";
    super(collectionName);
  }
  async getUserByEmail(email: string, queryData: any): Promise<UserWithBase> {
    try {
      const query: any = {
        email: email,
        isDelete: queryData.isDelete,
        isActive: queryData.isActive,
      };
      const users: UserWithBase[] = await this.findDocuments(query, null, {});
      if (users === null || users.length <= 0) {
        throw new Error("No user found!");
      }
      return users[0];
    } catch (error: any) {
      throw new Error("Error at getUserByEmail in UserRepository: " + error.message);
    }
  }
  async getUserByEmailAndName(email: string, username: string, queryData: any): Promise<UserWithBase | null> {
    try {
      const query: any = {
        $or: [{ email: email }, { username: username }],
        isActive: queryData.isActive,
        isDelete: queryData.isDelete,
      };
      const users: UserWithBase[] = await this.findDocuments(query, null, {});
      if(users == null) return null;
      return users[0];
    } catch (error: any) {
      throw new Error("Error at getUserByEmailAndName in UserRepository: " + error.message);
    }
  }

  async createUser(userData: any): Promise<void>{
    try {
      const user: any = new User(
        userData.fullname,
        userData.email,
        userData.username,
        userData.password,
        userData.phoneNumber,
        userData.role_id,
        null
      )
      const userWithBase: any = new UserWithBase(user);
      userWithBase.password = await hashPassword(user.password);
      await this.insertDocuments(userWithBase);
    } catch (error: any) {
      throw new Error("Error at createUser in UserRepository: " + error.message);
    }
  }
  async uploadPass(data: any): Promise<void> {
    try {
      // Hash mật khẩu mới trước khi cập nhật
      const {email, newPassword} = data
      const hashedPassword = await hashPassword(newPassword);
  
      // Xây dựng điều kiện tìm kiếm user theo email
      const query: any = {
        email: email,
        isDelete: false, // Bạn có thể thêm các điều kiện khác nếu cần
        isActive: true,
        emailConfirmed: true,
      };
  
      // Xây dựng dữ liệu cập nhật với phép cập nhật trường hợp $set
      const updateData: any = {
          password: hashedPassword,
      };
  
      // Thực hiện phép cập nhật sử dụng $set
      await this.updateDocument(query, updateData);
    } catch (error: any) {
      throw new Error("Error updating password: " + error.message);
    }
  }

  async uploadImage(data: any): Promise<void> {
    try {
      
      const {email, imageUser} = data
      
      const query: any = {
        email: email,
        isDelete: false,
        isActive: true,
        emailConfirmed: true,
      };
  

      const updateData: any = {
        imageUser: imageUser,
      };
  
      await this.updateDocument(query, updateData);
    } catch (error: any) {
      throw new Error("Error updating image: " + error.message);
    }
  }
  
  //     constructor() {
  //         const collectionName: string = "User";
  //         super(collectionName);
  //     }
  //     // public userRepository;
  //     // public UserRepository() {
  //     //     this.userRepository = new UserRepository(this.collection);
  //     // }
  //     async createUser(user: User): Promise<void>{
  //         try {
  //             const result = await this.insertDocuments(user);
  //             console.log(result);
  //         } catch (error) {
  //             throw error;
  //         }
  //     }
  //     async getAllUser(): Promise<User[]> {
  //         try {
  //             const query = {};
  //             const result: User[] = await this.findDocuments(query, null, {});
  //             console.log(result);
  //             return result
  //         } catch (error) {
  //             throw error;
  //         }
  //     }
  //     async updateUser(user: User): Promise<void>{
  //         try {
  //             const user = await this.findUser("b");
  //             user[0].fullname = "asjkmndasjkdhasjkhd";
  //             const id = user[0]._id
  //             const query = {_id: id};
  //             await this.updateDocument(query, user[0]);
  //         } catch (error) {
  //             throw error;
  //         }
  //     }
  //     async findUser(userName: string): Promise<User[]> {
  //         try {
  //             const query = {fullname: userName};
  //             const result: User[] = await this.findDocuments(query, null, {});
  //             return result;

  //         } catch (error) {
  //             throw error;
  //         }
  //     }

  //     async deleteUser(userId: string): Promise<void> {
  //         try {
  //             const id = new mongoose.Types.ObjectId(userId);
  //             const query = {_id: id}
  //             await this.deleteDocument(query);
  //         } catch (error) {
  //             throw error;
  //         }
  //     }
}

export default UserRepository;
