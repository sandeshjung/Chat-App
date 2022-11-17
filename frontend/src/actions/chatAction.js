import axios from "axios";
import {
  CREATE_CHAT_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  FETCH_CHAT_FAIL,
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
} from "../constants/chatConstants";

export const createChat = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_CHAT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/chat", { userId }, config);
    // console.log(data);

    dispatch({
      type: CREATE_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getChats = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_CHAT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/chat`, config);

    dispatch({
      type: FETCH_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
