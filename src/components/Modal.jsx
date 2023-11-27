import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Memo from "../assets/memo.svg";
import MemoModal from "./MemoModal";
import useTodo from "@/store/todoStore";
import useTodoMemo from "@/store/memoStore";
import useStorage from "@/hooks/useStorage";
import pb from "@/api/pocketbase";
import useUser from "@/store/userStore";

function Modal({ isModalOpen }) {
  const {
    todos,
    input,
    showOptionsIndex,
    showEditFieldIndex,
    editInput,
    setTodos,
    setInput,
    setShowOptionsIndex,
    setShowEditFieldIndex,
    setEditInput,
  } = useTodo();

  //메모 모달 다이얼로그 상태
  const { isOpenMemo, currentMemoIndex, setIsOpenMemo, setCurrentMemoIndex } =
    useTodoMemo();

  //유저
  const { userData, setUserData } = useUser();
  // const [isOpenMemo, setIsOpenMemo] = useState(false);
  // const [currentMemoIndex, setCurrentMemoIndex] = useState(null); // 현재 메모를 작성하고 있는 Todo 항목의 인덱스

  const { storageData } = useStorage("pocketbase_auth");
  console.log(storageData.model.id);

  const userInitData = {
    username: storageData.model.username,
    email: storageData.model.email,
    emailVisibility: true,

    name: storageData.model.name,
    todo: [],
    ledger: [],
  };

  //포켓베이스 데이터
  const todoData = {
    todo: "",
    memo: "",
    require: "",
    userID: "",
    check: false,
  };

  //포켓베이스 데이터 메소드
  const handleTodoData = async (newTodo) => {
    try {
      todoData.userID = storageData.model.id;
      todoData.todo = newTodo.text; // newTodo를 직접 사용
      todoData.check = newTodo.completed; // newTodo를 직접 사용

      const todoRes = await pb.collection("Todo").create(todoData);

      console.log(todoRes);

      const updatedUserData = {
        ...userData,
        todo: [...userData.todo, todoRes.id],
      };

      setUserData(updatedUserData);

      pb.collection("users").update(storageData.model.id, updatedUserData);

      console.log(updatedUserData);
      console.log(todoRes);
    } catch (error) {
      console.log("오류", error.response);
    }
  };
  //메모 메소드
  const toggleMemoModal = (index) => {
    setIsOpenMemo(!isOpenMemo);
    setCurrentMemoIndex(index);
    console.log(currentMemoIndex);
  };

  const handleMemoSave = async (memoText) => {
    setTodos(
      todos.map((todo, i) =>
        i === currentMemoIndex ? { ...todo, memo: memoText } : todo
      )
    );
    setIsOpenMemo(false);

    console.log(memoText);
    console.log(currentMemoIndex);
    console.log(todos);
    todoData.userID = storageData.model.id;
    todoData.todo = todos[currentMemoIndex].text;
    todoData.check = todos[currentMemoIndex].completed;
    todoData.memo = memoText;

    const record = await pb
      .collection("Todo")
      .update(userData.todo[currentMemoIndex], todoData);
    console.log(record);
  };

  const addTodo = async (e) => {
    e.preventDefault();

    const newTodo = { text: input, completed: false, memo: "" };

    setTodos([...todos, newTodo]);
    setInput("");

    // addTodo가 실행되면 handleTodoData도 실행되도록 함
    await handleTodoData(newTodo);
  };

  const toggleComplete = async (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );

    // setTodocheck(todos[index]);

    todoData.userID = storageData.model.id;
    todoData.todo = todos[index].text; // newTodo를 직접 사용
    todoData.check = !todos[index].completed; // newTodo를 직접 사용
    todoData.memo = todos[index].memo;
    // console.log(userData.todo[index])
    // console.log(todoCheck);
    // console.log(!(todos[index].completed));

    // console.log(todoCh);
    const record = await pb
      .collection("Todo")
      .update(userData.todo[index], todoData);
    console.log(record);
    // console.log();
  };

  const deleteTodo = async (index) => {
    // setTodos(todos.filter((_, i) => i !== index));
    // setShowOptionsIndex(null); // Also hide options if open

    // console.log(index)
    // await pb.collection("Todo").delete(userData.todo[index]);

    setTodos(todos.filter((_, i) => i !== index));
    setShowOptionsIndex(null); // Also hide options if open

    // userData.todo에서 특정 인덱스의 값을 제거
    const updatedUserData = {
      ...userData,
      todo: userData.todo.filter((_, i) => i !== index),
    };

    setUserData(updatedUserData);
    await pb.collection("Todo").delete(userData.todo[index]);
  };

  // New function to handle editing a todo
  const editTodo = async (index) => {
    if (editInput.trim() === "") return; // Don't allow empty todos

    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, text: editInput } : todo
      )
    );

    setShowOptionsIndex(null); // Hide options after editing

    todoData.userID = storageData.model.id;
    todoData.todo = editInput; // newTodo를 직접 사용
    todoData.check = todos[index].completed; // newTodo를 직접 사용
    todoData.memo = todos[index].memo;

    console.log(editInput);

    const record = await pb
      .collection("Todo")
      .update(userData.todo[index], todoData);
    console.log(record);
  };

  // Function to show the options for a specific todo item or hide them if already visible
  const toggleOptionsForTodoItem = (index) => {
    setShowOptionsIndex(showOptionsIndex === index ? null : index);
    if (showOptionsIndex !== index) {
      setEditInput(todos[index].text);
    }
  };


  useEffect(() => {
    const storedTodos = window.localStorage.getItem("todos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos([]);
      window.localStorage.setItem("todos", JSON.stringify([]));
    }

    setUserData(userInitData);
  }, []);

  useEffect(() => {
    // todos가 변경될 때마다, 그것을 로컬 스토리지에 저장합니다.
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
            <span className="mb-3">할 일 목록</span>

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
                    <span
                      className={`w-full ${
                        todo.completed ? "line-through" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
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

                  <div>
                    <button
                      className="mr-1"
                      onClick={() => toggleMemoModal(index)}
                    >
                      <img src={Memo} alt="메모 이미지 아이콘" />
                    </button>
                  </div>

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

            {/* 메모 아이콘 눌렀을 때 */}
            {isOpenMemo && (
              <MemoModal
                isOpenMemo={isOpenMemo}
                closeMemoModal={toggleMemoModal}
                memo={todos[currentMemoIndex]?.memo || ""}
                handleMemoSave={handleMemoSave}
              />
            )}

            {/* Add To-Do Form */}
            <form onSubmit={addTodo} className="mt-3">
              <input
                type="text"
                value={input}
                placeholder="New Todo"
                onChange={(e) => setInput(e.target.value)}
                className="block w-full overflow-hidden pl-2"
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
