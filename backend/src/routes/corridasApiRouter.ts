import { Router } from 'express';
import corridaRouter from '../application/corrida/corrida.router';

const apiCorridas = Router();

apiCorridas.use('', corridaRouter);

export default apiCorridas;
