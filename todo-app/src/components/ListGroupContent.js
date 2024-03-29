import React, { useState, useEffect, useRef } from "react";
import check from "../images/icon-check.svg";
import close from "../images/icon-cross.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../store/actions";
import {
  checkTodo,
  getActive,
  getCompleted,
  highlightActiveFilter,
  swapTodos,
} from "../helperFunctions";

function ListGroupContent() {
  const list = useSelector((state) => state.initList);
  const appSettings = useSelector((state) => state.theme);
  const { mode, style } = appSettings;
  const [, setIsDragged] = useState(false);
  const [isItemFocus, setIsItemFocus] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filteredList, setFilteredList] = useState(list);
  const dispatch = useDispatch();
  const allForOneRef = useRef(null);

  useEffect(() => {
    setFilteredList(list);
    return () => {
      //cleanup
    };
  }, [list, isItemFocus]);

  useEffect(() => {
    //active all link on mount
    allForOneRef.current.children[0].className = "Link";
    return () => {};
  }, []);

  const filterList = (list, category) => {
    const active = getActive(list);
    const completed = getCompleted(list);
    highlightActiveFilter(allForOneRef, category);

    switch (category) {
      case "active":
        return active;
      case "completed":
        return completed;
      case "all":
        return list;
      default:
        return active;
    }
  };

  let originId = 0;
  let destinationId = 0;

  const handleDragEvent = (e) => {
    originId = e.target.id;
  };

  const handleDropEvent = (e) => {
    destinationId = e.target.id;

    //swap Items
    swapTodos(list, originId, destinationId);
    dispatch(updateList(list));
  };

  const handleAllowDropEvent = (e) => {
    e.preventDefault();
  };

  const handleCheckItem = (item) => {
    checkTodo(item, list);
    dispatch(updateList(list));
  };

  const handleDeleteIcon = (item) => {
    setIsItemFocus(true);
    setSelected(item.id);
  };

  const handleDeleteItem = (item) => {
    const res = list.filter((todo) => todo.id !== item.id);
    dispatch(updateList(res));
  };
  return (
    <div>
      <div className="content" style={style.content}>
        <div className="list-component">
          {filteredList.map((item) => (
            <div
              id={item.id}
              draggable
              style={style.listItem}
              key={item.id}
              onDragStart={(e) => handleDragEvent(e)}
              onDragOver={(e) => handleAllowDropEvent(e)}
              onDrop={(e) => handleDropEvent(e)}
              onDragEnd={() => setIsDragged(false)}
              onMouseOver={() => handleDeleteIcon(item)}
              onMouseLeave={() => setIsItemFocus(false)}
            >
              {item.isCompleted ? (
                <div onClick={() => handleCheckItem(item)}>
                  <div style={style.checked}>
                    <img src={check} alt="check" style={style.checkedImg} />
                  </div>
                </div>
              ) : (
                <div onClick={() => handleCheckItem(item)}>
                  <div className="radio" style={style.unChecked}>
                    <div style={style.inner}></div>
                  </div>
                </div>
              )}

              {item.isCompleted ? (
                <div
                  id={item.id}
                  onClick={() => handleCheckItem(item)}
                  className={mode === "dark" ? "strikeDark" : "strikeLight"}
                  title={item.title}
                >
                  {item.title}
                </div>
              ) : (
                <div
                  id={item.id}
                  onClick={() => handleCheckItem(item)}
                  style={{ cursor: "pointer" }}
                  title={item.title}
                >
                  {item.title}
                </div>
              )}
              <div
                className="delete"
                style={{
                  position: "absolute",
                  right: 20,
                  cursor: "pointer",
                }}
              >
                {isItemFocus && selected === item.id ? (
                  <img
                    onClick={() => handleDeleteItem(item)}
                    src={close}
                    alt="close"
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="listFooter" style={style.listFooter}>
        <p>{list.filter((item) => !item.isCompleted).length} items left</p>
        <div
          className="filter"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "35%",
          }}
          ref={allForOneRef}
        >
          <p
            data-testid="all-todos"
            className={mode === "dark" ? "detailsDark" : "detailsLight"}
            onClick={() => setFilteredList(filterList(list, "all"))}
          >
            All
          </p>
          <p
            className={mode === "dark" ? "detailsDark" : "detailsLight"}
            onClick={() => setFilteredList(filterList(list, "active"))}
          >
            Active
          </p>
          <p
            className={mode === "dark" ? "detailsDark" : "detailsLight"}
            onClick={() => setFilteredList(filterList(list, "completed"))}
          >
            Completed
          </p>
        </div>

        <p
          className={mode === "dark" ? "detailsDark" : "detailsLight"}
          onClick={() =>
            dispatch(updateList(filterList(list, "clear completed")))
          }
        >
          Clear Completed
        </p>
      </div>
    </div>
  );
}

export default ListGroupContent;
