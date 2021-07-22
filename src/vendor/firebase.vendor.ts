import admin from "firebase-admin";
import logger from "../utils/logger";
import config from "../config";

logger.debug("initializeApp FIREBASE");
admin.initializeApp({
  credential: admin.credential.cert(config.firebase.serviceAccount),
});

export const dbTimestamp = admin.firestore.FieldValue.serverTimestamp;

export const db = admin.firestore();
export const auth = admin.auth();
