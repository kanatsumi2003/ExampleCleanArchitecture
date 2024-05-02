import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CreateRoleResponse } from "../Response/CreateRoleResponse";

export async function CreateRoleHandler(data: any): Promise<CreateRoleResponse> {
  const unitOfWork = new UnitOfWork();
  try {
    await unitOfWork.startTransaction();
    const { name, description, isAdmin, listClaim } = data;
    const createRoledata: any = {
      name: name,
      description: description,
      isAdmin: isAdmin,
      listClaim: listClaim,
    };
    const result =  await unitOfWork.roleRepository.createRole(createRoledata);
    await unitOfWork.commitTransaction();
    return new CreateRoleResponse("Create role successful", 201, result);
  } catch (error: any) {
    unitOfWork.abortTransaction();
    throw new Error("Error at CreateRoleHandler: " + error.message);
  }
}
