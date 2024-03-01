import { Storage } from 'firebase-admin/lib/storage';

export const storage = new Storage();

export const bucketName = process.env.BUCKET_NAME;
