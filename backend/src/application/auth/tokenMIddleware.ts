import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken';
import { IVerifyToken } from './tokenInterfaces';
import { Usuario } from '../usuario/usuario.model';

const secret = process.env.JWT_SECRET as string || 'teste'

const jwtConfig = {
  expiresIn: '10d',
};

export const createToken = (userWithoutPassword: object): string => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

export const verifyToken = (authorization: string): IVerifyToken => {
  const payload = jwt.verify(authorization, secret);
  return payload as IVerifyToken;
};


export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization;
    const formatToken = token.split(" ");

    if (!formatToken[1]) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decoded = jwt.verify(formatToken[1], secret) as IVerifyToken;
    const { id } = decoded.data;
    const user = await Usuario.findByPk(id);
    if (user) {
      req.body.user = user;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};