import { Controller, Post } from '@overnightjs/core';
import { Response, Request } from 'express';
import { BaseController } from './base.controller';
import User from '@src/models/user';
import AuthService from '@src/middleware/AuthService';

@Controller('users')
class UsersController extends BaseController {
    @Post('')
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const user = new User(req.body);
            const newUser = await user.save();
            res.status(201).send(newUser);
        } catch (error) {
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }

    @Post('authenticate')
    public async authenticate(req: Request, res: Response): Promise<Response> {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).send({
                code: 401,
                error: 'Usuário não econtrado!',
            });
        }
        if (
            !(await AuthService.comparePasswords(req.body.password, user.password))
        ) {
            return res
                .status(401)
                .send({ code: 401, error: 'Senha inválida!' });
        }
        const token = AuthService.generateToken(user.toJSON());

        return res.send({ ...user.toJSON(), ...{ token } });
    }
}
export default UsersController