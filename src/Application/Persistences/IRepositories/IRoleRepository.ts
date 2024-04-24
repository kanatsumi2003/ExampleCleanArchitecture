import mongoose from "mongoose";
import { Role, RoleWithBase } from "../../../Domain/Entities/RoleEntities";

export default interface IRoleRepository {
    getRoleById(roleId: number | mongoose.Types.ObjectId, queryData: any): Promise<RoleWithBase | null>;
    createRole(createRoleData: any): Promise<RoleWithBase>;
    getRoleByName(roleName: string, queryData: any): Promise<RoleWithBase | null>;
}
