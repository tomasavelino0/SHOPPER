import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';
import HttpStatus from '../../../functions/enumHttpResponses';
import { IConfirmCorrida, ICreateCorrida } from '../corrida.interfaces';
import ErrorHandler from '../../../utils/errorHandler';

const createCorridaSchema = z.object({
  origin: z.string({ message: "O campo 'origin' é obrigatório." }),
  destination: z.string({ message: "O campo 'destination' é obrigatório." }),
  customer_id: z.number({ message: "O id do usuário não pode estar em branco" })
    .int({ message: "O ID do usuário deve ser um número inteiro." })
    .positive({ message: "O ID do usuário deve ser maior que zero." })
});

const confirmCorridaSchema = z.object({
  origin: z.string({ message: "O campo 'origin' é obrigatório." }),
  destination: z.string({ message: "O campo 'destination' é obrigatório." }),
  customer_id: z.number({ message: "O campo 'customer_id' e obrigatorio!" })
    .int({ message: "O ID do usuário deve ser um número inteiro." })
    .positive({ message: "O ID do usuário deve ser maior que zero." })
});

export const validateCreateCorridaBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: ICreateCorrida = req.body
    if (data.destination === data.origin) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: "INVALID_DATA",
        error_description: "Os endereços de origem e destino não podem ser o mesmo endereço"
      });
    }
    createCorridaSchema.parse(data);
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: "INVALID_DATA",
        error_description: error.issues.map((issue) => `${issue.message}`).join('\n'),
      });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
  }
};

export const validateConfirmCorridaBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: IConfirmCorrida = req.body
    if (data.destination === data.origin) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: "INVALID_DATA",
        error_description: "Os endereços de origem e destino não podem ser o mesmo endereço"
      });
    }
    confirmCorridaSchema.parse(data);
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: "INVALID_DATA",
        error_description: error.issues.map((issue) => `${issue.message}`).join('\n'),
      });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
  }
};

export const validateGetCorridaByDateBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { driver_id } = req.query;
    const { customer_id } = req.params;
    if (!customer_id) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: "INVALID_DATA",
        error_description: "O id do Usuario nao pode estar em branco!",
      });
    }

    if (driver_id) {
      if (!Number(driver_id) || Number(driver_id) <= 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error_code: "INVALID_DRIVER",
          error_description: "O id do motorista deve ser um id valido!",
        });
      }
    }

    return next();
  } catch (error) {
    throw error;
  }
};
