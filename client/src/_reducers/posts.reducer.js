import { postConstants, status } from "../_constants";

export function post(state = {}, action) {
  switch (action.type) {
    case postConstants.GET_POSTS_REQUEST:
      return {
        ...state,
        get_post_status: status.IN_PROGRESS,
        posts: action.data,
      };
    case postConstants.GET_POSTS_SUCCESS:
      return {
        ...state,
        get_post_status: status.SUCCESS,
        posts: action.data,
      };
    case postConstants.GET_POSTS_FAILURE:
      return {
        ...state,
        get_post_status: status.FAILURE,
        posts: null,
      };

    case postConstants.CREATE_POST_REQUEST:
      return {
        ...state,
        create_post_status: status.IN_PROGRESS,
        create_post_res: null,
      };
    case postConstants.CREATE_POST_SUCCESS:
      return {
        ...state,
        create_post_status: status.SUCCESS,
        create_post_res: action.data,
      };
    case postConstants.CREATE_POST_FAILURE:
      return {
        ...state,
        create_post_status: status.FAILURE,
        create_post_res: null,
      };

    case postConstants.UPDATE_POST_REQUEST:
      return {
        ...state,
        update_post_status: status.IN_PROGRESS,
        update_post_res: null,
      };
    case postConstants.UPDATE_POST_SUCCESS:
      return {
        ...state,
        update_post_status: status.SUCCESS,
        update_post_res: action.data,
      };
    case postConstants.UPDATE_POST_FAILURE:
      return {
        ...state,
        update_post_status: status.FAILURE,
        update_post_res: null,
      };
    default:
      return state;
  }
}
