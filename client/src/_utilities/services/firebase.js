import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { UseDispatch } from "react-redux";
class FirebaseAuthManager {
  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    // Variable to store user data
    this.userData = "";
    this.isUser = "";

    // Initialize auth state change listener
    this.initAuthStateListener();
  }

  async loginWithEmailAndPassword(email, password) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      // Login successful logic
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  }

  async signInWithEmailAndPasswordWithFirebase(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      // Signed up logic
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      // Handle signup error
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      // Logout successful logic
    } catch (error) {
      // Handle logout error
      console.error(error);
    }
  }

  async initAuthStateListener() {
    return new Promise((resolve, reject) => {
      try {
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}

const firebaseAuthManager = new FirebaseAuthManager();
export default firebaseAuthManager;
