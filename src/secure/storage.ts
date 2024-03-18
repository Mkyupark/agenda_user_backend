import { Storage } from '@google-cloud/storage';

// multer와 multer-google-storage를 사용하여 업로드 객체 생성
//   - bucket: Cloud Storage버킷 이름
//   - projectId: Cloud Storage버킷이 포함된 프로젝트 ID
//   - keyFilename: 위에서 작업한 키파일 경로와 이름
//   - filename: Cloud Storage에 저장될 파일 경로 및 이름
//      “quizimage” 폴더에 저장하고 중복 방지를 위해 현재 시간을 prefix로 추가함.

const projectId: string = 'gs-teaching';
const keyFilename: string = __dirname + '/mykey.json';
const bucketName: string = 'gs_teaching_storage';
const fileBucketName: string = 'gs_teaching_filestorage';

export const coverStorage = () => {
  const storage = new Storage({
    projectId,
    keyFilename,
  });
  const bucket = storage.bucket(bucketName);
  return bucket;
};
export const fileStorage = () => {
  const storage = new Storage({
    projectId,
    keyFilename,
  });
  const bucket = storage.bucket(fileBucketName);
  return bucket;
};
