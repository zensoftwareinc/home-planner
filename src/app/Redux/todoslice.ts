import { createSlice } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
}

interface TodosState {
  todos: Todo[];
  past: Todo[][];
  future: Todo[][];
}

const initialState: TodosState = {
  todos: [],
  past: [],
  future: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: Date.now(), text: action.payload });
      state.past.push([...state.todos]);
      state.future = [];
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previousTodos = state.past.pop();
        if (previousTodos) {
          state.future.push([...state.todos]);
          state.todos = previousTodos;
        }
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextTodos = state.future.pop();
        if (nextTodos) {
          state.past.push([...state.todos]);
          state.todos = nextTodos;
        }
      }
    },
  },
});

export const { addTodo, undo, redo } = todosSlice.actions;

export default todosSlice.reducer;