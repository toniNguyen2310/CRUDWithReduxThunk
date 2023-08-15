import axios from "axios";
import {
  FETCH_NAME_REQUEST,
  FETCH_NAME_SUCCESS,
  FETCH_NAME_ERROR,
  CREATE_NAME_REQUEST,
  CREATE_NAME_SUCCESS,
  CREATE_NAME_ERROR,
  DELETE_NAME_SUCCESS,
} from "./types";

export const fetchAllData = () => {
  return async (dispatch) => {
    dispatch(fetchNameRequest());
    try {
      const res = await axios.get(
        "https://64c9473cb2980cec85c21b70.mockapi.io/todoList"
      );
      dispatch(fetchNameRequestSuccess(res.data));
    } catch (error) {
      console.log("error>>> ", error);
      dispatch(fetchNameRequestError());
    }
  };
};

export const fetchNameRequest = () => {
  return {
    type: FETCH_NAME_REQUEST,
  };
};

export const fetchNameRequestSuccess = (listData) => {
  return {
    type: FETCH_NAME_SUCCESS,
    payload: listData,
  };
};

export const fetchNameRequestError = () => {
  return {
    type: FETCH_NAME_ERROR,
  };
};

//CREATE
export const fetchCreateRequest = (newdata) => {
  return async (dispatch) => {
    dispatch(createNameRequest());
    try {
      let res = await axios.post(
        "https://64c9473cb2980cec85c21b70.mockapi.io/todoList",
        newdata
      );
      if (res && res.data) {
        dispatch(createNameSuccess(res.data));

        // dispatch(fetchAllData());
        // có thể call rồi fetch lại toàn bộ ntn
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNameRequest = () => {
  return {
    type: CREATE_NAME_REQUEST,
  };
};

export const createNameSuccess = (newData) => {
  return {
    type: CREATE_NAME_SUCCESS,
    payload: newData,
  };
};

//DELETE
export const fetchDeleteRequest = (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.delete(
        `https://64c9473cb2980cec85c21b70.mockapi.io/todoList/${data.id}`
      );
      if (res && res.data) {
        // dispatch(deleteNameSuccess());
        dispatch(fetchAllData());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//UPDATE-SAVE
export const fetchEditRequest = (newData) => {
  return async (dispatch) => {
    try {
      let res = await axios.put(
        `https://64c9473cb2980cec85c21b70.mockapi.io/todoList/${newData.id}`,
        newData
      );
      if (res && res.data) {
        dispatch(fetchAllData());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
