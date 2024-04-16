import { BaseResponse } from './../../../Common/Model/Response/BaseResponse';
export class LoginResponse extends BaseResponse {
    private acessToken: string;
    private refreshToken: string;
    private expireIn: string;
    constructor(message: string, statusCode: number, data: { accessToken: string, refreshToken: string, expireIn: string }, error: string) {
        super(message, statusCode, data, error);
        this.acessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.expireIn = data.expireIn;

    }
    
}