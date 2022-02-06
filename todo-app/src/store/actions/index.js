export const addItem = (item) => {
  return {
    type: "ADD_TO_LIST",
    payload: item,
  };
};

export const deleteItem = (item) => {
  return {
    type: "DELETE_FROM_LIST",
    payload: item,
  };
};

export const updateList = (list) => {
  return {
    type: "UPDATE",
    payload: list,
  };
};

export const toggleTheme = (flag) => {
  return {
    type: flag,
  };
};
