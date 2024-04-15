import { Db, DeleteResult, InsertOneResult, OptionalUnlessRequiredId } from "mongodb";
import { User } from "../../../Domain/Entities/UserEntites";
import { UpdateWriteOpResult } from "mongoose";

interface IBaseRepository {
    connectDB(): Promise<Db>;
    insertDocuments<U extends OptionalUnlessRequiredId<User>>(data: U): Promise<InsertOneResult<User>>
    findDocuments<T>(query: object, projectionOptions: object | null, sortOptions: object, page?: number, limit?: number): Promise<T[]>;
    updateDocument<T>(query: object, update: User): Promise<UpdateWriteOpResult>;
    deleteDocument<T>(query: object): Promise<DeleteResult>;
}

export default IBaseRepository;