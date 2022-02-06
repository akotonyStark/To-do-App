const init = [
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

const listReducer = (state = init, action) => {
  switch (action.type) {
    case "INIT_LIST":
      console.log("initializing list..");
      return state;
    case "ADD_TO_LIST":
      console.log("adding to list to..");
      state.unshift(action.payload);
      return [...state];
    //return [...state, action.payload];
    case "DELETE_FROM_LIST":
      const res = state.filter((item) => item.id !== action.payload.id);
      return [...res];
    case "UPDATE":
      console.log("updating list..");
      const list = action.payload;
      return [...list];
    default:
      return state;
  }
};

export default listReducer;
