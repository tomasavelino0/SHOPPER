import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

const jwtConfig = {
  expiresIn: '10d',
};

const createToken = (userWithoutPassword: ICreateToken): string => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization: string) => {
  const payload = jwt.verify(authorization, secret);
  return payload;
};

interface ICreateToken {
  id: number,
  nome: string,
  email: string
}

export { createToken, verifyToken };