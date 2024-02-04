import { friendServices } from "../_services";
import { friendConstant } from "../_constants";
import { alert, commonFunctions } from "../_utilities";
import { showLoader, hideLoader } from "./loader.action";

export const friendActions = {
  getFriendsList,
  sendFrienReq,
  acceptReq,
  getMessages,
  sendMessage,
};

function getFriendsList(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.GET_FRIENDS_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    friendServices.getFriendsList(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: friendConstant.GET_FRIENDS_SUCCESS,
              data: response.data,
            })
          );
          if (response.data.length === 0) {
            alert.error(response.message);
          }
          dispatch(hideLoader(true));
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.GET_FRIENDS_FAILURE,
              data: null,
            })
          );
          dispatch(hideLoader(true));
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: friendConstant.GET_FRIENDS_FAILURE,
            data: error.message,
          })
        );
        dispatch(hideLoader(true));
        alert.error(error.message);
      }
    );
  };
}

function sendFrienReq(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.SEND_FRIEND_REQ_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    friendServices.sendFrienReq(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: friendConstant.SEND_FRIEND_REQ_SUCCESS,
              data: response,
            })
          );
          alert.success(response.message);
          dispatch(hideLoader(true));
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.SEND_FRIEND_REQ_FAILURE,
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
            type: friendConstant.SEND_FRIEND_REQ_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
        dispatch(hideLoader(true));
      }
    );
  };
}

function acceptReq(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.ACCEPT_FRIRND_REQ_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    friendServices.acceptReq(data).then(
      (response) => {
        if (response) {
          if (response.status === 200) {
            dispatch(
              dispatchFunction({
                type: friendConstant.ACCEPT_FRIRND_REQ_SUCCESS,
                data: response,
              })
            );
            alert.success(response.message);
            dispatch(hideLoader(true));
          } else {
            dispatch(
              dispatchFunction({
                type: friendConstant.ACCEPT_FRIRND_REQ_FAILURE,
                data: response,
              })
            );
            alert.error(response.message);
            dispatch(hideLoader(true));
          }
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.ACCEPT_FRIRND_REQ_FAILURE,
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
            type: friendConstant.ACCEPT_FRIRND_REQ_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
        dispatch(hideLoader(true));
      }
    );
  };
}

function getMessages(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: friendConstant.GET_MESSAGE_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    friendServices.getMessages(data).then(
      (response) => {
        if (response) {
          if (response.status === 200) {
            dispatch(
              dispatchFunction({
                type: friendConstant.GET_MESSAGE_SUCCESS,
                data: response.data,
              })
            );
            alert.success(response.message);
            dispatch(hideLoader(true));
          } else {
            dispatch(
              dispatchFunction({
                type: friendConstant.GET_MESSAGE_FAILURE,
                data: response,
              })
            );
            alert.error(response.message);
            dispatch(hideLoader(true));
          }
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.GET_MESSAGE_FAILURE,
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
            type: friendConstant.GET_MESSAGE_FAILURE,
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
        type: friendConstant.SEND_MESSAGE_REQUEST,
        data: null,
      })
    );
    // dispatch(showLoader(true));
    friendServices.sendMessage(data).then(
      (response) => {
        if (response) {
          if (response.status === 200) {
            dispatch(
              dispatchFunction({
                type: friendConstant.SEND_MESSAGE_SUCCESS,
                data: response,
              })
            );
            alert.success(response.message);
            // dispatch(hideLoader(true));
          } else {
            dispatch(
              dispatchFunction({
                type: friendConstant.SEND_MESSAGE_FAILURE,
                data: response,
              })
            );
            alert.error(response.message);
            // dispatch(hideLoader(true));
          }
        } else {
          dispatch(
            dispatchFunction({
              type: friendConstant.SEND_MESSAGE_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
          // dispatch(hideLoader(true));
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: friendConstant.SEND_MESSAGE_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
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
