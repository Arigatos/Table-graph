import { combineReducers } from "redux";
import charactersReducer from "./characters/reducer";

const rootReducer = combineReducers({
  charactersReducer: charactersReducer,
});

export default rootReducer;
