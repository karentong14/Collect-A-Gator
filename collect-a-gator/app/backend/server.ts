import { ObjectId } from "mongodb";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { Journal?: mongoDB.Collection } = {}

export default class Journal {
    constructor(public id: Number, public title: string, public content: string, public date: string) {}
}

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const journalCollection: mongoDB.Collection = db.collection(process.env.COLLECTION_NAME as string);
 
    collections.Journal = journalCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${journalCollection.collectionName}`);
 }