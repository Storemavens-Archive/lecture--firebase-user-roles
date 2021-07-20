import { ServiceAccount } from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

interface EnvironmentProps {
  port: number;
  firebase: {
    serviceAccount: ServiceAccount;
  };
}
const environments: { [env: string]: EnvironmentProps } = {};


environments.production = {
  port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 5000,
  firebase: {
    serviceAccount:{
      projectId: process.env.FIREBASE_PROJECT_ID || "",
      privateKey:
        typeof process.env.FIREBASE_PRIVATE_KEY === "string"
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : "",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
    }
  }
};

environments.development = {
  port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 4000,
  firebase: {
    serviceAccount:{
      projectId: process.env.FIREBASE_PROJECT_ID || "",
      privateKey:
        typeof process.env.FIREBASE_PRIVATE_KEY === "string"
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : "",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
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
