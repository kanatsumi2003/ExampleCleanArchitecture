import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { CreateRoleResponse } from "../Response/CreateRoleResponse";

export async function CreateRoleHandler(
  data: any
): Promise<CreateRoleResponse> {
  try {
    const roleRepository = new RoleRepository();
    const { name, description, isAdmin, listClaim } = data;

    const createRoledata: any = {
      name: name,
      description: description,
      isAdmin: isAdmin,
      listClaim: listClaim,
    };
    const result = await roleRepository.createRole(createRoledata);
    return new CreateRoleResponse("Create role successful", StatusCodeEnums.Created_201, result);
  } catch (error: any) {
    throw new Error("Error at CreateRoleHandler: " + error.message);
  }
}
