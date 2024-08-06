import express, { Request, Response } from 'express';
import UserRouter from './routes/user';
import  'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/user', UserRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});