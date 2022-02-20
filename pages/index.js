import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "../firebaseConfig";
import Router from "next/router";

export default function Main() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  firebase.initializeApp(firebaseConfig);

  const uiConfig = {
    signInSuccessUrl: "/home", //This URL is used to return to that page when we got success response for phone authentication.
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: "IN",
        recaptchaParameters: {
          type: "image",
          size: "invisible",
          badge: "bottomleft",
        },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: async () => {
        setIsSignedIn(!isSignedIn);
        return false;
      },
    },
    tosUrl: "privacy-policy",
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        Router.push("/home");
        console.log("This is the user: ", user);
      } else {
        // No user is signed in.
        console.log("There is no logged in user");
      }
    });
    if (isSignedIn) {
      Router.push("/home");
    }
  }, [isSignedIn]);

  return (
    <>
      {!isSignedIn ? (
        <>
          <h1 style={{ textAlign: "center" }}>NEXTJS PHONE AUTHENTICATION</h1>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </>
      ) : null}
    </>
  );
}
