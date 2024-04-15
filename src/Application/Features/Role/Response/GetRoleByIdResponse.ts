import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export default class GetRoleByIdResponse extends BaseResponse{
    private name: string;
    private description: string;
    private isAdmin: boolean;
    private listClaim: Object[];
    constructor(message: string, statusCode: number, data: {name: string, description: string, isAdmin: boolean, listClaim: Object[]}, error?: string) {
        super(message, statusCode, data, error);
        this.name = data.name;
        this.description = data.name;
        this.isAdmin = data.isAdmin;
        this.listClaim = data.listClaim;
    }
}