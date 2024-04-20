import { BaseResponse } from './../../../Common/Model/Response/BaseResponse';

export class ChangePasswordResponse extends BaseResponse {
    constructor(message: string, statusCode: number, data: any, error?: string) {
        super(message, statusCode, data, error);
    }
}
