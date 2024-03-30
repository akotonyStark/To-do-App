import React from "react";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListGroupContent from "../ListGroupContent";
import App from "../../App";
import { Provider } from "react-redux";
import rootReducer from "../../store/reducers/rootReducer";
import { createStore } from "redux";

const store = createStore(
    rootReducer,
  );

const MockComponent = () => {
    return(
        <Provider store={store}>
             <ListGroupContent />
        </Provider>
    )
   
}

it('should render correct amount of incomplete tasks', async() => {
    render(<MockComponent/>)
    const  paragraphElement = screen.getByText(/5 items left/i)
    expect(paragraphElement).toBeTruthy()
})