import { DecodedUser } from "../middleware/AuthService";
import { Request } from 'express'

export interface IRequest extends Request {
    user?: DecodedUser;
}