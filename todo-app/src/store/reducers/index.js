import listReducer from "./listReducer";
import themeReducer from "./themeReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  initList: listReducer,
  theme: themeReducer,
});

export default rootReducer;
