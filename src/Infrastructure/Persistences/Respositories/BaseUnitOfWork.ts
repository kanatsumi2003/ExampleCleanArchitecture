import mongoose, { ClientSession } from "mongoose";
require('dotenv').config();
const URI = process.env.CONNECTION_STRING;
const DBName = process.env.DATABASE_NAME
export class BaseUnitOfWork {
    private session: any;
    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(`${URI}`, {dbName: DBName})
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    async startSession(): Promise<ClientSession> {
        try {
          return await mongoose.startSession();
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
}