import { create } from "zustand";

const localStore = (set) => ({
  todos: JSON.parse(window.localStorage.getItem("todos")) || [],
  addTodo: (todo) =>
    set((state) => {
      const newTodos = [...state.todos, todo];
      window.localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
});

const useLocalStore = create(localStore);

export default useLocalStore;
