import { ClassMiddleware, Controller, Get, Post } from '@overnightjs/core';
import { authMiddleware } from '@src/middlewares/auth';
import TokensService from '@src/services/config/chain.service';
import { Request, Response } from 'express';
import { BaseController } from '..';

@Controller('categorias')
@ClassMiddleware(authMiddleware)
export class CategoriasController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      // let id: string = req.body.id as string;
      let cat = {}
      const userId: string = req.decoded?.id as string;
      // if (id == '')
      cat = await TokensService.create({ ...req.body, ...{ user: req.decoded?.id } });
      // else
      //   cat = await CategoriasService.FindAndUpdate({ ...req.body, ...{ user: req.decoded?.id } });
      res.status(201).send(cat);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.decoded?.id as string;

      const categorias = await TokensService.findAll(userId);
      res.status(200).send({ data: categorias });
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }


  @Get(':id')
  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.decoded?.id as string;
      const id: string = req.params.id as string;
      const categorias = await TokensService.findById(id, userId);
      res.status(200).send({ data: categorias });
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}