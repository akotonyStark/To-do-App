import React from "react";
import App from "./App";
import darkTheme from "./styles/dark-mode";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getActive, getCompleted } from "./helperFunctions";
import rootReducer from "./store/reducers/rootReducer";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders App without crashing", () => {
  act(() => {
    render(<App />, container);
  });
});

it("toggle theme works well", () => {
  const onChange = jest.fn();
  act(() => {
    render(<App />, container);
  });

  // get a hold of the button element, and trigger some clicks on it
  const button = document.querySelector("[data-testid=toggle-button]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});

const list = [
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

describe("App", () => {
  it("should return active items", () => {
    const active = getActive(list);
    expect(active).toBeTruthy();
  });

  it("should return completed items", () => {
    const completed = getCompleted(list);
    expect(completed).toBeTruthy();
  });

  it("should add new item to a list", () => {
    const theme = { mode: "dark", style: darkTheme };
    const init = { initList: list, theme };
    const state = init;
    const payload = {
      id: 69,
      title: "Watch Spiderman  No Way Home ASAP",
      isCompleted: false,
    };
    const newState = rootReducer(state, {
      type: "ADD_TO_LIST",
      payload,
    });
    expect(newState.initList.length).toEqual(list.length + 1);
  });

  it("should update item on a list", () => {
    const theme = { mode: "dark", style: darkTheme };
    const state = { initList: list, theme };
    const item = {
      id: 1,
      title: "Watch Spiderman  No Way Home ASAP",
      isCompleted: true,
    };
    const index = list.findIndex((todo) => todo.id === item.id);
    list[index] = item;

    const initList = [...list];

    const payload = initList;
    const newState = rootReducer(state, {
      type: "UPDATE",
      payload,
    });
    expect(newState.initList.length).toEqual(list.length);
  });
});
