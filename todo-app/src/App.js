import "./App.css";
import MainLayout from "./layouts/MainLayout";
import React, { StrictMode } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";

//creating globalized state
const store = createStore(
  rootReducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <StrictMode>
      <div className="app">
        <Provider store={store}>
          <MainLayout />
        </Provider>
      </div>
    </StrictMode>
  );
}

export default App;
