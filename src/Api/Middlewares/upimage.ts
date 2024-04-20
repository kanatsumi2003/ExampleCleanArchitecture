import multer from "multer";
import { Request, Response, NextFunction } from 'express';
import fs from 'fs'
import path from "path";

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, './uploads');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });

export function getUploadFile(req: Request, res: Response, next: NextFunction) {
    const {filename} = req.body.filename;
    const uploadsFolderPath = path.join(__dirname, 'uploads');
    const filePath = path.join(uploadsFolderPath, filename);
    try {
        const fileData = fs.readFileSync(filePath);
        (req as any).fileData = fileData;
        next();
    } catch (error) {
        next(error);
    }
    
}