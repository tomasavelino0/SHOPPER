import { Router } from 'express';
import corridaRouter from '../application/corrida/corrida.router';
import loginRouter from '../application/auth/login.router';

const apiMain = Router();

apiMain.use('', corridaRouter);
apiMain.use('', loginRouter);

export default apiMain;
