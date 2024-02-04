import { groupConstants } from "../_constants";
import { groupServices } from "../_services";
import { alert } from "../_utilities";
import { showLoader, hideLoader } from "./loader.action";

export const groupActions = {
  getGroups,
  createGroup,
  acceptGroupRequest,
  sendMessage,
};

function getGroups(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: groupConstants.GET_GROUPS_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    groupServices.getGroups(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: groupConstants.GET_GROUPS_SUCCESS,
              data: response.data,
            })
          );
          if (response?.data?.length === 0) {
            alert.error(response.message);
          }
          dispatch(hideLoader(true));
        } else {
          dispatch(
            dispatchFunction({
              type: groupConstants.GET_GROUPS_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
          dispatch(hideLoader(true));
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: groupConstants.GET_GROUPS_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
        dispatch(hideLoader(true));
      }
    );
  };
}

function createGroup(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: groupConstants.CREATE_GROUP_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    groupServices.createGroup(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: groupConstants.CREATE_GROUP_SUCCESS,
              data: response,
            })
          );
          dispatch(hideLoader(true));
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: groupConstants.CREATE_GROUP_FAILURE,
              data: response,
            })
          );
          dispatch(hideLoader(true));
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: groupConstants.CREATE_GROUP_FAILURE,
            data: error.message,
          })
        );
        dispatch(hideLoader(true));
        alert.error(error.message);
      }
    );
  };
}

function acceptGroupRequest(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: groupConstants.ACCEPT_GROUP_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    groupServices.acceptGroupRequest(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: groupConstants.ACCEPT_GROUP_SUCCESS,
              data: response,
            })
          );
          alert.success(response.message);
          dispatch(hideLoader(true));
        } else {
          dispatch(
            dispatchFunction({
              type: groupConstants.ACCEPT_GROUP_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
          dispatch(hideLoader(true));
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: groupConstants.ACCEPT_GROUP_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
        dispatch(hideLoader(true));
      }
    );
  };
}

function sendMessage(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: groupConstants.SEND_MESSAGE_REQUEST,
        data: null,
      })
    );
    // dispatch(showLoader(true));
    groupServices.sendMessage(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: groupConstants.SEND_MESSAGE_SUCCESS,
              data: response,
            })
          );
          // alert.success(response.message);
          // dispatch(hideLoader(true));
        } else {
          dispatch(
            dispatchFunction({
              type: groupConstants.SEND_MESSAGE_FAILURE,
              data: response,
            })
          );
          // alert.error(response.message);
          // dispatch(hideLoader(true));
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: groupConstants.SEND_MESSAGE_FAILURE,
            data: error.message,
          })
        );
        // alert.error(error.message);
        // dispatch(hideLoader(true));
      }
    );
  };
}

function dispatchFunction(data) {
  return {
    type: data.type,
    data: data.data,
  };
}
