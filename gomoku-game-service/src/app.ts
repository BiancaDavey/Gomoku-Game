import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import gameHandler from './handler/game.handler';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/games', gameHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});