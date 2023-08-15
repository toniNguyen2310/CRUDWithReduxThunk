import { combineReducers } from "redux";
import listNameReducer from "./nameReducer";

const rootReducer = combineReducers({
  listName: listNameReducer,
});
export default rootReducer;
