import { Request, Response } from "express";
import { CreateMajorHandler } from "../../Application/Features/Major/Handlers/CreateMajorHandler";

export default class MajorController {
    async createMajor(req: Request, res: Response) {
        // #swagger.description = 'Hello';
        // #swagger.tags = ['Majors'];
        try {
            const result = await CreateMajorHandler();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json(error.message);
        }
    }
}