import { IUser } from '@src/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//version of the user that is send to via API and decoded from the Json Web Token
export interface DecodedUser extends IUser {
  id: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(payload: object): string {
    return jwt.sign(payload, process.env.SECRET as string, {
      expiresIn: process.env.EXPIRES,
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, process.env.SECRET as string) as DecodedUser;
  }
}