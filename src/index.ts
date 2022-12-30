import dotenv from 'dotenv';
dotenv.config();

import logger from '@utils/logger';
logger.info("Hi I'm Api Rest, would you like a coffee?");
import { SetupServer } from './server';

async function go() {
    const server = new SetupServer();
    await server.init();
    server.start();
}
go();