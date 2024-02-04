import { store } from "../_store";
export const commonFunctions = {
  getRequestOptions,
  validateEmail,
  validateNumeric,
  onLogout,
  getAccessToken,
};

function getRequestOptions(type, extraHeaders, body, bNoToken) {
  let authHeader = {};
  if (bNoToken) {
    const currentState = store.getState();
    const userInfo = currentState.auth.user;
    const accessToken = userInfo ? userInfo.token : null;
    authHeader = {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjViNjAyZTBjYTFmNDdhOGViZmQxMTYwNGQ5Y2JmMDZmNGQ0NWY4MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWFsLW1lZGlhLWFwcC01MmE1OSIsImF1ZCI6InNvY2lhbC1tZWRpYS1hcHAtNTJhNTkiLCJhdXRoX3RpbWUiOjE3MDY1MTI4MjksInVzZXJfaWQiOiI3b2NUZThHRzhaYnNrbXl4VDVDV3hkWXFheXYxIiwic3ViIjoiN29jVGU4R0c4WmJza215eFQ1Q1d4ZFlxYXl2MSIsImlhdCI6MTcwNjUxMjgyOSwiZXhwIjoxNzA2NTE2NDI5LCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0MUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kRh3z7sHSeyQoyl6MxHsgD4CpgGI4TZHQIW-D32gPMo2RUEyrK8HSKnTszsue0KIo8S3TMyX7qbzXOY7HTHkjZJ8dYmKjPBCemuM_3ElAqlkfAdqvZDWGTbsXZTHoeBys8XAJ04HT6qhHppQ_DEgKy8m6_t7xlkOxwx1VdofITPcGxM1xQm1GXHQekENEdTNsbro_BJaYiCvB4dKstKkWYdb3joZeSEXElz8MSpcmHitQblEtYiXD4izSlaDf0IyFz0-9oWFtTSQH55JiT9rYulddelwBq8e3UwyiQWdRWIwo6ebvpI3MqD3e_NVE3gtzttZzhm1vN4FhmJvL7fIWg`,
    };
  }
  let requestOptions = {
    method: type,
    headers: {
      ...extraHeaders,
      ...authHeader,
    },
  };
  if (body) {
    requestOptions["body"] = body;
  }
  return requestOptions;
}

function getAccessToken() {
  const currentState = store.getState();
  const userInfo = currentState.auth.user;
  const accessToken = userInfo ? userInfo.token : null;
  return accessToken;
}

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateNumeric(number) {
  return /^\d+$/.test(number);
}

function onLogout() {
  let language = localStorage.getItem("language");
  localStorage.clear();
  if (!language) {
    language = "en";
  }
  localStorage.setItem("language", language);
}
