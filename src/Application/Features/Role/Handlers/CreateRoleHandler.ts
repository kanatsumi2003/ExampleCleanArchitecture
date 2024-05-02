import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CreateRoleResponse } from "../Response/CreateRoleResponse";

export async function CreateRoleHandler(
  data: any
): Promise<CreateRoleResponse> {
  try {
    const unitOfWork = new UnitOfWork();
    await unitOfWork.startTransaction();
    const roleRepository = new RoleRepository();
    const { name, description, isAdmin, listClaim } = data;

    const createRoledata: any = {
      name: name,
      description: description,
      isAdmin: isAdmin,
      listClaim: listClaim,
    };
    const result = await unitOfWork.roleRepository.createRole(createRoledata);
    return new CreateRoleResponse("Create role successful", 201, {});
  } catch (error: any) {
    throw new Error("Error at CreateRoleHandler: " + error.message);
  }
}
