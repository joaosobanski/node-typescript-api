import { ClassMiddleware, Controller, Get, Post } from '@overnightjs/core';
import CategoriasService from '../services/categorias.service';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { authMiddleware } from '../middlewares/auth';

@Controller('categorias')
@ClassMiddleware(authMiddleware)
export class CategoriasController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      // let id: string = req.body.id as string;
      let cat = {}
      // if (id == '')
        cat = await CategoriasService.create({ ...req.body, ...{ user: req.decoded?.id } });
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

      const categorias = await CategoriasService.findAll(userId);
      res.status(200).send({ data: categorias });
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('findByName')
  public async findByName(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.decoded?.id as string;
      const name: string = req.query.name as string;
      const categorias = await CategoriasService.findByName(name, userId);
      res.status(200).send({ data: categorias });
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('findByTipoCapital')
  public async findByTipoCapital(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.decoded?.id as string;
      const tipoCapital: string = req.query.tipoCapital as string;
      const categorias = await CategoriasService.findByTipoCapital(tipoCapital, userId);
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
      const categorias = await CategoriasService.findById(id, userId);
      res.status(200).send({ data: categorias });
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }
}