import { Role, RoleWithBase } from "../../../Domain/Entities/RoleEntities";

export default interface IRoleRepository {
    getRoleById(roleId: number, queryData: RoleWithBase): Promise<RoleWithBase | null>;
}