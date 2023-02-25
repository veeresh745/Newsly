import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { FIREBASE_ADMIN_ENV } from "../../config";

const serviceAccount = FIREBASE_ADMIN_ENV as admin.ServiceAccount;

let apps = getApps();
let app = apps[0];
if (!apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default app;
