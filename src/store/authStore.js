import { create } from "zustand";

const authStore = (set) => ({
  userID:'',

  setUserID:(userID)=>set({userID})

  // setLocalMemo: (localMeme) => set({ localMeme }),
  // setIsOpenMemo: (isOpenMemo) => set({ isOpenMemo }),
  // setCurrentMemoIndex: (currentMemoIndex) => set({ currentMemoIndex }),
});

const useAuth = create(authStore);

export default useAuth;
