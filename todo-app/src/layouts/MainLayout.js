import React from "react";
import { useSelector } from "react-redux";
import ListGroup from "../components/ListGroup";

export default function MainLayout() {
  const appSettings = useSelector((state) => state);
  const { theme } = appSettings;

  return (
    <div style={theme.style.body}>
      <div style={theme.style.header}></div>
      <div>
        <ListGroup />
      </div>
      <div style={theme.style.dragDrop}>
        <p>Drag and drop to render list</p>
      </div>
    </div>
  );
}
