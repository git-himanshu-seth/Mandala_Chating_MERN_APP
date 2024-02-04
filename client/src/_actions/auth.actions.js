import { authConstants } from "../_constants";
import { authServices } from "../_services";
import { alert, commonFunctions } from "../_utilities";
import { showLoader, hideLoader } from "./loader.action";

export const authActions = {
  createUser,
  logout,
  getUsers,
  login,
  registerWithGoogle,
};

function createUser(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.CREATE_USER_REQUEST,
        data: null,
      })
    );
    authServices.createUser(data).then(
      (response) => {
        if (response.email && response?.uid) {
          authServices
            .createUserDB({
              name: data?.firstName + " " + data?.lastName,
              email: data?.email,
              googleId: `${response?.uid}`,
            })
            .then((res) => {
              if (res) {
                dispatch(
                  dispatchFunction({
                    type: authConstants.CREATE_USER_SUCCESS,
                    data: { ...response, ...res.data },
                  })
                );
              }
            });
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.CREATE_USER_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.CREATE_USER_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function login(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.LOGIN_REQUEST,
        data: null,
      })
    );
    authServices.logIn(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: authConstants.LOGIN_SUCCESS,
              data: response.data,
            })
          );
          alert.success("Login sucessfully");
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.LOGIN_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.LOGIN_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function registerWithGoogle(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.REGISTER_WITH_GOOGLE_REQUEST,
        data: null,
      })
    );
    authServices.registerWithGoogle(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: authConstants.REGISTER_WITH_GOOGLE_SUCCESS,
              data: response.data,
            })
          );
          alert.success(response?.message);
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.REGISTER_WITH_GOOGLE_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.REGISTER_WITH_GOOGLE_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
      }
    );
  };
}

function getUsers(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.GET_USERS_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    authServices.getUsers(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: authConstants.GET_USERS_SUCCESS,
              data: response,
            })
          );
          if (response.data.length === 0) {
            alert.error(response?.message);
          }
          dispatch(hideLoader(true));
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.GET_USERS_FAILURE,
              data: response,
            })
          );
          alert.error(response?.message);
          dispatch(hideLoader(true));
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.GET_USERS_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
        dispatch(hideLoader(true));
      }
    );
  };
}

function logout() {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: authConstants.LOGOUT_REQUEST,
        data: null,
      })
    );
    authServices.logOut().then(
      (response) => {
        if (response) {
          dispatch(
            dispatchFunction({
              type: authConstants.LOGOUT_SUCCESS,
              data: response,
            })
          );
          alert.success("Logout successfully");
        } else {
          dispatch(
            dispatchFunction({
              type: authConstants.LOGOUT_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: authConstants.LOGOUT_FAILURE,
            data: error.message,
          })
        );
        alert.error(error.message);
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
