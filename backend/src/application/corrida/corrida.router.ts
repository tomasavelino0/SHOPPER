import { Router } from 'express';
import { confirmCorridaController, createNewCorridaController, getAllCorridasController } from './corrida.controller';
import { validateCreateCorridaBody, validateConfirmCorridaBody } from './utils/corrida.middlewares';

const corridaRouter = Router();

corridaRouter.get('/ride', getAllCorridasController);
corridaRouter.post('/ride/estimate', validateCreateCorridaBody, createNewCorridaController);
corridaRouter.post('/ride/confirm', validateConfirmCorridaBody, confirmCorridaController);

export default corridaRouter;
