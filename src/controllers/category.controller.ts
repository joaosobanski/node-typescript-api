import { ClassMiddleware, Controller, Get, Post } from '@overnightjs/core';
import { Response } from 'express';
import { BaseController } from './base.controller';
import CategoryService from '@services/category.service'
import { authMiddleware } from '@src/middleware/auth'
import { IRequest } from '@src/interfaces/IRequest';

@Controller('category')
@ClassMiddleware(authMiddleware)
class CategoryController extends BaseController {
    @Post('')
    public async create(req: IRequest, res: Response): Promise<void> {
        try {
            let cat = {}
            cat = await CategoryService.create({ ...req.body, ...{ user: req.user?.id } });
            res.status(201).send(cat);
        } catch (error) {
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }

    @Get('')
    public async findAll(req: IRequest, res: Response): Promise<void> {
        try {
            const userId: string = req.user?.id as string;

            const categorias = await CategoryService.findAll(userId);
            res.status(200).send({ data: categorias });
        } catch (error) {
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }
}
export default CategoryController;