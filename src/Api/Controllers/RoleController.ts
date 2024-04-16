import { GetRoleByIdHandler } from '../../Application/Features/Role/Handlers/GetRoleByIdHandler';
import GetRoleByIdResponse from '../../Application/Features/Role/Response/GetRoleByIdResponse';
import RoleRepository from '../../Infrastructure/Persistences/Respositories/RoleRepository';
import { GetRoleByIdRequest } from './../../Application/Features/Role/Request/GetRoleByIdRequest';
import {Request, Response} from "express";
export default class RoleController {
    private roleRepository: RoleRepository;
    constructor() {
        this.roleRepository = new RoleRepository();
    }
    async getRoleById(req: Request<any, any, GetRoleByIdRequest>, res: Response) {
        try {
            const {roleId} = req.body;
            const data: any = {
                id: roleId, 
            };
            const result: any = await GetRoleByIdHandler(data);
            res.status(result.statusCode).json({data: result});
            if(result.error != undefined || result.error) {
                res.status(result.statusCode).json({error: result.error});
            }
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}