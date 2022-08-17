import { SetupServer } from './server';
import config from 'config';

async function go() {

    const server = new SetupServer(config.get('App.port'));
    await server.init();
    server.start();
}
go();