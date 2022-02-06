import { darkTheme } from "../../styles/dark-mode";
import { lightTheme } from "../../styles/light-mode";

let initList = [
  { id: 1, title: "Complete online JavaScript course", isCompleted: true },
  {
    id: 2,
    title: "Jog around the park 3x",
    isCompleted: false,
  },
  {
    id: 3,
    title: "10 minutes meditation",
    isCompleted: false,
  },
  { id: 4, title: "Read for 1 hour", isCompleted: false },
  { id: 5, title: "Pick up groceries", isCompleted: false },
  {
    id: 6,
    title: "Complete Todo App on Frontend Mentor",
    isCompleted: false,
  },
];
const theme = { mode: "dark", style: darkTheme };

const init = { initList, theme };

const rootReducer = (state = init, action) => {
  switch (action.type) {
    case "ADD_TO_LIST":
      console.log("adding to list...");
      initList.unshift(action.payload);
      //state.initList.push(action.payload); ->  this puts new item at the bottom of the stack
      return { ...state, initList };

    case "UPDATE":
      console.log("updating list..");
      initList = action.payload;
      return { ...state, initList };

    case false:
      theme.mode = "light";
      theme.style = lightTheme;
      return { ...state };

    case true:
      theme.mode = "dark";
      theme.style = darkTheme;
      return { ...state };

    default:
      return state;
  }
};

export default rootReducer;
