import mongoose from "mongoose";
import { Role, RoleWithBase } from "../../../Domain/Entities/RoleEntities";

export default interface IRoleRepository {
    getRoleById(roleId: number | mongoose.Types.ObjectId, queryData: any);
    createRole(createRoleData: any);
    getRoleByName(roleName: string, queryData: any);
}
