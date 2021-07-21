import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// import { useAuth } from "../../state/auth.state";
import { Auth, auth } from "../vendor/firebase";

const authUiConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    Auth.GoogleAuthProvider.PROVIDER_ID,
    // Auth.FacebookAuthProvider.PROVIDER_ID,
  ]
};

interface Props {}
const SignIn = (props: Props) => {

  return (
    <div className="SignIn">
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default SignIn;
