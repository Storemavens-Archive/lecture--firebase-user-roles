import dotenv from "dotenv";

dotenv.config();

type FirebaseServiceAccount = {
  projectId?: string;
  clientEmail?: string;
  privateKey?: string;
  apiKey?: string;
  authDomain?: string;
  storageBucket?: string;
  databaseURL?: string;
  messagingSenderId?: string;
  appId?: string;
};
interface EnvironmentProps {
  firebase: {
    serviceAccount: FirebaseServiceAccount;
    emulator: {
      useEmulator: boolean;
      authHost?: string;
    };
  };
}
const environments: { [env: string]: EnvironmentProps } = {};


environments.production = {
  firebase: {
    serviceAccount: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
        authDomain: "sm-polarbeam.firebaseapp.com",
        databaseURL: "https://sm-polarbeam.firebaseio.com",
        projectId: "lecture-user-permissions",
    },   emulator: {
      useEmulator: true,
      authHost: process.env.FIREBASE_AUTH_EMULATOR || "http://localhost:9001",
    }
  }
};

environments.development = {
  firebase: {
    serviceAccount: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDhO4oY1HaJF55_b5C6KxMtS7yFbuaAMiA",
        authDomain: "sm-polarbeam.firebaseapp.com",
        databaseURL: "https://sm-polarbeam.firebaseio.com",
        projectId: "lecture-user-permissions",
    },
    emulator: {
        useEmulator: true,
        authHost: process.env.FIREBASE_AUTH_EMULATOR || "http://localhost:9001",
    }
  }
};

// Determine which environment was passed as a command-line argument
const currentEnvironment =
  typeof process.env.NODE_ENV === "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// Check that the current environment is one of the environment defined above,
// if not default to prodution
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.production;

export default environmentToExport;
