import { connect as mongooseConnect, connection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connect = async (): Promise<void> => {
  await mongooseConnect(process.env.DATABASE ? process.env.DATABASE : '');
};

export const close = (): Promise<void> => connection.close();