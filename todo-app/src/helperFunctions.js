//swap list items based on indices
export const swapTodos = (list, originId, destinationId) => {
  //get indices of items, filter from master list and swap Items
  const startItem = list.filter((todo) => todo.id === Number(originId));
  const endItem = list.filter((todo) => todo.id === Number(destinationId));

  const startIndex = list.findIndex((todo) => todo.id === startItem[0].id);
  const endIndex = list.findIndex((todo) => todo.id === endItem[0].id);
  let temp = list[startIndex];
  list[startIndex] = list[endIndex];
  list[endIndex] = temp;
};

//checks selected item
export const checkTodo = (item, list) => {
  //find index of specific item
  const index = list.findIndex((todo) => todo.id === item.id);
  item.isCompleted
    ? (list[index].isCompleted = false)
    : (list[index].isCompleted = true);
};

//filters todo list based on selected category
export const highlightActiveFilter = (ref, category) => {
  if (category === "active") {
    ref.current.children[1].className = "Link";
    ref.current.children[0].className = "detailsDark";
    ref.current.children[2].className = "detailsDark";
    //return active;
  } else if (category === "completed") {
    ref.current.children[2].className = "Link";
    ref.current.children[0].className = "detailsDark";
    ref.current.children[1].className = "detailsDark";
    //return completed;
  } else if (category === "all") {
    ref.current.children[0].className = "Link";
    ref.current.children[1].className = "detailsDark";
    ref.current.children[2].className = "detailsDark";
    //return list;
  } else {
    ref.current.children[0].className = "Link";
    ref.current.children[1].className = "detailsDark";
    ref.current.children[2].className = "detailsDark";
    //return allitems in store;
  }
};

//get active items
export const getActive = (list) => {
  const active = list.filter((items) => !items.isCompleted);
  return active;
};

export const getCompleted = (list) => {
  const completed = list.filter((items) => items.isCompleted);
  return completed;
};
