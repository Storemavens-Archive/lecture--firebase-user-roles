import React, { useContext, useEffect, useState } from "react";
import { auth, FirebaseUser } from "../vendor/firebase";

interface AuthContextProps {
  isSignedIn: boolean;
  user: FirebaseUser;
}

const AuthContext = React.createContext<AuthContextProps>({
  isSignedIn: false,
  user: null,
});

interface Props {
  children: React.ReactNode;
}
export const AuthProvider = (props: Props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseUser>(null);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((_user) => {
      setIsSignedIn(!!_user?.uid);
      setUser(_user);
      setIsLoading(false);
    });

    // Un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, [setIsSignedIn]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
