import { Router } from 'express';
import { userLogin } from './login.controller';

const loginRouter = Router();

loginRouter.post('/login', userLogin);

export default loginRouter;
