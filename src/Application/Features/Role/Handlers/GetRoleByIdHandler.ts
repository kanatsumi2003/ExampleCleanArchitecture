import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import GetRoleByIdResponse from "../Response/GetRoleByIdResponse";

export async function GetRoleByIdHandler(data: any): Promise<GetRoleByIdResponse|CoreException> {
    const unitOfWork = new UnitOfWork();
    try {
       
        unitOfWork.startTransaction();
        const {id} = data;
        const queryData: any = {
            isActive: true,
            isDelete: false,
        }
        const result: any = await unitOfWork.roleRepository.getRoleById(id, queryData);
        if(result == null) throw new Error("Can not find this role");
        const responseData = {
            name: result.name,
            description: result.description,
            isAdmin: result.isAdmin,
            listClaim: result.listClaim,
        }
        const a = new GetRoleByIdResponse("Successfull", StatusCodeEnums.OK_200, responseData);
        await unitOfWork.commitTransaction();
        console.log(a);
        return new GetRoleByIdResponse(
            "Successfull",
            StatusCodeEnums.OK_200,
            responseData,
        );
    } catch (error: any) {  
        unitOfWork.abortTransaction();  
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);

    }
}
