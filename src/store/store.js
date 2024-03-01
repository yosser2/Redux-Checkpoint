import { createStore } from "redux";
import { v4 as uuidv4 } from "uuid";
const initialState = [
  { id: 1, text: "Task 1", isDone: false },
  { id: 2, text: "Task 2", isDone: true },
];

const taskReducer = function (state = [], action) {
  if (action.type === "delete-task") {
    return state.filter((task, id) => +id !== +action.id);
  }

  if (action.type === "add-task") {
    return [...state, { text: action.text, id: uuidv4(), isDone: false }];
  }
  if (action.type === "edit-task") {
    return state.map((task, id) =>
      +id === +action.id ? { ...task, text: action.text } : task
    );
  }
  if (action.type === "toggle-task") {
    return state.map((task, id) =>
      +id === +action.id ? { ...task, isDone: !task.isDone } : task
    );
  }

  return state;
};

const store = createStore(
  taskReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
