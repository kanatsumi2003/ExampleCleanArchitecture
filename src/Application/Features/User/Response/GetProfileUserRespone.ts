import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class GetProfileUserResponse extends BaseResponse{
    private data : {
        email: string,
        username: string,
        fullname: string,
        phoneNumber: string,
    }
    constructor(message: string, statusCode: number, data: { email: string,username: string, fullname: string,phoneNumber: string,}, error?: string) {
        super(message, statusCode, data, error)
        this.data = {
          email: data.email,
          username: data.username,
          fullname: data.fullname,
          phoneNumber: data.phoneNumber,
        }
    }
}