import { Request, Response } from 'express';
import { loginAcess } from './login.service';
import ErrorHandler from '../../utils/errorHandler';

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginAcess(email, password);
    return res.status(200).json(user);

  } catch (error) {
    console.error(error);
    if (error instanceof ErrorHandler) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json(error);
  }
};

