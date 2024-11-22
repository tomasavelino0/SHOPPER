import { Router } from 'express';
import { createNewCorridaController, getAllCorridasController } from './corrida.controller';
import { validateCreateCorridaBody } from './utils/corrida.middlewares';

const corridaRouter = Router();

corridaRouter.get('/ride', getAllCorridasController);
corridaRouter.post('/ride/estimate', validateCreateCorridaBody, createNewCorridaController);

export default corridaRouter;