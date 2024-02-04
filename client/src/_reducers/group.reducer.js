import { groupConstants, status } from "../_constants";

export function group(state = {}, action) {
  switch (action.type) {
    case groupConstants.GET_GROUPS_REQUEST:
      return {
        ...state,
        get_group_status: status.IN_PROGRESS,
        groupList: action.data,
      };
    case groupConstants.GET_GROUPS_SUCCESS:
      return {
        ...state,
        get_group_status: status.SUCCESS,
        groupList: action.data,
      };
    case groupConstants.GET_GROUPS_FAILURE:
      return {
        ...state,
        get_group_status: status.FAILURE,
        groupList: null,
      };

    case groupConstants.CREATE_GROUP_REQUEST:
      return {
        ...state,
        create_group_status: status.IN_PROGRESS,
        createGroup: action.data,
      };
    case groupConstants.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        create_group_status: status.SUCCESS,
        createGroup: action.data,
      };
    case groupConstants.CREATE_GROUP_FAILURE:
      return {
        ...state,
        create_group_status: status.FAILURE,
        createGroup: null,
      };

    case groupConstants.ACCEPT_GROUP_REQUEST:
      return {
        ...state,
        accept_Group_status: status.IN_PROGRESS,
        acceptGroup: action.data,
      };
    case groupConstants.ACCEPT_GROUP_SUCCESS:
      return {
        ...state,
        accept_Group_status: status.SUCCESS,
        acceptGroup: action.data,
      };
    case groupConstants.ACCEPT_GROUP_FAILURE:
      return {
        ...state,
        accept_Group_status: status.FAILURE,
        acceptGroup: null,
      };

    case groupConstants.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        send_message_status: status.IN_PROGRESS,
        lastMessage: action.data,
      };
    case groupConstants.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        send_message_status: status.SUCCESS,
        lastMessage: action.data,
      };
    case groupConstants.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        accept_Group_status: status.FAILURE,
        acceptGroup: null,
      };
    default:
      return state;
  }
}
