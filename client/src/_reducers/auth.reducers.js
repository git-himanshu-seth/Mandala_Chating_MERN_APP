import { authConstants, status } from "../_constants";

export function auth(state = {}, action) {
  switch (action.type) {
    case authConstants.CREATE_USER_REQUEST:
      return {
        ...state,
        register_status: status.IN_PROGRESS,
        user: action.data,
      };
    case authConstants.CREATE_USER_SUCCESS:
      return {
        ...state,
        register_status: status.SUCCESS,
        user: action.data,
      };
    case authConstants.CREATE_USER_FAILURE:
      return {
        ...state,
        register_status: status.FAILURE,
        user: null,
      };

    case authConstants.LOGOUT_REQUEST:
      return {
        ...state,
        logout_status: status.IN_PROGRESS,
        user: action.data,
      };
    case authConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        logout_status: status.SUCCESS,
        user: action.data,
      };
    case authConstants.LOGOUT_FAILURE:
      return {
        ...state,
        logout_status: status.FAILURE,
        user: null,
      };

    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        login_status: status.IN_PROGRESS,
        user: action.data,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        login_status: status.SUCCESS,
        user: action.data,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        login_status: status.FAILURE,
        user: null,
      };

    case authConstants.GET_USERS_REQUEST:
      return {
        ...state,
        get_user_status: status.IN_PROGRESS,
        userList: null,
      };
    case authConstants.GET_USERS_SUCCESS:
      return {
        ...state,
        get_user_status: status.SUCCESS,
        userList: action.data,
      };
    case authConstants.GET_USERS_FAILURE:
      return {
        ...state,
        get_user_status: status.FAILURE,
        userList: null,
      };

    case authConstants.REGISTER_WITH_GOOGLE_REQUEST:
      return {
        ...state,
        register_with_google_status: status.IN_PROGRESS,
        user: null,
      };
    case authConstants.REGISTER_WITH_GOOGLE_SUCCESS:
      return {
        ...state,
        register_with_google_status: status.SUCCESS,
        user: action.data,
      };
    case authConstants.REGISTER_WITH_GOOGLE_FAILURE:
      return {
        ...state,
        register_with_google_status: status.FAILURE,
        user: null,
      };

    default:
      return state;
  }
}
