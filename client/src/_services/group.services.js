import config from "../config";
import { commonFunctions } from "../_utilities";

export const groupServices = {
  getGroups,
  createGroup,
  acceptGroupRequest,
  sendMessage,
};

function getGroups(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null,
    true
  );
  return fetch(`${config.apiUrl}/get_groups/${data.id}`, requestOptions).then(
    (response) => response.json()
  );
}

function createGroup(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return fetch(`${config.apiUrl}/create_group`, requestOptions).then(
    (response) => response.json()
  );
}

function acceptGroupRequest(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return fetch(`${config.apiUrl}/handle_group_request`, requestOptions).then(
    (response) => response.json()
  );
}

function sendMessage(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data),
    true
  );
  return fetch(`${config.apiUrl}/send_group_message`, requestOptions).then(
    (response) => response.json()
  );
}
