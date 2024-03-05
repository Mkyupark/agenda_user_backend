// import { RequestHandler } from 'express';
// import multer from 'multer';
// import { memoryStorage } from 'multer';
// import { promisify } from 'util';

// // 업로드 파일 제한 용량: 5MB
// const maxSize = 5 * 1024 * 1024;

// const processFile: RequestHandler = multer({
//   storage: memoryStorage(),
//   limits: { fileSize: maxSize },
// }).single('file');

// const processFileMiddleware = promisify(processFile);
// export default processFileMiddleware;

const Multer = require('multer');

import util from 'util';

//   - 업로드 파일 제한 용량: 5MB
const maxSize = 5 * 1024 * 1024;

export const processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single('file');

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
