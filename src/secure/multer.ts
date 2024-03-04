const Multer = require('multer');
import util from 'util';

//   - 업로드 파일 제한 용량: 5MB
const maxSize = 5 * 1024 * 1024;

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single('file');

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
