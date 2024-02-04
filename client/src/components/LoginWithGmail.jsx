import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseAuthManager from "../utilis/services/firebase";
import googleLogo from "../_assets/images/googleLogo.svg";
import { useDispatch } from "react-redux";
import { authActions } from "../_actions";
const GoogleLoginComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuthManager.auth,
      (result) => {
        if (result) {
          const { displayName, email } = result;
          setUserData({ displayName, email });

          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuthManager.auth, provider)
      .then((result) => {
        const { displayName, email, uid } = result.user;
        console.log("uid", result);
        setUserData({ name: displayName, email });
        dispatch(
          authActions.registerWithGoogle({
            ...result.user,
            name: displayName,
            googleId: uid,
          })
        );
        setIsLoggedIn(true);
      })
      .catch((error) => {});
  };

  return (
    <>
      <Button
        onClick={SignUpUsingGoogle}
        variant="contained"
        style={{
          backgroundColor: "white",
          width: "100%",
          color: "#1565c0",
          // borderRadius: "px", // Adjust the border radius as needed
          border: "2px solid #1565c0", // Use Google's primary color for the border
          // display: "flex",
          alignItems: "center",
          padding: "4px",
        }}
      >
        <img
          src={googleLogo}
          alt="Google Logo"
          height={"25px"}
          style={{ marginRight: "8px" }}
        />
        Sign in with Google
      </Button>
    </>
  );
};

export default GoogleLoginComponent;
