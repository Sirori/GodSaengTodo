import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Modal({ isModalOpen }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [showEditFieldIndex, setShowEditFieldIndex] = useState(null);


  const addTodo = (e) => {
    e.preventDefault();

    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    setShowOptionsIndex(null); // Also hide options if open
  };

  // New function to handle editing a todo
  const editTodo = (index) => {
    if (editInput.trim() === "") return; // Don't allow empty todos

    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, text: editInput } : todo
      )
    );

    setShowOptionsIndex(null); // Hide options after editing
  };

  // Function to show the options for a specific todo item or hide them if already visible
  const toggleOptionsForTodoItem = (index) => {
    setShowOptionsIndex(showOptionsIndex === index ? null : index);
    if (showOptionsIndex !== index) {
      setEditInput(todos[index].text);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-80"
        >
          <div className="flex flex-col bg-gray-400 p-3 rounded-lg">
            <h2 className="mb-3">할 일 목록</h2>

            {/* To-Do List */}
            <ul className="relative">
              {todos.map((todo, index) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={index}
                  className="flex flex-row items-center"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                    className="mr-1"
                  />

                  {/* Todo Text */}
                  {showOptionsIndex !== index && (
                    <span className="w-full">{todo.text}</span>
                  )}

                 
                  {showOptionsIndex === index && (
                    <span className="w-full">{todo.text}</span>
                  )}

                  {/* Options Button */}
                  <button
                    onClick={() => toggleOptionsForTodoItem(index)}
                    className="ml-2"
                  >
                    ...
                  </button>

                  <AnimatePresence>
                    {showOptionsIndex === index && (
                      <motion.div className="bg-slate-200 flex flex-col w-20 absolute right-4">
                        {/* Delete Button */}
                        <button
                          onClick={() => deleteTodo(index)}
                          className="border border-b-black"
                        >
                          삭제
                        </button>

                        {/* Edit Button */}
                        <button onClick={() => {setShowEditFieldIndex(index); setEditInput(todo.text);}}>수정</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>

            {/* Add To-Do Form */}
            <form onSubmit={addTodo} className="mt-3">
              <input
                type="text"
                value={input}
                placeholder="New Todo"
                onChange={(e) => setInput(e.target.value)}
                className="block w-full overflow-hidden"
              />
              <button type="submit" className="sr-only">
                추가하기
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
