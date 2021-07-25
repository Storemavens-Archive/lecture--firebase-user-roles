import React from "react";
import "./App.css";
import { useAuth } from "./auth/auth.state";
import SignIn from "./auth/SignIn.component";
import SignOut from "./auth/SignOut.component";
import GetStory from "./GetStory.component";
import NewStory from "./NewStory.component";
import { FirebaseUser } from "./vendor/firebase";

const SignedInView = ({ user }: { user: FirebaseUser }) => {
  return (
    <div className="SignedInView">
      <h1>Signed in as: {user?.displayName}</h1>
      <SignOut />
      <hr />
      <h2>User</h2>
      <pre>{JSON.stringify(user?.toJSON(), null, 2)}</pre>
      <hr />
      <h2>New Story</h2>
      <NewStory userId={user?.email} />
      <hr />
      <h2>Get Story</h2>
      <GetStory userId={user?.email} />
    </div>
  );
};

const NotSignedInView = () => {
  return (
    <div className="NotSignedInView">
      <h1>Not Signed In</h1>
      <SignIn />
    </div>
  );
};

function App() {
  const { isSignedIn, user } = useAuth();
  return (
    <div className="App">
      {isSignedIn ? <SignedInView user={user} /> : <NotSignedInView />}
    </div>
  );
}

export default App;
