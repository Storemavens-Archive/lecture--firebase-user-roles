import admin from "firebase-admin";
import config from "../config";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();

