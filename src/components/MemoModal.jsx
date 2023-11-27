import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function MemoModal({ isOpenMemo, closeMemoModal, memo, handleMemoSave }) {
  const [localMemo, setLocalMemo] = useState(memo); // 로컬 상태를 추가합니다.
  // const {localMemo,setLocalMemo}=useMemo()

  useEffect(() => {
    setLocalMemo(memo);
  }, [memo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-4 rounded-lg">
        <h2 className="mb-4">Todo Memo</h2>
        <textarea
          placeholder="메모를 작성해주세요."
          className="w-full p-2 pb-14 mb-4 border rounded-lg"
          value={localMemo}
          onChange={(e) => setLocalMemo(e.target.value)} // 로컬 상태를 업데이트합니다.
        ></textarea>
        <button
          onClick={() => handleMemoSave(localMemo)}
          className="p-2 bg-blue-500 text-white rounded-lg mr-1"
        >
          저장
        </button>
        <button onClick={closeMemoModal} className="mb-4">
          닫기
        </button>
      </div>

    </motion.div>
  );
}

export default MemoModal;
