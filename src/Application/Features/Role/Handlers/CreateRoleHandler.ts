import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CreateRoleResponse } from "../Response/CreateRoleResponse";

export async function CreateRoleHandler(data: any): Promise<CreateRoleResponse|CoreException> {
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
    return new CreateRoleResponse("Create role successful", StatusCodeEnums.Created_201, {});
  } catch (error: any) {
    throw new Error("Error at CreateRoleHandler: " + error.message);
  }
}
