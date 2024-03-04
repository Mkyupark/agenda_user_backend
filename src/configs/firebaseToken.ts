import { NextFunction, Request, Response } from 'express';
import { firebaseAdmin } from './admin';

export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Access Token 없음' });
  }

  try {
    //req.user = await firebaseAdmin.auth().verifyIdToken(accessToken);
    next();
  } catch (error) {
    console.error('토큰 검증 오류:', error);
    return res.status(401).json({ message: '유효하지 않은 토큰' });
  }
};
