import RoleRepository from "../../../../Infrastructure/Persistences/Respositories/RoleRepository";
import GetRoleByIdResponse from "../Response/GetRoleByIdResponse";

export async function GetRoleByIdHandler(data: any): Promise<GetRoleByIdResponse> {
    try {
        const {id} = data;
        const roleRepository = new RoleRepository();
        const queryData: any = {
            isActive: true,
            isDelete: false,
        }
        const result: any = await roleRepository.getRoleById(id, queryData);
        if(result == null) throw new Error("Can not find this role");
        const responseData = {
            name: result.name,
            description: result.description,
            isAdmin: result.isAdmin,
            listClaim: result.listClaim,
        }
        const a = new GetRoleByIdResponse("Successfull", 200, responseData);
        console.log(a);
        return new GetRoleByIdResponse(
            "Successfull",
            200,
            responseData,
        );
    } catch (error) {
        throw new Error("Error at GetRoleByIdHandler: " + error);
    }
}
