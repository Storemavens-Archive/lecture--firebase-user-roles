import React from "react";
import { auth } from "../vendor/firebase";

interface Props {}
const SignOut = (props: Props) => {
  const onSignOutClick = async () => {
    await auth.signOut();
  };

  return (
    <div className="SignOut">
      <button type="button" onClick={() => onSignOutClick()}>
        Sign-out
      </button>
    </div>
  );
};

export default SignOut;
