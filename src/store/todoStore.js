import { create } from "zustand";

const todoStore = (set) => ({
  todos: [],
  input: "",
  showOptionsIndex: null,
  editInput: "",
  showEditFieldIndex: null,
  todoCheck: false,

  setTodos: (todos) => set({ todos }),
  setInput: (input) => set({ input }),
  setShowOptionsIndex: (showOptionsIndex) => set({ showOptionsIndex }),
  setEditInput: (editInput) => set({ editInput }),
  setShowEditFieldIndex: (showEditFieldIndex) => set({ showEditFieldIndex }),
  setTodocheck: (todoCheck) => set({ todoCheck }),
});

const useTodo = create(todoStore);

export default useTodo;
