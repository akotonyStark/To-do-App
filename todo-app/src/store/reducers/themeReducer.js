import { darkTheme } from "../../styles/dark-mode";
import { lightTheme } from "../../styles/light-mode";

const init = { mode: "dark", style: darkTheme };

const themeReducer = (state = init, action) => {
  switch (action.type) {
    case false:
      return { mode: "light", style: lightTheme };
    default:
      return init;
  }
};

export default themeReducer;
