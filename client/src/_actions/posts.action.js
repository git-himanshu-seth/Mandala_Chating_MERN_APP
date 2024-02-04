import { postConstants } from "../_constants";
import { postServices } from "../_services";
import { alert } from "../_utilities";
import { showLoader, hideLoader } from "./loader.action";

export const postActions = {
  getPosts,
  createPost,
  updatePost,
};

function getPosts(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: postConstants.GET_POSTS_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    postServices.getPosts(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: postConstants.GET_POSTS_SUCCESS,
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
              type: postConstants.GET_POSTS_FAILURE,
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
            type: postConstants.GET_POSTS_FAILURE,
            data: error.message,
          })
        );
        dispatch(hideLoader(true));
        alert.error(error.message);
      }
    );
  };
}

function createPost(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: postConstants.CREATE_POST_REQUEST,
        data: null,
      })
    );
    dispatch(showLoader(true));
    postServices.createPost(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: postConstants.CREATE_POST_SUCCESS,
              data: response,
            })
          );
          dispatch(hideLoader(true));
          alert.success(response.message);
        } else {
          dispatch(
            dispatchFunction({
              type: postConstants.CREATE_POST_FAILURE,
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
            type: postConstants.CREATE_POST_FAILURE,
            data: error.message,
          })
        );
        dispatch(hideLoader(true));
        alert.error(error.message);
      }
    );
  };
}

function updatePost(data) {
  return (dispatch) => {
    dispatch(
      dispatchFunction({
        type: postConstants.UPDATE_POST_REQUEST,
        data: null,
      })
    );
    postServices.updatePost(data).then(
      (response) => {
        if (response.status === 200) {
          dispatch(
            dispatchFunction({
              type: postConstants.UPDATE_POST_SUCCESS,
              data: response,
            })
          );
          // alert.success("")
        } else {
          dispatch(
            dispatchFunction({
              type: postConstants.UPDATE_POST_FAILURE,
              data: response,
            })
          );
          alert.error(response.message);
        }
      },
      (error) => {
        dispatch(
          dispatchFunction({
            type: postConstants.UPDATE_POST_FAILURE,
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
