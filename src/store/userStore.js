import { create } from "zustand";
// import useStorage from "@/hooks/useStorage";

// console.log(useStorage)

const userStore = (set) => ({

  
  
  // const [userData, setUserData] = useState({
  //   username: storageData.model.username,
  //   email: storageData.model.email,
  //   emailVisibility: true,
  //   name: storageData.model.name,
  //   todo: [],
  //   ledger: [],
  // });

  userData:{
    username: '',
    email: '',
    emailVisibility: true,
    name: '',
    todo: [],
    ledger: [],
  },

  setUserData:(userData)=>set({userData})
  

  
});

const useUser = create(userStore);

export default useUser;
