import config from "../config";
import { commonFunctions } from "../_utilities";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "@firebase/auth";

export const authServices = {
  createUser,
  signInWithGoogle,
  logOut,
  getUsers,
  createUserDB,
  logIn,
  registerWithGoogle,
};

function createUser(data) {
  return new Promise((resolve, reject) => {
    console.log("DATA", data);
    const auth = getAuth();
    let user = {};

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        if (userCredential) {
          user = await JSON.parse(JSON.stringify(userCredential.user));
          resolve(user);
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function signInWithGoogle(data) {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    let user = {};

    signInWithPopup(auth, provider)
      .then(async (result) => {
        user = await JSON.parse(JSON.stringify(result.user));
        resolve(user);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function getUsers(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null,
    true
  );
  return fetch(`${config.apiUrl}/users/${data.id}`, requestOptions).then(
    (response) => response.json()
  );
}

function createUserDB(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  // Assuming commonFunctions.getRequestOptions is correctly defined
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data), // Include the request payload (data) as a JSON string
    true
  );

  return fetch(`${config.apiUrl}/signup`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      throw error;
    });
}

async function logIn(data) {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Signed in
    let user = {
      status: 200,
      data: JSON.parse(JSON.stringify(userCredential.user)),
    };
    console.log("userddd", user);
    // Add API call with GET method
    const apiUrl = `http://localhost:3000/api/v1/mandala/user/${user?.data?.uid}`;
    const response = await fetch(apiUrl, {
      method: "GET",
    });
    if (response.status === 200) {
      const responseData = await response.json();
      user.data = { ...user.data, ...responseData.data };
    } else {
      user.apiError = {
        errorCode: response.status,
        errorMessage: response.statusText,
      };
    }
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { errorCode, errorMessage };
  }
}

async function registerWithGoogle(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data), // Include the request payload (data) as a JSON string
    true
  );
  return fetch(`${config.apiUrl}/signup`, requestOptions).then((response) =>
    response.json()
  );
}

function logOut(data) {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        resolve({});
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}
