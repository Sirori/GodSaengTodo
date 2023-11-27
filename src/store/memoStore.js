import { create } from "zustand";

const memoStore = (set) => ({
  localMemo: '',
  isOpenMemo: false,
  currentMemoIndex: null,

  setLocalMemo: (localMeme) => set({ localMeme }),
  setIsOpenMemo: (isOpenMemo) => set({ isOpenMemo }),
  setCurrentMemoIndex: (currentMemoIndex) => set({ currentMemoIndex }),
});

const useMemo = create(memoStore);

export default useMemo;
