import { AppDataSource } from './data-source';
import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';

import { verifyFirebaseToken } from './controller/verifyFirebaseToken';

AppDataSource.initialize()
  .then(() => console.log('🚀 데이터베이스 연결 성공'))
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(verifyFirebaseToken);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('backend error:', error);
  return res.status(500).send(error);
});

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`🚀 서버가 ${process.env.BACKEND_PORT}번 포트에서 실행중입니다.`);
});
