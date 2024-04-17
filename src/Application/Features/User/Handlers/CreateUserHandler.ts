import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import UserRepository from "../../../../Infrastructure/Persistences/Respositories/UserRepository";
import { CreateRoleResponse } from "../../Role/Response/CreateRoleResponse";

export async function CreateUserHandler(data: any) {
  try {
    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();
    const roleQueryData: any = {
        isDelete: false,
        isActive: true,
    }
    const role: any = await roleRepository.getRoleByName("User", roleQueryData);
    const createUserRoleData: any = {
      email: data.email,
      fullname: data.fullname,
      password: data.password,
      phoneNumber: data.phoneNumber,
      username: data.username,
      role_id: role._id
    };
    const result: any = await userRepository.createUser(createUserRoleData);
    return new CreateRoleResponse("Successful", 200, result);
  } catch (error: any) {
    throw new Error("Error at CreateUserHandler: " + error.message);
  }
}
