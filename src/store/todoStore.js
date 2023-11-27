import { create } from "zustand";
import { persist } from "zustand/middleware";

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

const useTodo = create(
  persist(todoStore, {
    name: "todos", // 로컬 스토리지의 키 이름
    // getStorage: () => localStorage, // 로컬 스토리지를 사용하도록 설정
  })
);

export default useTodo;