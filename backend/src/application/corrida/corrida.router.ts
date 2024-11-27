import { Router } from 'express';
import { confirmCorridaController, createNewCorridaController, getAllCorridasByDateController } from './corrida.controller';
import { validateCreateCorridaBody, validateConfirmCorridaBody, validateGetCorridaByDateBody } from './utils/corrida.middlewares';

const corridaRouter = Router();

corridaRouter.get('/ride/:customer_id', validateGetCorridaByDateBody, getAllCorridasByDateController);
corridaRouter.post('/ride/estimate', validateCreateCorridaBody, createNewCorridaController);
corridaRouter.patch('/ride/confirm', validateConfirmCorridaBody, confirmCorridaController);

export default corridaRouter;
