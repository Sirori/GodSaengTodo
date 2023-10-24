import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function Modal({ isModalOpen, closeModal }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    setTodos([
      ...todos,
      { text: input, completed: false }
    ]);

    setInput("");
  };

  const toggleComplete = (index) => {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>
            <h2>할 일 목록</h2>

            {/* To-Do List */}
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  {/* Checkbox */}
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => toggleComplete(index)} 
                  />
                  
                  {/* Todo Text */}
                  {todo.text}

                  {/* Delete Button */}
                  <button onClick={() => deleteTodo(index)}>삭제</button>
                </li>
              ))}
            </ul>

            {/* Add To-Do Form */}
            <form onSubmit={addTodo}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className=''>추가하기</button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal