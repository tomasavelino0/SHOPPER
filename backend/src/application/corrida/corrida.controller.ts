import { Request, Response } from 'express'
import ErrorHandler from "../../utils/errorHandler";
import HttpStatus from '../../functions/enumHttpResponses';
import { confirmCorrida, corridaHandler, getAllCorridas } from './corrida.service';
import { IConfirmCorrida, ICreateCorrida } from './corrida.interfaces';

export const getAllCorridasController = async (req: Request, res: Response) => {
  try {
    // const { currPage, limit }: any = req.query;
    const getAll = await getAllCorridas();
    return res.status(HttpStatus.OK).json(getAll);

  } catch (error) {
    console.error(error)
    if (error instanceof ErrorHandler) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HttpStatus.OK).json({ error });
  }
}

export const createNewCorridaController = async (req: Request, res: Response) => {
  try {
    const data: ICreateCorrida = req.body;
    const createCorrida = await corridaHandler(data);
    return res.status(HttpStatus.OK).json(createCorrida);

  } catch (error) {
    console.error(error);
    if (error instanceof ErrorHandler) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const confirmCorridaController = async (req: Request, res: Response) => {
  try {
    const data: IConfirmCorrida = req.body;
    const confirmRide = await confirmCorrida(data);
    return res.status(HttpStatus.OK).json(confirmRide);

  } catch (error) {
    console.error(error);
    if (error instanceof ErrorHandler) {
      return res.status(error.status).json({ error_code: error.adicionalInfo, error_description: error.message });
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
  }
};
