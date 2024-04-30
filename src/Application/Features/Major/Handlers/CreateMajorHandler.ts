import { IUnitOfWork } from './../../../Persistences/IRepositories/IUnitOfWork';
import { MongoClient } from "mongodb";
import { IMajorEntities } from "../../../../Domain/Interface/IMarjorEntities";
import mongoose from "mongoose";
import { Major } from "../../../../Domain/Entities/MajorEntites";
import { BaseUnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/BaseUnitOfWork";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
require('dotenv').config();
const MongoDBURI = process.env.CONNECTION_STRING
export async function CreateMajorHandler() {
    try {
        // const client = new MongoClient("mongodb://noahuser:noahdbpassword123@mongo-noah.ezcount.vn:27023/");
        // await client.connect();
        // // const session = client.startSession();
        // // session.startTransaction();

        // const db = client.db('NoahQuizDB');
        // const collection = db.collection('major');
        // await mongoose.connect(`${MongoDBURI}`, {dbName: "NoahQuizDB"} )
        // const session = await mongoose.startSession();
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        const session = await unitOfWork.startTransaction();
        // const major = await Major.create({
        //     majorName: "a",
        // });
        const major = await Major.create([{

            majorName: "a",
        }], {session});
        await unitOfWork.commitTransaction();
        // session.abortTransaction();
        // session.endSession();

    } catch (error: any) {
        console.log(error.message);
    }
}