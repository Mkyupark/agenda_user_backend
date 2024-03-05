import admin from 'firebase-admin';
import adminSDK from './admin_sdk.json';
import type { ServiceAccount } from 'firebase-admin';

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(adminSDK as ServiceAccount),
});
