import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { CreateRoleResponse } from "../Response/CreateRoleResponse";

export async function CreateRoleHandler(
  data: any
): Promise<CreateRoleResponse|CoreException> {
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
    return new CreateRoleResponse("Create role successful", 201, result);
  } catch (error: any) {
    return new CoreException(500, error.mesagge);

  }
}
