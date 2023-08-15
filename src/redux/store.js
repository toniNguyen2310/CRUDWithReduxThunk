import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../redux/reducer/rootReducer";

const composeEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, composeEnhancers);
export default store;
