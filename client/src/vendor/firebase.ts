import * as firebase from "firebase/app";
import "firebase/auth";
import config from "../config";

console.log("serviceAccount", config.firebase.serviceAccount);
firebase.default.initializeApp(config.firebase.serviceAccount);

export const Auth = firebase.default.auth;
export const auth = Auth();
export type FirebaseUser = firebase.default.User | null;

if (config.firebase.emulator.useEmulator && config.firebase.emulator.authHost)
    auth.useEmulator(config.firebase.emulator.authHost);
