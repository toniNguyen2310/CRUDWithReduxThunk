import {
  FETCH_NAME_REQUEST,
  FETCH_NAME_SUCCESS,
  FETCH_NAME_ERROR,
  CREATE_NAME_REQUEST,
  CREATE_NAME_SUCCESS,
  CREATE_NAME_ERROR,
  DELETE_NAME_SUCCESS,
} from "../action/types";

const initialState = {
  listData: [],
  isLoading: false,
  isError: false,
};
const listNameReducer = (state = initialState, action) => {
  switch (action.type) {
    //CASE FETCH DATA
    case FETCH_NAME_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_NAME_SUCCESS:
      return {
        ...state,
        listData: action.payload,
        isLoading: false,
        isError: false,
      };

    case FETCH_NAME_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    //CASE CREATE DATA
    case CREATE_NAME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_NAME_SUCCESS:
      return {
        ...state,
        listData: [...state.listData, action.payload],
        isLoading: false,
      };

    //DELETE

    default:
      return state;
  }
};

export default listNameReducer;
