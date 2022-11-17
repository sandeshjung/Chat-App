import {
  CREATE_CHAT_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  FETCH_CHAT_FAIL,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
} from "../constants/chatConstants";

export const chatCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_CHAT_SUCCESS:
      return {
        loading: false,
        chats: action.payload,
      };
    case CREATE_CHAT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const fetchChatsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CHAT_SUCCESS:
      return {
        loading: false,
        chat: action.payload,
      };
    case FETCH_CHAT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
