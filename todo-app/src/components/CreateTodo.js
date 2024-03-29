import React, { createRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../store/actions";

function CreateTodo() {
  const appSettings = useSelector((state) => state.theme);
  const masterList = useSelector((state) => state.initList);
  const { mode, style } = appSettings;
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const inputRef = createRef(null);

  const handleFocus = () => {
    inputRef.current.style.outline = "none";
    mode === "dark"
      ? (inputRef.current.style.color = "hsl(234, 39%, 85%)")
      : (inputRef.current.style.color = "hsl(235, 19%, 35%)");
  };

  const handleAddItem = () => {
    let newItem = {
      //id: Math.floor(Math.random(1) * 10000000),
      id: masterList.length + 1,
      title: todo,
      isCompleted: false,
    };
    if (!todo) {
      alert("Please input some text before adding");
      return;
    }
    dispatch(addItem(newItem));
    setTodo("");
  };
  return (
    <div>
     
        <div className="inputField" style={mode === "dark" ? style.inputField : style.inputFieldLight}>
          <div>
            <div
              className="addTodo"
              style={mode === "dark" ?  style.unChecked : style.unCheckedLight}
              onClick={handleAddItem}
            ></div>
          </div>
          <input
            style={ mode === "dark" ?  style.textInput : style.textInputLight}
            value={todo}
            name="todo-input"
            placeholder="Create a new todo..."
            onChange={(e) => setTodo(e.target.value)}
            onFocus={handleFocus}
            ref={inputRef}
            onKeyDown={(e) => (e.key === "Enter" ? handleAddItem() : null)}
          />
        </div>
      
    </div>
  );
}

export default CreateTodo;
