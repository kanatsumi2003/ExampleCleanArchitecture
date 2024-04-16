import mongoose from "mongoose";
import IRoleRepository from "../../../Application/Persistences/IRepositories/IRoleRepository";
import { Role, RoleWithBase } from "../../../Domain/Entities/RoleEntities";
import BaseRepository from "./BaseRepository";

const collectionName: string = "userroles";

export default class RoleRepository extends BaseRepository<Role> implements IRoleRepository{
    constructor(){
        super(collectionName)
    }
    async getRoleById(roleId: number | mongoose.Types.ObjectId, queryData: RoleWithBase): Promise<RoleWithBase | null> {
        try {
            if(!mongoose.Types.ObjectId.isValid(roleId)) {
                roleId = new mongoose.Types.ObjectId(roleId);
            } else {
                roleId = new mongoose.Types.ObjectId(roleId);
            }
            const query = {
                _id: roleId,
                isActive: true,
                isDelete: false,
            };
            const roles: RoleWithBase[] = await this.findDocuments(query, null, {});
            if(roles == null) return null;
            return roles[0];
        } catch (error) {
            throw error;
        }
    }

}