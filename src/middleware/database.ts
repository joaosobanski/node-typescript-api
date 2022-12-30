import mongoose, { connect as mongooseConnect, connection } from 'mongoose';

class Database {

    static async connect(): Promise<void> {
        mongoose.set('strictQuery', false);
        await mongooseConnect(process.env.DATABASE ? process.env.DATABASE : '');
    };

    static async close(): Promise<void> {
        connection.close()
    };
}

export default Database;