import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Down from "../assets/arrow/down.svg";
import Click from "../assets/arrow/click.svg";
import Focus from "../assets/arrow/focus.svg";

function Modal({ isModalOpen }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [showEditFieldIndex, setShowEditFieldIndex] = useState(null);

  const [imageSource, setImageSource] = useState(Down);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // const handleMouseDown = () => {
  //   setIsPressed(true);
  //   setImageSource(Click); // 클릭 이미지 소스로 변경
  // };

  // const handleMouseUp = () => {
  //   setIsPressed(false);
  //   setImageSource(Down); // 기본 이미지 소스로 변경
  // };

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  const handleMouseEnter = () => {
    if (!isPressed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPressed) {
      setIsHovered(false);
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    setIsHovered(false); // 마우스를 꾹 눌렀을 때 호버 효과 해제
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    if (isHovered) {
      setIsHovered(true); // 마우스 업 후 다시 호버 상태로 변경
    }
  };

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
          <div className="flex flex-col bg-gray-200 p-3 rounded-lg">
            <div className="flex">
              <span className="mb-3">할 일 목록</span>
              <div
                className={`ml-1 ${isPressed ? "pressed" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                {isPressed ? (
                  <img src={Click} alt="마우스를 눌렀을 때 보이는 체크 아이콘" />
                ) : isHovered ? (
                  <img src={Focus} alt="마우스를 올렸을 때 보이는 체크 아이콘" />
                ) : (
                  <img src={Down} alt="체크 아이콘"
                  className="relative top-1 left-1" />
                )}
              </div>

            </div>

            {/* To-Do List */}
            <ul className="relative">
              {todos.map((todo, index) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={index}
                  className="flex items-start"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                    className="mr-1 relative top-1"
                  />

                  {/* Todo Text */}

                  {showEditFieldIndex !== index ? (
                    <span className="w-full">{todo.text}</span>
                  ) : (
                    <div className="w-full">
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          if (showEditFieldIndex !== null) {
                            setShowEditFieldIndex(null);
                          }
                        }}
                      >
                        <input
                          type="text"
                          value={editInput}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setEditInput(e.target.value)}
                          className="w-full"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              editTodo(index);
                              setShowEditFieldIndex(null);
                            }
                          }}
                        />
                      </OutsideClickHandler>
                    </div>
                  )}

                  {/* Options Button */}
                  <button
                    onClick={() => toggleOptionsForTodoItem(index)}
                    className="ml-2"
                  >
                    ...
                  </button>
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      if (showOptionsIndex !== null) {
                        setShowOptionsIndex(null);
                      }
                    }}
                  >
                    <AnimatePresence>
                      {showOptionsIndex === index && (
                        <motion.div className="bg-slate-300 flex flex-col w-20 absolute right-4 -translate-y-2">
                          {/* Delete Button */}
                          <button
                            onClick={() => deleteTodo(index)}
                            className="border border-b-black"
                          >
                            삭제
                          </button>

                          {/* Edit Button */}
                          {showEditFieldIndex !== index ? (
                            <button
                              onClick={() => {
                                setShowEditFieldIndex(index);
                                setShowOptionsIndex(null); // Hide options after clicking edit
                              }}
                            >
                              수정
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                editTodo(index);
                                setShowEditFieldIndex(null);
                              }}
                            >
                              적용
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </OutsideClickHandler>
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
