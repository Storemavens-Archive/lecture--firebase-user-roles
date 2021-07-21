import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

const config = functions.firebaseConfig();
if (config) {
  admin.initializeApp(config);
}

const USERS_COLLECTION = "users";
const dbTimestamp = admin.firestore.FieldValue.serverTimestamp;
const db = admin.firestore();

const createUser = async (
  userEmail: string,
  displayName?: string,
  avatar?: string
) => {
  const usersRef = db.collection(USERS_COLLECTION);
  const userDoc = usersRef.doc(userEmail);
  const newUser = {
    id: userDoc.id,
    displayName: displayName || "",
    email: userEmail!,
    avatar: avatar || "",
    stories: [],
    createdAt: dbTimestamp() as unknown as number, // weirdly, this is how they accept timestamps
    updatedAt: dbTimestamp() as unknown as number,
  };
  await userDoc.set(newUser);

  return newUser;
};

export const onCreateUser = functions.auth.user().onCreate(async (user) => {
  functions.logger.info("onCreateUser");
  if (!user || !user.email) {
    functions.logger.info("onCreateUser / user or email not provided");
    return;
  }

  const newUser = await createUser(user.email, user.displayName, user.photoURL);
  functions.logger.info("onCreateUser / added new user", newUser);
});

export const onDeleteUser = functions.auth.user().onDelete(() => {});
