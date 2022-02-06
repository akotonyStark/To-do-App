import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moon from "../images/icon-moon.svg";
import sun from "../images/icon-sun.svg";
import { toggleTheme } from "../store/actions";

function ToggleMode() {
  const appSettings = useSelector((state) => state.theme);
  const { mode, style } = appSettings;
  const icon = mode === "dark" ? sun : moon;

  const [toggleIcon, setToggleIcon] = useState(icon);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    mode === "dark" ? setToggleIcon(sun) : setToggleIcon(moon);
    return () => {
      //cleanup
    };
  }, [flag, mode]);

  const handleToggle = () => {
    setFlag(!flag);
    dispatch(toggleTheme(flag));
  };
  return (
    <div className="toggleHeader" style={style.toggleHeader}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>T O D O</h1>
        <img
          data-testid="toggle-button"
          src={toggleIcon}
          style={{ height: 30 }}
          onClick={handleToggle}
          alt="icon-time-of-day"
        />
      </div>
    </div>
  );
}

export default ToggleMode;
