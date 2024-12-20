import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiMain from './routes/corridasApiRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use('', apiMain);

  }

  private config(): void {
    this.app.use(cors());
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
