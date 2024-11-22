import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';
import HttpStatus from '../../../functions/enumHttpResponses';
import { ICreateCorrida } from '../corrida.interfaces';

const createCorridaSchema = z.object({
  origem: z.string({ message: "O campo 'origem' é obrigatório." }),
  destino: z.string({ message: "O campo 'destino' é obrigatório." }),
  idUsuario: z.number({ message: "O campo 'idUsuario' e obrigatorio!" })
    .int({ message: "O ID do usuário deve ser um número inteiro." })
    .positive({ message: "O ID do usuário deve ser maior que zero." })
});


export const validateCreateCorridaBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: ICreateCorrida = req.body
    if (data.destino === data.origem) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: HttpStatus.BAD_REQUEST,
        error_description: "O destino nao pode ser igual a origem!"
      });
    }
    createCorridaSchema.parse(data);
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error_code: HttpStatus.BAD_REQUEST,
        error_description: error.issues.map((issue) => `${issue.message}`).join('\n'),
      });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
  }
};