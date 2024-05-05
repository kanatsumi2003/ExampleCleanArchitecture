import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CreateRoleResponse } from "../Response/CreateRoleResponse";

export async function CreateRoleHandler(
  data: any
): Promise<CreateRoleResponse|CoreException> {
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
    return new CreateRoleResponse("Create role successful", StatusCodeEnums.Created_201, {});
  } catch (error: any) {
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);

  }
}
