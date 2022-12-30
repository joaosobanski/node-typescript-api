
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import cors from 'cors';
import database from '@src/middleware/database';
import logger from '@utils/logger'
import UsersController from '@controllers/users.controller';
import CategoryController from '@controllers/category.controller';

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

export class SetupServer extends Server {
  private server?: http.Server;
  constructor(private port = 3003) {
    super();
    logger.info(`Get your coffee at the port:${port}`);
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.setupDatabase();
    this.setupJobs()
  }

  private setupExpress(): void {
    this.app.use(cors(options));
    this.app.use(bodyParser.json());
    this.setupControllers();
  }

  private setupJobs(): void {

  }

  private setupControllers(): void {
    const usersController = new UsersController();
    const categoriasController = new CategoryController();

    this.addControllers(
      [
        usersController,
        categoriasController
      ]
    )
  }

  public getApp(): Application {
    return this.app;
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info('Have a good appetite and good work!');
    });
  }
}