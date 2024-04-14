import { FilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import {
  Collection,
  Db,
  ObjectId,
  InsertOneResult,
  InsertManyResult,
  DeleteResult,
  OptionalUnlessRequiredId,
  FilterOperations,
  Document,
} from "mongodb";
import { User } from "../../../Domain/Entities/UserEntites";
const { MongoClient } = require("mongodb");
require('dotenv').config();


abstract class BaseRepository<T extends Document> {
  public readonly collection: Collection<T>;
  constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  async connectDB() {
    try {
        const URI = process.env.CONNECTION_STRING || "";
        const dbName = "EInvoiceDB";
        console.log("URI:", URI);
        console.log("dbName:", dbName);

        const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected successfully to database !");
        return client.db(dbName);
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
}


  async insertDocuments<U extends OptionalUnlessRequiredId<T>>(data: U): Promise<InsertOneResult<T>> {
    try {
      const db: Db = await this.connectDB(); // Await the promise to get the Db object
      const result = await db.collection<T>("User").insertOne(data); // Use the Db object to access the collection
      console.log("Inserted documents into the collection");
      return result;
    } catch (error) {
      throw error;
    }
  }


  async findDocuments<T>(
    query: FilterOperations<T>,
    projectionOptions: object | null,
    sortOptions: {},
    page: number = 1,
    limit: number = 10000
  ): Promise<T[]> {
    try {
      if (page === 0) page = 1;
      const skip = (page - 1) * limit;
      const projection = projectionOptions
        ? { projection: projectionOptions }
        : {};
      const docs = await this.collection
        .find(query, { ...projection })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray();
      console.log("docs found: " + docs);
      return docs as T[];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateDocument<T>(
    query: FilterOperations<T>,
    update: Partial<T>
  ): Promise<UpdateWriteOpResult> {
    try {
      const result = await this.collection.updateOne(query, update);
      console.log("Updated result: " + result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument<T>(query: FilterOperations<T>): Promise<DeleteResult> {
    try {
      const result = await this.collection.deleteOne(query);
      console.log("Delete documents: " + result);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseRepository;
