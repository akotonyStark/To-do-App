import CreateTodo from "./CreateTodo";
import ToggleMode from "./ToggleMode";

import ListGroupContent from "./ListGroupContent";

function ListGroup() {
  return (
    <>
      <ToggleMode />
      <CreateTodo />
      <ListGroupContent />
    </>
  );
}

export default ListGroup;
